const Counter = require('../dist/index')

const testCounter = new Counter(7, { target: 4, exactMatch: false, once: false })

const eventCounter = new Counter(0, { target: 5 })

let success = false

eventCounter.once('target', (v) => {
  if (v === 5) success = true
  else throw new Error()
})

testCounter.on('target', (v) => {
  eventCounter.value++
})

testCounter.on('change', (n, o) => {
  eventCounter.value++
})

testCounter.value = 5

testCounter.value = 3

testCounter.value = 4

if (testCounter.value === 4 && success === true) {
  console.log('test successful.')
  return process.exit(0)
}

console.error('test failed.')

process.exit(1)
