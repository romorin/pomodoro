import { PomodoroState } from './pomodoro-state';
import { Timer } from './timer';

export class Pomodoro  {
	private _currentState: PomodoroState;

	constructor(private _runningState: PomodoroState,
			private _editState: PomodoroState, private _timer: Timer) {
		this._currentState = this._runningState;
		this._currentState.updateDisplay();
		this._timer.editing = false;
	}

	public onEdit(){
		this._timer.editing = !this._timer.editing;
		this._currentState.onExitState();
		this._currentState = this.getOtherState();
		this._currentState.onEnterState();
		this._currentState.updateDisplay();
	}

	public onToggle() {
		this._currentState.onToggle();
		this._currentState.updateDisplay();
	}

	public onReset() {
		this._currentState.onReset();
		if (this._currentState === this._editState) {
			this.onEdit();
		}
	}

	public incrementMin() {
		this._currentState.incrementMin();
		this._currentState.updateDisplay();
	}
	public decrementMin() {
		this._currentState.decrementMin();
		this._currentState.updateDisplay();
	}
	public incrementSec() {
		this._currentState.incrementSec();
		this._currentState.updateDisplay();
	}
	public decrementSec() {
		this._currentState.decrementSec();
		this._currentState.updateDisplay();
	}

	private getOtherState() {
		if (this._currentState === this._runningState) {
			return this._editState;
		} else {
			return this._runningState;
		}
	}
}
