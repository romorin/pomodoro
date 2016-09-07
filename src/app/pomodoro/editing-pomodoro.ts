import { PomodoroState } from './pomodoro-state';
import { Counter } from './counter';
import { PomodoroDisplay } from './pomodoro-display';
import { Constants } from './constants';

export class EditingPomodoro implements PomodoroState {
	private _currentCounter: Counter;
	private _titleLabelSet = false;

	constructor(private _workCounter: Counter, private _pauseCounter: Counter,
			private _display: PomodoroDisplay, private _constants: Constants) {
		this._currentCounter = this._workCounter;
	}

	public onEnterState() {
		this.setCounter(this._workCounter);
		this._workCounter.backup();
		this._pauseCounter.backup();
	}

	public onExitState() {
		if (this._titleLabelSet) {
			this._currentCounter.title = this._display.titleLabel;
		}
	}

	public onToggle() {
		if (this._titleLabelSet) {
			this._currentCounter.title = this._display.titleLabel;
		}
		this.setCounter(this.getOtherCounter());
	}

	public onReset() {
		this._workCounter.restore();
		this._pauseCounter.restore();
		this.setCounter(this._workCounter);
		this._titleLabelSet = false;
	}

	public incrementMin() {
		this._currentCounter.length += 60;
	}
	public decrementMin() {
		this._currentCounter.length -= 60;
	}
	public incrementSec() {
		this._currentCounter.length += 1;
	}
	public decrementSec() {
		this._currentCounter.length -= 1;
	}
	public updateDisplay() {
		if (!this._titleLabelSet) {
			this._display.titleLabel = this._currentCounter.title;
			this._titleLabelSet = true;
		}
		this._display.countdown = this._currentCounter.length;
		this._display.toggleLabel = this._constants.EDIT_TOGGLE_LABEL;
		this._display.editLabel = this._constants.EDIT_EDIT_LABEL;
		this._display.resetLabel = this._constants.EDIT_RESET_LABEL;
	}

	private getOtherCounter() {
		if (this._currentCounter === this._workCounter) {
			return this._pauseCounter;
		} else {
			return this._workCounter;
		}
	}

	private setCounter(counter: Counter) {
		this._titleLabelSet = false;
		this._currentCounter = counter;
	}
}
