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
					this._constants.runningTitleTemplate, this._constants.runningToggleLabelTemplate);
		this._templates[CounterStatus.Paused] = new CounterTemplate(
			this._constants.pausedTitleTemplate, this._constants.pausedToggleLabelTemplate);
		this._templates[CounterStatus.Over] = new CounterTemplate(
			this._constants.overTitleTemplate, this._constants.overToggleLabelTemplate);
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
		this._display.statusLabel = currentTemplate.titleLabel
			.replace(this._constants.currentTemplateToken, this._currentCounter.title)
			.replace(this._constants.nextTemplateToken, this.getOtherCounter().title);
		this._display.stateLabel = currentTemplate.toggleButtonLabel
			.replace(this._constants.currentTemplateToken, this._currentCounter.title)
			.replace(this._constants.nextTemplateToken, this.getOtherCounter().title);

		let decorations = this._currentCounter.getDecorations();
		this._display.leftDecoration = decorations.left;
		this._display.rightDecoration = decorations.right;

		this._display.countdown = this._currentCounter.remaining;
		this._display.editLabel = this._constants.runningEditLabel;
		this._display.resetLabel = this._constants.runningResetLabel;
	}

	private getOtherCounter() {
		if (this._currentCounter === this._workCounter) {
			return this._pauseCounter;
		} else {
			return this._workCounter;
		}
	}
}
