import { CounterFactory } from './counter';
import { RunningPomodoroFactory } from './running-pomodoro';
import { EditingPomodoroFactory } from './editing-pomodoro';
import { PomodoroFactory } from './pomodoro';

export const MODULE_POMODORO: any[] = [CounterFactory, RunningPomodoroFactory, EditingPomodoroFactory, PomodoroFactory];
