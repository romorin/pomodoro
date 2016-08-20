import { CounterState } from './counter-state';
import { CounterContext } from './counter-context';
import { CounterStatus } from './counter-status';

export class CounterRunState implements CounterState {
	private static get EDIT_LABEL():string { return "Edit"; }
	private static get RESET_LABEL():string { return "Reset"; }

	private currentStatus: CounterStatus;
	private remaining: number;
	private interval: any;

	constructor( private context: CounterContext ) {
		this.currentStatus = CounterStatus.Paused;
		this.remaining = this.context.limit;
		this.interval = null;
	}

	public start() {
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
		this.currentStatus = CounterStatus.Paused;
		this.remaining = this.context.limit;
	}

	onStateExit() {
		this.reset();
	}

	onStateEnter() {
		this.reset();
	}

	public updateDisplay() {
		this.context.timer.applyTemplates(this.currentStatus, this.context.id, this.context.nextId);
		this.context.timer.countdown = this.remaining;
		this.context.timer.editLabel = CounterRunState.EDIT_LABEL;
		this.context.timer.resetLabel = CounterRunState.RESET_LABEL;
	}

	public toggle() {
		if (this.currentStatus === CounterStatus.Paused) {
			this.startCounting();
		} else if (this.currentStatus ===  CounterStatus.Running) {
			this.stopCounting();
		} else if (this.currentStatus ===  CounterStatus.Over) {
			this.context.timer.switchCounter();
		}
	}

	public incrementMin() {}
	public decrementMin() {}
	public incrementSec() {}
	public decrementSec() {}

	private startCounting() {
		this.currentStatus = CounterStatus.Running;
		this.updateDisplay();
		this.interval = setInterval(() => {
			this.remaining -= 1;
			if(this.remaining < 1) {
				this.stopInterval();
				this.currentStatus = CounterStatus.Over;
			}
			this.updateDisplay();
		}, 1000);
	}

	private stopCounting() {
		this.currentStatus = CounterStatus.Paused;
		this.stopInterval();
	}

	private stopInterval() {
		clearInterval(this.interval);
		this.interval = null;
	}
}
