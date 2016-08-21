import { CounterState } from './counter-state';
import { CounterContext } from './counter-context';
import { CounterStatus } from './counter-status';
import { CounterDecoration } from './counter-decoration';
import { Timer } from './timer';
import { TimerLabelGenerator } from './timer-label-generator';

export class CounterRunState implements CounterState {
	private static get EDIT_LABEL():string { return "Edit"; }
	private static get RESET_LABEL():string { return "Reset"; }

	private currentStatus: CounterStatus;
	private remaining: number;
	private interval: any;
	private decorations: {[status: number]: CounterDecoration} = {};

	constructor( private timerLabelGenerator: TimerLabelGenerator,
			runningDecorations: CounterDecoration,
			pausedDecorations: CounterDecoration,
			overDecorations: CounterDecoration ) {
		this.currentStatus = CounterStatus.Paused;
		this.remaining = null;
		this.interval = null;

		this.decorations[CounterStatus.Running] = runningDecorations;
		this.decorations[CounterStatus.Paused] = pausedDecorations;
		this.decorations[CounterStatus.Over] = overDecorations;
	}

	public reset(counter: CounterContext, timer: Timer) {
		if (this.interval) {
			this.stopInterval(counter, timer);
		}
		this.currentStatus = CounterStatus.Paused;
		this.remaining = counter.limit;
	}

	onStateExit(counter: CounterContext, timer: Timer) {
		this.reset(counter, timer);
	}

	onStateEnter(counter: CounterContext, timer: Timer) {
		this.remaining = counter.limit;
	}

	onCounterEnter(counter: CounterContext, timer: Timer) {
		if (this.interval) {
			this.stopInterval(counter, timer);
		}
		this.remaining = counter.limit;
		this.startCounting(counter, timer);
	}

	onCounterExit(counter: CounterContext, timer: Timer) {

	}

	public updateDisplay(counter: CounterContext, timer: Timer) {
		this.timerLabelGenerator.applyTemplates(timer, counter, this.currentStatus);
		timer.leftDecoration = this.decorations[this.currentStatus].left;
		timer.rightDecoration = this.decorations[this.currentStatus].right;
		timer.countdown = this.remaining !== null ? this.remaining : counter.limit;
		timer.editLabel = CounterRunState.EDIT_LABEL;
		timer.resetLabel = CounterRunState.RESET_LABEL;
	}

	public toggle(counter: CounterContext, timer: Timer) {
		if (this.currentStatus === CounterStatus.Paused) {
			this.startCounting(counter, timer);
		} else if (this.currentStatus ===  CounterStatus.Running) {
			this.stopCounting(counter, timer);
		} else if (this.currentStatus ===  CounterStatus.Over) {
			timer.switchCounter();
		}
	}

	public incrementMin(counter: CounterContext, timer: Timer) {}
	public decrementMin(counter: CounterContext, timer: Timer) {}
	public incrementSec(counter: CounterContext, timer: Timer) {}
	public decrementSec(counter: CounterContext, timer: Timer) {}

	private startCounting(counter: CounterContext, timer: Timer) {
		if (this.remaining === null) {
			this.remaining = counter.limit;
		}
		this.currentStatus = CounterStatus.Running;
		this.updateDisplay(counter, timer);
		this.interval = setInterval(() => {
			this.remaining -= 1;
			if(this.remaining < 1) {
				this.stopInterval(counter, timer);
				this.currentStatus = CounterStatus.Over;
			}
			this.updateDisplay(counter, timer);
		}, 1000);
	}

	private stopCounting(counter: CounterContext, timer: Timer) {
		this.currentStatus = CounterStatus.Paused;
		this.stopInterval(counter, timer);
	}

	private stopInterval(counter: CounterContext, timer: Timer) {
		clearInterval(this.interval);
		this.interval = null;
	}
}
