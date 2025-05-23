module betpilot::betpilot {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::table::{Self, Table};
    use sui::event;
    use sui::balance::{Self, Balance};

    // Error codes
    const EInvalidBetAmount: u64 = 1;
    const EInvalidOdds: u64 = 2;

    // Events
    struct BetPlaced has copy, drop {
        bet_id: ID,
        bettor: address,
        amount: u64,
        odds: u64
    }

    // Structs
    struct BetPilotState has key {
        id: UID,
        bets: Table<ID, Bet>,
        total_bets: u64,
        admin: address,
        treasury: Balance<SUI>
    }

    struct Bet has store {
        bettor: address,
        amount: u64,
        odds: u64,
        status: u8, // 0: Active, 1: Won, 2: Lost
        created_at: u64
    }

    // Initialize the BetPilot contract
    fun init(ctx: &mut TxContext) {
        let state = BetPilotState {
            id: object::new(ctx),
            bets: table::new(ctx),
            total_bets: 0,
            admin: tx_context::sender(ctx),
            treasury: balance::zero()
        };
        transfer::share_object(state);
    }

    // Place a bet
    public entry fun place_bet(
        state: &mut BetPilotState,
        payment: Coin<SUI>,
        odds: u64,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&payment);
        assert!(amount > 0, EInvalidBetAmount);
        assert!(odds >= 100, EInvalidOdds); // Minimum odds of 1.00 (represented as 100)

        // Extract the balance from the coin and add it to treasury
        let coin_balance = coin::into_balance(payment);
        balance::join(&mut state.treasury, coin_balance);

        let bet = Bet {
            bettor: tx_context::sender(ctx),
            amount,
            odds,
            status: 0,
            created_at: tx_context::epoch(ctx)
        };

        let bet_id = object::new(ctx);
        let id_copy = object::uid_to_inner(&bet_id);
        table::add(&mut state.bets, id_copy, bet);
        state.total_bets = state.total_bets + 1;

        // Emit bet placed event
        event::emit(BetPlaced {
            bet_id: id_copy,
            bettor: tx_context::sender(ctx),
            amount,
            odds
        });

        // Clean up the ID
        object::delete(bet_id);
    }

    // Get bet details
    public fun get_bet(state: &BetPilotState, bet_id: ID): &Bet {
        table::borrow(&state.bets, bet_id)
    }
}
