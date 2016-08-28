import { Injectable } from '@angular/core';

import { CounterFactory } from './counter';
import { Pomodoro, PomodoroFactory } from './pomodoro';
import { PomodoroDisplay } from './pomodoro-display';
import { RunningPomodoroFactory } from './running-pomodoro';
import { EditingPomodoroFactory } from './editing-pomodoro';
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

@Injectable()
export class PomodoroService {
	private _pomodoro: Pomodoro;
	private _display: PomodoroDisplay;

	constructor(
			private counterFactory: CounterFactory,
			private runningPomodoroFactory: RunningPomodoroFactory,
			private editPomodoroFactory: EditingPomodoroFactory,
			private pomodoroFactory: PomodoroFactory) {
		let constants = new Constants();

		let workCounter = counterFactory.init(constants.workCounter);
		let pauseCounter = counterFactory.init(constants.pauseCounter);

		this._display = new Fields();
		let runPomodoro = runningPomodoroFactory.init(workCounter, pauseCounter, this._display, constants);
		let editPomodoro = editPomodoroFactory.init(workCounter, pauseCounter, this._display, constants);

		this._pomodoro = pomodoroFactory.init(runPomodoro, editPomodoro, this._display);
	}
	get pomodoro() { return this._pomodoro; }
	get display() { return this._display; }
}
