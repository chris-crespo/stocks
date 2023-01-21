pub const CREATE_PRICE_CHANGE_FUNCTION: &str = "
    create or replace function price_change(original double precision, current double precision) 
        returns real
        language sql
        immutable
        return (current / original - 1) * 100;
";
