import { Timer } from './timer';
import { Counter } from './counter';
import { CounterId } from './counter-id';
import { CounterStatus } from './counter-status';
import { CounterTemplate } from './counter-template';
import { CounterDecoration } from './counter-decoration';

export class Pomodoro implements Timer {
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

	constructor(private workCounter: Counter, private pauseCounter: Counter) {
		this.templates[CounterStatus.Running] =	new CounterTemplate("@ for", "Pause");
		this.templates[CounterStatus.Paused] = new CounterTemplate("Start @", "Go!");
		this.templates[CounterStatus.Over] = new CounterTemplate("# time", "#");
		this.verbs[CounterId.Work] = "Work";
		this.verbs[CounterId.Pause] = "Pause";
		
		this.currentCounter = this.workCounter;
		this.currentCounter.updateDisplay(this);
	}

	public onEdit(){
		this.editing = !this.editing;
		this.pauseCounter.setEditing(this, this.editing);
		this.workCounter.setEditing(this, this.editing);
		this.currentCounter = this.workCounter;
		this.currentCounter.updateDisplay(this);
	}

	public onToggle() {
		this.currentCounter.toggle(this);
		this.currentCounter.updateDisplay(this);
	}

	public onReset() {
		this.pauseCounter.reset(this);
		this.workCounter.reset(this);
		this.currentCounter = this.workCounter;
		this.currentCounter.updateDisplay(this);
	}

	public incrementMin() {
		this.currentCounter.incrementMin(this);
	}
	public decrementMin() {
		this.currentCounter.decrementMin(this);
	}
	public incrementSec() {
		this.currentCounter.incrementSec(this);
	}
	public decrementSec() {
		this.currentCounter.decrementSec(this);
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
			this.currentCounter.start(this);
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
