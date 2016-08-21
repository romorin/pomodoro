import { CounterState } from './counter-state';
import { CounterContext } from './counter-context';
import { CounterStatus } from './counter-status';
import { Timer } from './timer';
import { TimerLabelGenerator } from './timer-label-generator';

export class CounterEditState implements CounterState{
	private static get TOGGLE_LABEL():string { return "Next"; }
	private static get EDIT_LABEL():string { return "Save"; }
	private static get RESET_LABEL():string { return "Cancel"; }

	private originalLimit : number;

	constructor(private timerLabelGenerator: TimerLabelGenerator) {}

	start(counter: CounterContext, timer: Timer) {}

	reset(counter: CounterContext, timer: Timer) {
		counter.limit = this.originalLimit;
	}

	onStateExit(counter: CounterContext, timer: Timer) {
	}

	onStateEnter(counter: CounterContext, timer: Timer) {
		this.originalLimit = counter.limit;
	}

	updateDisplay(counter: CounterContext, timer: Timer) {
		timer.statusLabel = this.timerLabelGenerator.getVerb(counter.id);
		timer.countdown = counter.limit;
		timer.stateLabel = CounterEditState.TOGGLE_LABEL;
		timer.editLabel = CounterEditState.EDIT_LABEL;
		timer.resetLabel = CounterEditState.RESET_LABEL;
	}

	toggle(counter: CounterContext, timer: Timer) {
		timer.switchCounter();
	}

	incrementMin(counter: CounterContext, timer: Timer) {
		counter.limit += 60;
		this.updateDisplay(counter, timer);
	}

	decrementMin(counter: CounterContext, timer: Timer) {
		if (counter.limit > 60) {
			counter.limit -= 60;
		} else {
			counter.limit = 1;
		}
		this.updateDisplay(counter, timer);
	}

	incrementSec(counter: CounterContext, timer: Timer) {
		counter.limit += 1;
		this.updateDisplay(counter, timer);
	}

	decrementSec(counter: CounterContext, timer: Timer) {
		if (counter.limit > 1) {
			counter.limit -= 1;
			this.updateDisplay(counter, timer);
		}
	}
}
