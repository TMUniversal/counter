/// <reference path="../typings/index.d.ts" />
'use strict'

import { EventEmitter } from 'events'

type CounterEvent = 'change' | 'target'

class Counter {
  public options: CounterOptions;
  private _value: number;
  private doEmitTargetEvent: boolean;
  private _startValue: number;
  private _eventEmitter: EventEmitter;
  private _last5: number[];
  private _lastChange: number;
  /**
   * Create a counter
   * @param {Number} startValue number to start on
   * @param {{target?: Number, once?: Boolean, exactMatch?: Boolean}} options options for the counter
   */
  constructor (startValue: number, options: CounterOptions = {} as CounterOptions) {
    if (typeof startValue !== 'number') throw new Error(`startValue must be a number. received ${typeof startValue}`)
    const {
      target = 0,
      exactMatch = true,
      once = false
    } = options as CounterOptions

    this.options = {
      target: target,
      exactMatch: !!exactMatch,
      once: !!once
    }

    this._eventEmitter = new EventEmitter()

    this.doEmitTargetEvent = true
    this._last5 = []
    this._lastChange = 0
    this.value = this._value = startValue || 0
    this._startValue = startValue
  }

  /**
   * Current value of the counter
   * @type Number
   */
  public get value (): number {
    return this._value
  }

  public set value (newValue: number) {
    if (this._value !== newValue) {
      this.emit('change', newValue, this._value)
    }

    this._lastChange = newValue - this._value
    this._value = newValue

    // Ensure that only 5 elements are saved
    if (this._last5.length > 4) this._last5.pop()
    this._last5.unshift(this._value)

    if (this.doEmitTargetEvent && this.options.exactMatch && this._value === this.options.target) {
      this.emit('target', this._value)
      if (this.options.once) this.doEmitTargetEvent = false
    } else if (this.doEmitTargetEvent && !this.options.exactMatch && ((this.startValue <= this.value && this.value >= this.options.target) || (this.startValue >= this.value && this.value <= this.options.target))) {
      // If not matching exactly, see if the counter has passed the target on it's way from the starting value
      this.emit('target', this.options.target, this._value)
      if (this.options.once) this.doEmitTargetEvent = false
    }
  }

  /**
   * The starting value
   * @type Number
   */
  public get startValue (): number {
    return this._startValue
  }

  /**
   * Increment the counter by an amount
   * @param {Number} amount amount to increment by (default: 1)
   */
  public increment (amount: number = 1): number {
    this.value += amount
    return this.value
  }

  /**
   * Decrement the counter by an amount
   * @param {Number} amount amount to decrement by (default: 1)
   */
  public decrement (amount: number = 1): number {
    return this.increment(-amount)
  }

  /**
   * Reset the counter
   * @param {Boolean} toStart wether to reset to the starting value or to 0 (default: true)
   */
  public reset (toStart: boolean = true): number {
    if (toStart) {
      return (this.value = this._startValue)
    } else {
      return (this.value = 0)
    }
  }

  /**
   * last five values of the counter
   * @type Number[]
   */
  public get last5 (): number[] {
    return this._last5
  }

  /**
   * last change made to the counter (difference)
   * @type Number
   */
  public get lastChange (): number {
    return this._lastChange
  }

  public toString (): string {
    return this.value.toString()
  }

  /**
   * Listen for an event.
   * @param {"change" | "target"} event name of the event
   * @param {Function} listener function to call when the event occurs
   */
  public on (event: CounterEvent, listener: (...args: any[]) => void) {
    return this._eventEmitter.on(event, listener)
  }

  /**
   * Listen for an event once.
   * @param {"change" | "target"} event name of the event
   * @param {Function} listener function to call when the event occurs
   */
  public once (event: CounterEvent, listener: (...args: any[]) => void) {
    return this._eventEmitter.once(event, listener)
  }

  private emit (event: CounterEvent, ...args: any[]) {
    return this._eventEmitter.emit(event, ...args)
  }
}

module.exports = Counter

interface CounterOptions {
  target: number;
  once: boolean;
  exactMatch: boolean;
}
