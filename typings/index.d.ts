declare module '@tmuniversal/counter' {
  import { EventEmitter } from 'events'

  class Counter {
    public options: CounterOptions
    public readonly last5: number[]
    public lastChange: number
    public readonly startValue: number
    private _value: number
    private doEmitTargetEvent: boolean
    private readonly _eventEmitter: EventEmitter
    /**
     * Create a counter
     * @param {Number} startValue number to start on
     * @param {{target?: Number, once?: Boolean, exactMatch?: Boolean}} options options for the counter
     */
    constructor(startValue?: number, options?: CounterOptions)

    /**
     * Current value of the counter
     * @type {Number}
     */
    public get value(): number

    public set value(newValue: number)

    /**
     * Increment the counter by an amount
     * @param {Number} amount amount to increment by (default: 1)
     * @returns {Number} new value
     */
    public increment(amount?: number): number

    /**
     * Decrement the counter by an amount
     * @param {Number} amount amount to decrement by (default: 1)
     * @returns {Number} new value
     */
    public decrement(amount?: number): number

    /**
     * Reset the counter
     * @param {Boolean} toStart wether to reset to the starting value or to 0 (default: true)
     * @returns {Number} new value
     */
    public reset(toStart?: boolean): number

    /**
     * Value of the counter as a string
     * Will be used in template literals
     * @type {String}
     */
    public toString(): string

    /**
     * Listen for an event.
     * @param {"change" | "target"} event name of the event
     * @param {Function} listener function to call when the event occurs
     */
    public on(event: CounterEvent, listener: (...args: any[]) => void): EventEmitter

    /**
     * Listen for an event once.
     * @param {"change" | "target"} event name of the event
     * @param {Function} listener function to call when the event occurs
     */
    public once(event: CounterEvent, listener: (...args: any[]) => void): EventEmitter

    private emit(event: CounterEvent, ...args: any[]): EventEmitter
  }

  type CounterEvent = 'change' | 'target'

  interface CounterOptions {
    target: number
    once: boolean
    exactMatch: boolean
  }

  export = Counter
}
