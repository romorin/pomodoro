import { CounterFactory } from './counter';
import { RunningPomodoroFactory } from './running-pomodoro';
import { EditingPomodoroFactory } from './editing-pomodoro';
import { PomodoroFactory } from './pomodoro';
import { Constants, WorkCounterConstants, PauseCounterConstants } from './constants';

export const MODULE_POMODORO: any[] = [
	CounterFactory, RunningPomodoroFactory, EditingPomodoroFactory, PomodoroFactory,
	Constants, WorkCounterConstants, PauseCounterConstants
];
