import { Counter } from './counter';
import { CounterDecoration } from './counter-decoration';
import { Pomodoro } from './pomodoro';
import { Timer } from './timer';
import { RunningPomodoro } from './running-pomodoro';
import { EditingPomodoro } from './editing-pomodoro';

class Fields implements Timer {
	public statusLabel = "";
	public countdown = 0;
	public leftDecoration = "";
	public rightDecoration = "";
	public stateLabel = "";
	public editLabel = "";
	public resetLabel = "";
	public editing = false;
}


export class PomodoroInitializer {
	private _pomodoro: Pomodoro;
	private _display: Timer;

	constructor() {
		let workCounter = new Counter("Working", 70,
				new CounterDecoration('<', '>'),
				new CounterDecoration('<', '>'),
				new CounterDecoration('!', '!'));
		let pauseCounter = new Counter("Walking", 30,
				new CounterDecoration('>', '<'),
				new CounterDecoration('>', '<'),
				new CounterDecoration('$', '$'));

		this._display = new Fields();
		let runPomodoro = new RunningPomodoro(workCounter, pauseCounter, this._display);
		let editPomodoro = new EditingPomodoro(workCounter, pauseCounter, this._display);

		this._pomodoro = new Pomodoro(runPomodoro, editPomodoro, this._display);
	}
	get pomodoro() { return this._pomodoro; }
	get display() { return this._display; }
}
