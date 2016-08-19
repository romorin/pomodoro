import { CounterLabel } from './counter-label';
import { Timer } from './timer';

export class CounterContext {
	constructor(
		public runningLabel: CounterLabel,
		public pausedLabel: CounterLabel,
		public overLabel: CounterLabel,
		public limit: number,
		public timer: Timer
	){}
}
