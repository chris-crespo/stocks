import { None, Option, Some } from "ts-results"

// Wrapper object to make methods easier to chain
export class Lazy<T> {
  private constructor(private generator: Generator<T>) {}

  public static of<T>(...items: T[]) {
    return new Lazy(generate(...items))
  }

  public static unfold<T>(seed: T, fn: (prev: T) => T) {
    return new Lazy(unfold(seed, fn))
  }

  public next(): Option<T> {
    const next = this.generator.next()
    if (next.done) {
      return None
    }

    return Some(next.value)
  }

  public map<U>(fn: (value: T) => U) {
    return new Lazy(map(fn, this.generator))
  }

  public take(n: number) {
    return new Lazy(take(n, this.generator))
  }

  public takeWhile(pred: (value: T) => boolean) {
    return new Lazy(takeWhile(pred, this.generator))
  }

  public stepBy(n: number) {
    return new Lazy(stepBy(n, this.generator))
  }

  public toList() {
    return toList(this.generator)
  }
}

export function* generate<T>(...items: T[]) {
  for (const x of items) yield x
}

export function* map<T, U>(fn: (value: T) => U, generator: Generator<T>) {
  for (const x of generator) {
    yield fn(x)
  }
}

export function* unfold<T>(seed: T, fn: (prev: T) => T) {
  let current = seed;
  for (;;) {
    yield current
    current = fn(current)
  }
}

export function* take<T>(n: number, generator: Generator<T>) {
  for (let i = 0; i < n; i++) {
    yield generator.next().value as T
  }
}

export function* takeWhile<T>(pred: (value: T) => boolean, generator: Generator<T>) {
  for (const x of generator) {
    if (!pred(x)) break
    yield x
  }
}

export function* stepBy<T>(n: number, generator: Generator<T>) {
  let i = 0
  for (const x of generator) {
    if (i % n === 0) yield x
    i += 1
  }
}

export function toList<T>(generator: Generator<T>) {
  return [...generator]
}
