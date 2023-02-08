from rust:1.65 as builder
workdir /app
copy . .
run cargo build --release

from debian:buster-slim
run apt-get update && apt-get install -y ca-certificates libssl-dev && rm -rf /var/lib/apt/lists/*
copy --from=builder /app/target/release/fake /usr/local/bin/fake
copy --from=builder /app/data ./data
cmd ["fake", "100"]
