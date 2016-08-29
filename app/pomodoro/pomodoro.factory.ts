import { Injectable } from '@angular/core';
import { PomodoroState } from './pomodoro-state';
import { PomodoroDisplay } from './pomodoro-display';
import { Pomodoro } from './pomodoro';

@Injectable()
export class PomodoroFactory {
	public init(_runningState: PomodoroState, _editState: PomodoroState,
			_display: PomodoroDisplay) {
		return new Pomodoro(_runningState, _editState, _display);
	}
}
