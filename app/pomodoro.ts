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
			this.stateLabel = "Start";
			this.editLabel = "Edit";

			this.workCounter = new Counter(
				new CounterLabel('Work for', '<', '>'),
				new CounterLabel('Start Working', '<', '>'),
				new CounterLabel('Work done', '!', '!'),
				70, this);
			this.pauseCounter = new Counter(
				new CounterLabel('Walk for', '>', '<'),
				new CounterLabel('Start Walking', '>', '<'),
				new CounterLabel('Walk over', '$', '$'),
				30, this);
			this.currentCounter = this.workCounter;
			this.currentCounter.update();
		}

		onEdit(){}

		onToggle() {}
}
