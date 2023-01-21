import { Result, Ok, Err } from "ts-results"

export const resultify = async <T, E>(promise: Promise<T>): Promise<Result<T, E>> => {
  try {
    return new Ok(await promise)
  } catch (e) {
    return new Err(e as E)
  }
}
