import { Injectable } from '@angular/core';

import { CounterFactory } from './counter';
import { Pomodoro, PomodoroFactory } from './pomodoro';
import { PomodoroDisplay } from './pomodoro-display';
import { RunningPomodoroFactory } from './running-pomodoro';
import { EditingPomodoroFactory } from './editing-pomodoro';
import { Constants, WorkCounterConstants, PauseCounterConstants } from './constants';

@Injectable()
export class PomodoroService {
	private _pomodoro: Pomodoro;
	private _display: PomodoroDisplay;

	constructor(
			private counterFactory: CounterFactory,
			private runningPomodoroFactory: RunningPomodoroFactory,
			private editPomodoroFactory: EditingPomodoroFactory,
			private pomodoroFactory: PomodoroFactory,
			private constants: Constants,
			private workCounterConstants: WorkCounterConstants,
			private pauseCounterConstants: PauseCounterConstants
		) {

		let workCounter = counterFactory.init(workCounterConstants);
		let pauseCounter = counterFactory.init(pauseCounterConstants);

		this._display = new PomodoroDisplay();
		let runPomodoro = runningPomodoroFactory.init(workCounter, pauseCounter, this._display, constants);
		let editPomodoro = editPomodoroFactory.init(workCounter, pauseCounter, this._display, constants);

		this._pomodoro = pomodoroFactory.init(runPomodoro, editPomodoro, this._display);
	}
	get pomodoro() { return this._pomodoro; }
	get display() { return this._display; }
}
