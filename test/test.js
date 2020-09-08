const Counter = require('../dist/index')

const testCounter = new Counter(7, {
  target: 4,
  exactMatch: false,
  once: false
})

const eventCounter = new Counter(0, { target: 9 })

let success = false

eventCounter.once('target', v => {
  if (v === 9) success = true
  else throw new Error()
})

testCounter.on('target', v => {
  eventCounter.increment()
})

testCounter.on('change', (n, o) => {
  eventCounter.increment()
})

testCounter.value = 5

testCounter.decrement(2)

testCounter.increment()

testCounter.decrement()

testCounter.increment()

if (
  testCounter.value === 4 &&
  success === true &&
  testCounter.lastChange === 1
) {
  console.log('test successful.')
  return process.exit(0)
}

console.error('test failed.')

process.exit(1)
