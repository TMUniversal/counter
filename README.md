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

[Counter] creates simple counters that are a bit more than a simple variable. These counters can watch for changes and alert you when a target value is reached or passed.

## Getting Started

### Installation

With npm: `npm install --save @tmuniversal/counter`

With yarn: `yarn add @tmuniversal/counter`

### Usage

```js
const Counter = require('@tmuniversal/counter')

const testCounter = new Counter(3) // Start at 3

const testCounter = new Counter(1, { target: 4, exactMatch: false, once: true }) // Or pass some options

console.log(testCounter.value)
// => 1

// Optional event handlers, you should provide a target event handler when passing a target value.
testCounter.on('target', (value) => {
  console.log(`reached ${value}`)
})

testCounter.on('change', (newValue, oldValue) => {
  console.log(`${oldValue} => ${newValue}`)
})

testCounter.value = 5
// Changing the value will emit a "change" event.
// Since "exactMatch" is set to false, this will emit a "target" event.
// These will be listened to and handled as defined above.
// Note: event listeners must be defined before handling events

testCounter.value = 3
// Will also trigger a "change" event, but no target event (since the value does not pass the target).
// Note: passing the target means that the current value is equal or beyond the target value, as seen from the starting value.
// This means it can count backwards. I'm sorry for the complicated wording.

testCounter.value = 4
// Will trigger a "change" event.
// Although this would emit a "target" event, since "once" is set to true, only one target event will ever be emitted.

console.log(testCounter.value)
```

Full console output of this snippet:
```js
1
1 => 5
reached 4
5 => 3
3 => 4
4
```

## Credits

This project is heavily inspired by the existing but very old package [counter].

## License

Please refer to the [LICENSE](LICENSE.md) file.

[counter]: https://www.npmjs.com/package/counter