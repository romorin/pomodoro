import { Timer } from './timer';
import { CounterLabel } from './counter-label';

export class Counter {
	private currentState: CounterLabel;
	private remaining: number;

	constructor(
			private runningLabel: CounterLabel,
			private pausedLabel: CounterLabel,
			private overLabel: CounterLabel,
			private limit: number,
			private timer: Timer) {
		this.currentState = this.pausedLabel;
		this.remaining = this.limit;
	}

	update() {
		this.timer.statusLabel = this.currentState.title;
		this.timer.countdown = this.remaining;
		this.timer.leftDecoration = this.currentState.leftDecoration;
		this.timer.rightDecoration = this.currentState.rightDecoration;
	}
}
