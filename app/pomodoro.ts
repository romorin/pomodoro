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
	public resetLabel: string;
	public editing = false;

	constructor() {
			this.workCounter = new Counter(
				new CounterLabel('Work for', '<', '>', 'Pause'),
				new CounterLabel('Start Working', '<', '>', 'Start'),
				new CounterLabel('Walk time', '$', '$', 'Go Walk!'),
				70, this);
			this.pauseCounter = new Counter(
				new CounterLabel('Walk for', '>', '<', 'Pause'),
				new CounterLabel('Start Walking', '>', '<', 'Start'),
				new CounterLabel('Work time', '!', '!', 'Back To Work'),
				30, this);
			this.currentCounter = this.workCounter;
			this.currentCounter.updateDisplay();
		}

		public onEdit(){
			this.editing = !this.editing;
			this.pauseCounter.setEditing(this.editing);
			this.workCounter.setEditing(this.editing);
			this.currentCounter = this.workCounter;
			this.currentCounter.updateDisplay();
		}

		public onToggle() {
			this.currentCounter.toggle();
		}

		public onReset() {
			this.pauseCounter.reset();
			this.workCounter.reset();
			this.currentCounter = this.workCounter;
			this.currentCounter.updateDisplay();
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
				this.currentCounter.start();
				this.currentCounter.updateDisplay();
			}
		}

		public incrementMin() {
			this.currentCounter.incrementMin();
		}
		public decrementMin() {
			this.currentCounter.decrementMin();
		}
		public incrementSec() {
			this.currentCounter.incrementSec();
		}
		public decrementSec() {
			this.currentCounter.decrementSec();
		}
}
