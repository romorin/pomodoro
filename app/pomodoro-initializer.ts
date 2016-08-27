import { Counter } from './counter';
import { CounterDecoration } from './counter-decoration';
import { Pomodoro } from './pomodoro';
import { PomodoroDisplay } from './pomodoro-display';
import { RunningPomodoro } from './running-pomodoro';
import { EditingPomodoro } from './editing-pomodoro';
import { Constants } from './constants';

class Fields implements PomodoroDisplay {
	public titleLabel = "";
	public countdown = 0;
	public leftDecoration = "";
	public rightDecoration = "";
	public toggleLabel = "";
	public editLabel = "";
	public resetLabel = "";
	public editing = false;
}


export class PomodoroInitializer {
	private _pomodoro: Pomodoro;
	private _display: PomodoroDisplay;

	constructor() {
		let constants = new Constants();

		let workCounter = new Counter(constants.workCounter);
		let pauseCounter = new Counter(constants.pauseCounter);

		this._display = new Fields();
		let runPomodoro = new RunningPomodoro(workCounter, pauseCounter, this._display, constants);
		let editPomodoro = new EditingPomodoro(workCounter, pauseCounter, this._display, constants);

		this._pomodoro = new Pomodoro(runPomodoro, editPomodoro, this._display);
	}
	get pomodoro() { return this._pomodoro; }
	get display() { return this._display; }
}
