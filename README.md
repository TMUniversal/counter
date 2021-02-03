# Counter

<div>
  <p align="center">
    <a href="https://github.com/TMUniversal/counter/blob/master/package.json#L3">
      <img src="https://img.shields.io/github/package-json/v/TMUniversal/counter?style=flat" />
    </a>
    <a href="https://github.com/TMUniversal/counter/actions">
      <img src="https://github.com/TMUniversal/counter/workflows/Build/badge.svg" />
    </a>
    <a href="https://tmuniversal.eu/redirect/patreon">
      <img src="https://img.shields.io/badge/Patreon-support_me-fa6956.svg?style=flat&logo=patreon" />
    </a>
    <a href="https://www.npmjs.com/package/@tmuniversal/counter">
      <img src="https://img.shields.io/npm/dt/@tmuniversal/counter" />
    </a>
    <br />
    <a href="https://bundlephobia.com/result?p=@tmuniversal/counter">
      <img src="https://img.shields.io/bundlephobia/min/@tmuniversal/counter?label=packge%20size" />
    </a>
    <a href="https://github.com/TMUniversal/counter/issues">
      <img src="https://img.shields.io/github/issues/TMUniversal/counter.svg?style=flat">
    </a>
    <a href="https://github.com/TMUniversal/counter/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/TMUniversal/counter.svg?style=flat">
    </a>
    <a href="https://github.com/TMUniversal/counter/blob/stable/LICENSE.md">
      <img src="https://img.shields.io/github/license/TMUniversal/counter.svg?style=flat">
    </a>
  </p>
</div>

[Counter] creates simple counters that are a bit more than just a variable. These counters can watch for changes and alert you when a target value is reached or passed.

## Getting Started

### Installation

With npm: `npm install --save @tmuniversal/counter`

With yarn: `yarn add @tmuniversal/counter`

### Usage

#### Creating a counter

```js
const Counter = require('@tmuniversal/counter')

const testCounter = new Counter(3) // Start at 3
```

#### Working with the counter

```js
const exampleCounter = new Counter(1, {
  target: 4,
  exactMatch: false,
  once: true
})

console.log(exampleCounter.value)
// => 1

// The value can be set directly
exampleCounter.value = 5

// Or be changed using .increment() and .decrement()
exampleCounter.decrement(2)
// => 3

exampleCounter.increment()
// => 4

console.log(exampleCounter.value)
// => 4
```

A counter will provide a custom `toString()` method for easy access to the value within template strings:

```js
console.log(`The value of the counter is ${exampleCounter}`)
// The value of the counter is 4
```

The counter will save it's latest operations, this means you can access the last change (the difference between the current and the previous value):

```js
console.log(exampleCounter.lastChange)
// => 1

exampleCounter.decrement(2)

console.log(exampleCounter.lastChange)
// => -2
```

The last five values of the counter are saved in an array, ordered from first to last. The current value is saved as the last element of the array.

```js
console.log(exampleCounter.last5)
// => [ 5, 3, 4, 2 ]

exampleCounter.increment()

console.log(exampleCounter.last5)
// => [ 5, 3, 4, 2, 3 ]

exampleCounter.increment()

console.log(exampleCounter.last5)
// => [ 3, 4, 2, 3, 4 ]
```

#### Events

A counter emits two kinds of events: "change", when the value of the counter changes; "target" when the counter reaches (or passes) the target option.

```js
exampleCounter.on('target', value => {
  console.log(`reached ${value}`)
})

exampleCounter.on('change', (newValue, oldValue) => {
  console.log(`${oldValue} => ${newValue}`)
})
```

Note: Passing the target means that the current value is equal or beyond the target value, as seen from the starting value. This means the target event can count backwards.

## Credits

This project is heavily inspired by the existing but very old package [counter](https://www.npmjs.com/package/counter).

## License

Please refer to the [LICENSE](LICENSE.md) file.

[counter]: https://github.com/TMUniversal/counter
