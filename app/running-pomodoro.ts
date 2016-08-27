import { Counter } from './counter';
import { CounterStatus } from './counter-status';
import { Timer } from './timer';
import { PomodoroState } from './pomodoro-state';

class CounterTemplate {
	constructor(
		public titleLabel: string,
		public toggleButtonLabel: string
	) {}
}

export class RunningPomodoro implements PomodoroState {
	private static get EDIT_LABEL():string { return "Edit"; }
	private static get RESET_LABEL():string { return "Reset"; }

	private _currentCounter: Counter;
	private _templates: {[status: number]: CounterTemplate} = {};

	constructor(private _workCounter: Counter, private _pauseCounter: Counter,
			private _timer: Timer) {
		this._currentCounter = this._workCounter;

		this._templates[CounterStatus.Running] =	new CounterTemplate("@ for", "Pause");
		this._templates[CounterStatus.Paused] = new CounterTemplate("Start @", "Go!");
		this._templates[CounterStatus.Over] = new CounterTemplate("# time", "#");
	}

	public onEnterState() {}
	public onExitState() { this.onReset(); }

	public onToggle() {
		if(this._currentCounter.status === CounterStatus.Over) {
			this._currentCounter.reset();
			this._currentCounter = this.getOtherCounter();
		}
		this._currentCounter.toggle((counter: Counter) => {this.updateDisplay();});
	}

	public onReset() {
		this._workCounter.reset();
		this._pauseCounter.reset();
		this._currentCounter = this._workCounter;
	}

	// does not edit
	public incrementMin() {}
	public decrementMin() {}
	public incrementSec() {}
	public decrementSec() {}

	public updateDisplay() {
		let currentTemplate = this._templates[this._currentCounter.status];
		this._timer.statusLabel = currentTemplate.titleLabel
			.replace('@', this._currentCounter.title)
			.replace('#', this.getOtherCounter().title);
		this._timer.stateLabel = currentTemplate.toggleButtonLabel
			.replace('@', this._currentCounter.title)
			.replace('#', this.getOtherCounter().title);

		let decorations = this._currentCounter.getDecorations();
		this._timer.leftDecoration = decorations.left;
		this._timer.rightDecoration = decorations.right;

		this._timer.countdown = this._currentCounter.remaining;
		this._timer.editLabel = RunningPomodoro.EDIT_LABEL;
		this._timer.resetLabel = RunningPomodoro.RESET_LABEL;
	}

	private getOtherCounter() {
		if (this._currentCounter === this._workCounter) {
			return this._pauseCounter;
		} else {
			return this._workCounter;
		}
	}
}
