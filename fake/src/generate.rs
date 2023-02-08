use rand::{prelude::thread_rng, Rng};
use unfold::Unfold;

const VOLATILITY: f64 = 0.008;

pub const DATA_FRAME_AMOUNT: usize = 50_000;

pub fn generate_data() -> Vec<f64> {
    Unfold::new(generate_data_frame, 100.0)
        .take(DATA_FRAME_AMOUNT)
        .collect()
}

pub fn generate_data_frame(old: f64) -> f64 {
    let rand = thread_rng().gen_range(-0.51..0.5115);

    let change_percent = 2.0 * VOLATILITY * rand;
    let change_amount = old * change_percent;
    let new_price = old + change_amount;

    if new_price < 0.001 {
        new_price + f64::abs(change_amount) * 2.0
    } else if new_price > 100_000.0 {
        new_price - f64::abs(change_amount) * 2.0
    } else {
        new_price
    }
}
