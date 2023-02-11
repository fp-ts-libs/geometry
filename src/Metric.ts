/*
 * A metric is a function that measures the distance between two values.
 * The distance function should follow the laws of metrics:
 * 1) Should follow the triangle inequality: distance(a)(b) + distance(b)(c) >= distance(a)(c)
 * 2) Should be non-negative: distance(a)(b) >= 0
 * 3) Should be idempotent: distance(a)(a) === 0
 * 4) Should be symmetric: distance(a)(b) === distance(b)(a)
 */

import type * as order from "@fp-ts/core/typeclass/Order"
import type { TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category models
 * @since 1.0.0
 */
export interface Metric<A> {
  distance: (that: A) => (self: A) => number
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface DistanceTypeLambda extends TypeLambda {
  readonly type: Metric<this["Target"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromDistance = <A>(distance: Metric<A>["distance"]): Metric<A> => ({
  distance
})

/**
 * @category utils
 * @since 1.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (m: Metric<A>): Metric<B> => ({
    distance: (that) => (self) => m.distance(f(that))(f(self))
  })

/**
 * Given a metric, returns an order on A based on the distance from a center.
 *
 * @category utils
 * @since 1.0.0
 */
export const getOrder = <A>(metric: Metric<A>) =>
  (center: A): order.Order<A> => ({
    compare: (self, that) => {
        const dSelf = metric.distance(self)(center)
        const dThat = metric.distance(that)(center)
        return dSelf < dThat ? -1 : dSelf > dThat ? 1 : 0
      }
  })
