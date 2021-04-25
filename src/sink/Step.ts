/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable tsdoc/syntax */
import { Functor2 } from 'fp-ts/Functor';
import { pipe } from 'fp-ts/function';

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.0.1
 */
export type Poll<A, S> = {
  readonly _tag: 'Poll';
  readonly value: A;
  readonly stream: S;
};

/**
 * @category model
 * @since 0.0.1
 */
export type Skip<S> = {
  readonly _tag: 'Skip';
  readonly stream: S;
};

/**
 * @category model
 * @since 0.0.1
 */
export type Stop = {
  readonly _tag: 'Stop';
};

/**
 * A Stream is a succession of `Step`s.
 * - `Poll` produces a single value and the next state of the stream
 * - `Stop` inndicates there are no more values in the stream.
 *
 * @category model
 * @since 0.0.1
 */
export type Step<S, A> = Poll<A, S> | Skip<S> | Stop;

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 0.0.1
 */
export const matchW = <S, B, A, C, D>(
  onPoll: (e: Poll<A, S>) => B,
  onSkip: (a: Skip<S>) => C,
  onStop: (e: Stop) => D,
) => (fa: Step<S, A>): B | C | D => {
  switch (fa._tag) {
    case 'Poll':
      return onPoll(fa);
    case 'Skip':
      return onSkip(fa);
    case 'Stop':
      return onStop(fa);
  }
};

/**
 * Alias of [`matchW`](#matchw).
 *
 * @category destructors
 * @since 0.0.1
 */
export const foldW = matchW;

/**
 * @category destructors
 * @since 0.0.1
 */
export const match: <S, A, B>(
  onPoll: (e: Poll<A, S>) => B,
  onSkip: (a: Skip<S>) => B,
  onStop: (e: Stop) => B,
) => (fa: Step<S, A>) => B = matchW;

/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
export const fold = match;

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f));

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.0.1
 */
export const map: <A, B, S>(
  f: (a: A) => B,
) => (fa: Step<S, A>) => Step<S, B> = (f) => (fa) =>
  isPoll(fa) ? { _tag: 'Poll', stream: fa.stream, value: f(fa.value) } : fa;

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.0.1
 */
export const URI = 'Step';

/**
 * @category instances
 * @since 0.0.1
 */
export type URI = typeof URI;

declare module 'fp-ts/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Step<E, A>;
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map,
};

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the these is an instance of `Stop`, `false` otherwise
 *
 * @category guards
 * @since 0.0.1
 */
export function isStop<S, A>(fa: Step<S, A>): fa is Stop {
  return fa._tag === 'Stop';
}

/**
 * Returns `true` if the these is an instance of `Skip`, `false` otherwise
 *
 * @category guards
 * @since 0.0.1
 */
export function isSkip<S, A>(fa: Step<S, A>): fa is Skip<S> {
  return fa._tag === 'Skip';
}

/**
 * Returns `true` if the these is an instance of `Poll`, `false` otherwise
 *
 * @category guards
 * @since 0.0.1
 */
export function isPoll<S, A>(fa: Step<S, A>): fa is Poll<A, S> {
  return fa._tag === 'Poll';
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
