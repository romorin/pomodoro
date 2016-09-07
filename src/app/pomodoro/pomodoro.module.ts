import { CounterFactory } from './counter.factory';
import { RunningPomodoroFactory } from './running-pomodoro.factory';
import { EditingPomodoroFactory } from './editing-pomodoro.factory';
import { PomodoroFactory } from './pomodoro.factory';
import { PomodoroDisplay } from './pomodoro-display';
import { Constants, WorkCounterConstants, PauseCounterConstants } from './constants';

export const MODULE_POMODORO: any[] = [
	CounterFactory, RunningPomodoroFactory, EditingPomodoroFactory, PomodoroFactory,
	Constants, WorkCounterConstants, PauseCounterConstants, PomodoroDisplay
];
