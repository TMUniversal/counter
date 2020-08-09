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

    this._value = newValue

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
