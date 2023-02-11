import * as assert from "assert"
import * as _ from "../src/Metric"

describe("Metric", () => {
  it("exports", () => {
    expect(_.getOrder).toBeDefined()
  })
  it("fromDistance", () => {
    assert.deepStrictEqual(_.fromDistance<number>((a) => (b) => Math.abs(a - b)).distance(-1)(1), 2)
    assert.deepStrictEqual(_.fromDistance<number>((a) => (b) => a === b ? 0 : 1).distance(0)(3), 1)

  })

  it("getOrder", () => {
    const metrtic = _.fromDistance<number>((a) => (b) => Math.abs(a - b))
    const order = _.getOrder(metrtic)(0)
    assert.deepStrictEqual(order.compare(2, 1), 1)
  })
})