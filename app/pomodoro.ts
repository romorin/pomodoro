import { Timer } from './timer';
import { Counter } from './counter';
import { CounterId } from './counter-id';
import { CounterStatus } from './counter-status';
import { CounterTemplate } from './counter-template';
import { CounterDecoration } from './counter-decoration';

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

	private templates: {[status: number]: CounterTemplate} = {};
	private verbs: {[id: number]: string} = {};

	constructor() {
		this.templates[CounterStatus.Running] =	new CounterTemplate("@ for", "Pause");
		this.templates[CounterStatus.Paused] = new CounterTemplate("Start @", "Go!");
		this.templates[CounterStatus.Over] = new CounterTemplate("# time", "#");
		this.verbs[CounterId.Work] = "Work";
		this.verbs[CounterId.Pause] = "Pause";

		this.workCounter = new Counter(
			70, this, CounterId.Work, CounterId.Pause,
			new CounterDecoration('<', '>'),
			new CounterDecoration('<', '>'),
			new CounterDecoration('!', '!'));
		this.pauseCounter = new Counter(
			30, this, CounterId.Pause, CounterId.Work,
			new CounterDecoration('>', '<'),
			new CounterDecoration('>', '<'),
			new CounterDecoration('$', '$'));
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
		this.currentCounter.updateDisplay();
	}

	public onReset() {
		this.pauseCounter.reset();
		this.workCounter.reset();
		this.currentCounter = this.workCounter;
		this.currentCounter.updateDisplay();
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
		}
	}

	public applyTemplates(status: CounterStatus, current: CounterId, next: CounterId) {
		this.statusLabel = this.templates[status].titleLabel.replace('@', this.verbs[current]).
				replace('#', this.verbs[next]);
		this.stateLabel = this.templates[status].toggleButtonLabel.replace('@', this.verbs[current]).
				replace('#', this.verbs[next]);
	}

	public getVerb(id:CounterId) {
		return this.verbs[id];
	}
}
