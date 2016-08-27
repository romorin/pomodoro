import { PomodoroState } from './pomodoro-state'
import { Counter } from './counter';
import { Timer } from './timer';
import { Constants } from './constants';

export class EditingPomodoro implements PomodoroState {
	private _currentCounter: Counter;
	private _titleLabelSet = false;

	constructor(private _workCounter: Counter, private _pauseCounter: Counter,
			private _timer: Timer, private _constants: Constants) {
		this._currentCounter = this._workCounter;
	}

	public onEnterState() {
		this.setCounter(this._workCounter);
		this._workCounter.backup();
		this._pauseCounter.backup();
	}

	public onExitState() {
		if (this._titleLabelSet) {
			this._currentCounter.title = this._timer.statusLabel;
		}
	}

	public onToggle() {
		if (this._titleLabelSet) {
			this._currentCounter.title = this._timer.statusLabel;
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
		if(!this._titleLabelSet) {
			this._timer.statusLabel = this._currentCounter.title;
			this._titleLabelSet = true;
		}
		this._timer.countdown = this._currentCounter.length;
		this._timer.stateLabel = this._constants.editToggleLabel;
		this._timer.editLabel = this._constants.editEditLabel;
		this._timer.resetLabel = this._constants.editResetLabel;
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
