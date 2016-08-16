import { Timer } from './timer';
import { Counter } from './counter';
import { CounterLabel } from './counter-label';

export class Pomodoro implements Timer {
	private workCounter: Counter;
	private pauseCounter: Counter;
	private currentCounter: Counter;

	public statusLabel: string;
	public countdown: number;
	public leftDecoration: string;
	public rightDecoration: string;
	public stateLabel: string;
	public editLabel: string;

	constructor() {
			// TODO
			this.editLabel = "Edit";

			this.workCounter = new Counter(
				new CounterLabel('Work for', '<', '>', 'Pause'),
				new CounterLabel('Start Working', '<', '>', 'Start'),
				new CounterLabel('Work done', '!', '!', 'Go Walk'),
				70, this);
			this.pauseCounter = new Counter(
				new CounterLabel('Walk for', '>', '<', 'Pause'),
				new CounterLabel('Start Walking', '>', '<', 'Start'),
				new CounterLabel('Walk over', '$', '$', 'Back To Work'),
				30, this);
			this.currentCounter = this.workCounter;
			this.currentCounter.updateDisplay();
		}

		public onEdit(){}

		public onToggle() {
			this.currentCounter.toggle();
		}

		public switchCounter() {
			let newCounter : Counter;
			if (this.currentCounter === this.workCounter) {
				newCounter = this.pauseCounter;
			} else {
				newCounter = this.workCounter;
			}
			if (newCounter !== this.currentCounter) {
				this.currentCounter = newCounter;
				this.currentCounter.set();
				this.currentCounter.updateDisplay();
			}
		}
}
