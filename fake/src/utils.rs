use chrono::{DateTime, Duration, Timelike, Utc};

pub fn utc_datetime_now() -> DateTime<Utc> {
    let now = Utc::now();
    let current_seconds = now.time().second();
    let current_nanoseconds = now.time().nanosecond();

    let seconds = Duration::seconds(current_seconds.into());
    let nanoseconds = Duration::nanoseconds(current_nanoseconds.into());

    let created_at = now.checked_sub_signed(seconds).unwrap();
    created_at.checked_sub_signed(nanoseconds).unwrap()
}
