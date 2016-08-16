import { Timer } from './timer';
import { CounterLabel } from './counter-label';

export class Counter {
	private currentState: CounterLabel;
	private remaining: number;
	private interval: any;

	constructor(
			private runningLabel: CounterLabel,
			private pausedLabel: CounterLabel,
			private overLabel: CounterLabel,
			private limit: number,
			private timer: Timer) {
		this.currentState = this.pausedLabel;
		this.remaining = this.limit;
		this.interval = null;
	}

	public set() {
		if (this.interval) {
			this.stopInterval();
		}
		this.remaining = this.limit;
		this.startCounting();
	}

	public reset() {
		if (this.interval) {
			this.stopInterval();
		}
		this.currentState = this.pausedLabel;
		this.remaining = this.limit;
	}

	public updateDisplay() {
		this.timer.statusLabel = this.currentState.title;
		this.timer.countdown = this.remaining;
		this.timer.leftDecoration = this.currentState.leftDecoration;
		this.timer.rightDecoration = this.currentState.rightDecoration;
		this.timer.stateLabel = this.currentState.toggleLabel;
	}

	public toggle() {
		if (this.currentState === this.pausedLabel) {
			this.startCounting();
		} else if (this.currentState === this.runningLabel) {
			this.stopCounting();
		} else if (this.currentState === this.overLabel) {
			this.timer.switchCounter();
		}
	}

	private startCounting() {
		this.currentState = this.runningLabel;
		this.updateDisplay();
		this.interval = setInterval(() => {
			this.remaining -= 1;
			if(this.remaining < 1) {
				this.stopInterval();
				this.currentState = this.overLabel;
			}
			this.updateDisplay();
		}, 1000);
	}

	private stopCounting() {
		this.currentState = this.pausedLabel;
		this.stopInterval();
	}

	private stopInterval() {
		clearInterval(this.interval);
		this.interval = null;
	}
}
