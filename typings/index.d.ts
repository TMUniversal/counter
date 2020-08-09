declare module '@tmuniversal/counter' {
  import { EventEmitter } from 'events'

  class Counter {
    public options: CounterOptions;
    private _value: number;
    private ready: boolean;
    private _startValue: number;
    private _eventEmitter: EventEmitter;
    /**
     * Create a counter
     * @param {Number} startValue number to start on
     * @param {{target?: Number, once?: Boolean, exactMatch?: Boolean, ready?: Boolean}} options options for the counter
     */
    constructor(startValue: number, options?: CounterOptions);

    /**
     * Current value of the counter
     * @type Number
     */
    public get value(): number;

    public set value(newValue: number);

    /**
     * The starting value
     * @type Number
     */
    public get startValue(): number;
  
    /**
     * Listen for an event.
     * @param {"change" | "target"} event name of the event
     * @param {Function} listener function to call when the event occurs
     */
    public on(event: CounterEvent, listener: (...args: any[]) => void): EventEmitter;
  
    /**
     * Listen for an event once.
     * @param {"change" | "target"} event name of the event
     * @param {Function} listener function to call when the event occurs
     */
    public once(event: CounterEvent, listener: (...args: any[]) => void): EventEmitter;

    private emit(event: CounterEvent, ...args: any[]): EventEmitter;
  }

  type CounterEvent = 'change' | 'target'

  interface CounterOptions {
    target: number;
    once: boolean;
    exactMatch: boolean;
  }

  export = Counter
}
