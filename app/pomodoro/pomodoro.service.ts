import { Injectable } from '@angular/core';

import { CounterFactory } from './counter.factory';
import { PomodoroFactory } from './pomodoro.factory';
import { RunningPomodoroFactory } from './running-pomodoro.factory';
import { EditingPomodoroFactory } from './editing-pomodoro.factory';
import { Constants, WorkCounterConstants, PauseCounterConstants } from './constants';

import { Pomodoro } from './pomodoro';
import { PomodoroDisplay } from './pomodoro-display';

@Injectable()
export class PomodoroService {
	private _pomodoro: Pomodoro;

	constructor(
			counterFactory: CounterFactory,
			runningPomodoroFactory: RunningPomodoroFactory,
			editPomodoroFactory: EditingPomodoroFactory,
			pomodoroFactory: PomodoroFactory,
			constants: Constants,
			workCounterConstants: WorkCounterConstants,
			pauseCounterConstants: PauseCounterConstants,
			private _display: PomodoroDisplay
		) {

		let workCounter = counterFactory.init(workCounterConstants);
		let pauseCounter = counterFactory.init(pauseCounterConstants);

		let runPomodoro = runningPomodoroFactory.init(workCounter, pauseCounter, this._display, constants);
		let editPomodoro = editPomodoroFactory.init(workCounter, pauseCounter, this._display, constants);

		this._pomodoro = pomodoroFactory.init(runPomodoro, editPomodoro, this._display);
	}
	get pomodoro() { return this._pomodoro; }
	get display() { return this._display; }
}
