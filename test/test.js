const Counter = require('../dist/index')

describe('counter values', () => {
  test('new Counter() should create counter with start value', () => {
    let c = new Counter()
    let c2 = new Counter(3)
    expect(c.value).toBe(0)
    expect(c2.value).toBe(3)
  })
  test('.increment() should increment the value', () => {
    let c = new Counter()
    c.increment(5)
    expect(c.value).toBe(5)
  })
  test('.reset() should reset the value to the start value, leaving the last changes untouched', () => {
    let c = new Counter(5)
    c.value = 0
    c.reset()
    expect(c.value).toBe(5)
    expect(c.last5).toEqual([5, 0, 5])
  })
  test('.lastChange should represent the most recent change in value', () => {
    let c = new Counter()
    c.increment(5)
    expect(c.lastChange).toBe(5)
    c.decrement(2)
    expect(c.lastChange).toBe(-2)
  })
  test('.last5 should contain the latest 5 values order latest last', () => {
    let c = new Counter()
    c.increment()
    c.increment()
    c.increment()
    c.increment()
    c.increment()
    c.increment(2)
    expect(c.last5).toEqual([2, 3, 4, 5, 7])
    c.decrement()
    expect(c.last5).toEqual([3, 4, 5, 7, 6])
  })
})

describe('counter value access', () => {
  test('.toString() should return the current value as a string', () => {
    let c = new Counter()
    expect(c.toString()).toBe('0')
    expect(c.toString() === '0').toBe(true)
    c.value = 5
    expect(c.toString()).toBe('5')
    expect(c.toString() === '5').toBe(true)
  })

  test('value should be returned when counter is accessed in template literals', () => {
    let c = new Counter()
    expect(`${c}`).toBe('0')
  })
})

describe('counter events', () => {
  test('target event should trigger when target is reached', () => {
    const ec = new Counter(0, { target: 1 })
    let succ = false
    ec.once('target', () => succ = true)
    ec.increment()
    expect(succ).toBe(true)
  })
  test('target event should trigger every time target is reached', () => {
    const ec = new Counter(0, { target: 1 })
    let i = 0
    ec.on('target', () => i++)
    ec.increment()
    ec.decrement()
    ec.increment()
    expect(i).toBe(2)
  })
  test('target event should trigger only once when target is reached with once = true option', () => {
    const ec = new Counter(0, { target: 1, once: true })
    let i = 0
    ec.on('target', () => i++)
    ec.increment()
    ec.decrement()
    ec.increment()
    expect(i).toBe(1)
  })
  test('target event should not trigger when target is passed', () => {
    const ec = new Counter(0, { target: 1 })
    let succ = false
    ec.once('target', () => succ = true)
    ec.increment(2)
    expect(succ).toBe(false)
  })
  test('target event should trigger when target is passed with exactMatch = false option', () => {
    const ec = new Counter(0, { target: 1, exactMatch: false })
    let succ = false
    ec.once('target', () => succ = true)
    ec.increment(2)
    expect(succ).toBe(true)
  })
  test('change event should trigger when counter is changed', () => {
    const ec = new Counter(0, { target: 1, exactMatch: false })
    let succ = false
    ec.once('change', () => succ = true)
    ec.increment()
    expect(succ).toBe(true)
  })
})
