import { Counter } from './counter';
import { CounterStatus } from './counter-status';
import { PomodoroDisplay } from './pomodoro-display';
import { PomodoroState } from './pomodoro-state';
import { Constants } from './constants';

class CounterTemplate {
	constructor(
		public titleLabel: string,
		public toggleButtonLabel: string
	) {}
}

export class RunningPomodoro implements PomodoroState {
	private _currentCounter: Counter;
	private _templates: {[status: number]: CounterTemplate} = {};

	constructor(private _workCounter: Counter, private _pauseCounter: Counter,
			private _display: PomodoroDisplay, private _constants: Constants) {
		this._currentCounter = this._workCounter;

		this._templates[CounterStatus.Running] = new CounterTemplate(
					this._constants.RUNNING_TITLE_TEMPLATE, this._constants.RUNNING_TOGGLE_LABEL_TEMPLATE);
		this._templates[CounterStatus.Paused] = new CounterTemplate(
			this._constants.PAUSED_TITLE_TEMPLATE, this._constants.PAUSED_TOGGLE_LABEL_TEMPLATE);
		this._templates[CounterStatus.Over] = new CounterTemplate(
			this._constants.OVER_TITLE_TEMPLATE, this._constants.OVER_TOGGLE_LABEL_TEMPLATE);
	}

	public onEnterState() {}
	public onExitState() { this.onReset(); }

	public onToggle() {
		if (this._currentCounter.status === CounterStatus.Over) {
			this._currentCounter.reset();
			this._currentCounter = this.getOtherCounter();
		}
		this._currentCounter.toggle((counter: Counter) => { this.updateDisplay(); });
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
		this._display.titleLabel = currentTemplate.titleLabel
			.replace(this._constants.CURRENT_TEMPLATE_TOKEN, this._currentCounter.title)
			.replace(this._constants.NEXT_TEMPLATE_TOKEN, this.getOtherCounter().title);
		this._display.toggleLabel = currentTemplate.toggleButtonLabel
			.replace(this._constants.CURRENT_TEMPLATE_TOKEN, this._currentCounter.title)
			.replace(this._constants.NEXT_TEMPLATE_TOKEN, this.getOtherCounter().title);

		let decorations = this._currentCounter.getDecorations();
		this._display.leftDecoration = decorations.left;
		this._display.rightDecoration = decorations.right;

		this._display.countdown = this._currentCounter.remaining;
		this._display.editLabel = this._constants.RUNNING_EDIT_LABEL;
		this._display.resetLabel = this._constants.RUNNING_RESET_LABEL;
	}

	private getOtherCounter() {
		if (this._currentCounter === this._workCounter) {
			return this._pauseCounter;
		} else {
			return this._workCounter;
		}
	}
}
