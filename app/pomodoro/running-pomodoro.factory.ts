import { Injectable } from '@angular/core';
import { Counter } from './counter';
import { PomodoroDisplay } from './pomodoro-display';
import { Constants } from './constants';
import { RunningPomodoro } from './running-pomodoro';

@Injectable()
export class RunningPomodoroFactory {
	public init(_workCounter: Counter, _pauseCounter: Counter,
			_display: PomodoroDisplay, _constants: Constants) {
		return new RunningPomodoro(_workCounter, _pauseCounter, _display, _constants);
	}
}
