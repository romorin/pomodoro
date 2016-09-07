import { Injectable } from '@angular/core';
import { Counter } from './counter';
import { PomodoroDisplay } from './pomodoro-display';
import { Constants } from './constants';
import { EditingPomodoro } from './editing-pomodoro';

@Injectable()
export class EditingPomodoroFactory {
	public init(_workCounter: Counter, _pauseCounter: Counter,
			_display: PomodoroDisplay, _constants: Constants) {
		return new EditingPomodoro(_workCounter, _pauseCounter, _display, _constants);
	}
}
