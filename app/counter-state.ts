import { CounterContext } from './counter-context';
import { Timer } from './timer';

export interface CounterState {
	start(counter: CounterContext, timer: Timer) : void;
	reset(counter: CounterContext, timer: Timer) : void;
	onStateExit(counter: CounterContext, timer: Timer) : void;
	onStateEnter(counter: CounterContext, timer: Timer) : void;
	updateDisplay(counter: CounterContext, timer: Timer) : void;
	toggle(counter: CounterContext, timer: Timer) : void;
	incrementMin(counter: CounterContext, timer: Timer) : void;
	decrementMin(counter: CounterContext, timer: Timer) : void;
	incrementSec(counter: CounterContext, timer: Timer) : void;
	decrementSec(counter: CounterContext, timer: Timer) : void;
}
