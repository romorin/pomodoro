import { CounterState } from './counter-state';
import { CounterContext } from './counter-context';
import { CounterLabel } from './counter-label';

export class CounterRunState implements CounterState {
	private static get EDIT_LABEL():string { return "Edit"; }
	private static get RESET_LABEL():string { return "Reset"; }

	private currentState: CounterLabel;
	private remaining: number;
	private interval: any;

	constructor( private context: CounterContext ) {
		this.currentState = this.context.pausedLabel;
		this.remaining = this.context.limit;
		this.interval = null;
	}

	public set() {
		if (this.interval) {
			this.stopInterval();
		}
		this.remaining = this.context.limit;
		this.startCounting();
	}

	public reset() {
		if (this.interval) {
			this.stopInterval();
		}
		this.currentState = this.context.pausedLabel;
		this.remaining = this.context.limit;
	}

	onStateExit() {
		this.reset();
	}

	onStateEnter() {
		this.reset();
	}

	public updateDisplay() {
		this.context.timer.statusLabel = this.currentState.title;
		this.context.timer.countdown = this.remaining;
		this.context.timer.leftDecoration = this.currentState.leftDecoration;
		this.context.timer.rightDecoration = this.currentState.rightDecoration;
		this.context.timer.stateLabel = this.currentState.toggleLabel;
		this.context.timer.editLabel = CounterRunState.EDIT_LABEL;
		this.context.timer.resetLabel = CounterRunState.RESET_LABEL;
	}

	public toggle() {
		if (this.currentState === this.context.pausedLabel) {
			this.startCounting();
		} else if (this.currentState === this.context.runningLabel) {
			this.stopCounting();
		} else if (this.currentState === this.context.overLabel) {
			this.context.timer.switchCounter();
		}
	}

	public incrementMin() {}
	public decrementMin() {}
	public incrementSec() {}
	public decrementSec() {}

	private startCounting() {
		this.currentState = this.context.runningLabel;
		this.updateDisplay();
		this.interval = setInterval(() => {
			this.remaining -= 1;
			if(this.remaining < 1) {
				this.stopInterval();
				this.currentState = this.context.overLabel;
			}
			this.updateDisplay();
		}, 1000);
	}

	private stopCounting() {
		this.currentState = this.context.pausedLabel;
		this.stopInterval();
	}

	private stopInterval() {
		clearInterval(this.interval);
		this.interval = null;
	}
}
