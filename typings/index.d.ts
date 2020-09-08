declare module '@tmuniversal/counter' {
  import { EventEmitter } from 'events'

  class Counter {
    public options: CounterOptions
    private _value: number
    private ready: boolean
    private _startValue: number
    private _eventEmitter: EventEmitter
    private _last5: number[]
    private _lastChange: number
    /**
     * Create a counter
     * @param {Number} startValue number to start on
     * @param {{target?: Number, once?: Boolean, exactMatch?: Boolean}} options options for the counter
     */
    constructor(startValue?: number, options?: CounterOptions)

    /**
     * Current value of the counter
     * @type Number
     */
    public get value(): number

    public set value(newValue: number)

    /**
     * The starting value
     * @type Number
     */
    public get startValue(): number

    /**
     * Increment the counter by an amount
     * @param {Number} amount amount to increment by (default: 1)
     */
    public increment(amount?: number): number

    /**
     * Decrement the counter by an amount
     * @param {Number} amount amount to decrement by (default: 1)
     */
    public decrement(amount?: number): number

    /**
     * Reset the counter
     * @param {Boolean} toStart wether to reset to the starting value or to 0 (default: true)
     */
    public reset(toStart?: boolean): number

    /**
     * last five values of the counter
     * @type Number[]
     */
    public get last5(): number[]

    /**
     * last change made to the counter (difference)
     * @type Number
     */
    public get lastChange(): number

    public toString(): string

    /**
     * Listen for an event.
     * @param {"change" | "target"} event name of the event
     * @param {Function} listener function to call when the event occurs
     */
    public on(
      event: CounterEvent,
      listener: (...args: any[]) => void
    ): EventEmitter

    /**
     * Listen for an event once.
     * @param {"change" | "target"} event name of the event
     * @param {Function} listener function to call when the event occurs
     */
    public once(
      event: CounterEvent,
      listener: (...args: any[]) => void
    ): EventEmitter

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
