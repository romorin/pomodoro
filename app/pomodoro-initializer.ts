import { CounterRunState } from './counter-run-state';
import { CounterEditState } from './counter-edit-state';
import { CounterDecoration } from './counter-decoration';
import { Counter } from './counter';
import { CounterId } from './counter-id';
import { Pomodoro } from './pomodoro';

export class PomodoroInitializer {
	constructor() {}
	init() {
		let workRunState = new CounterRunState(
			new CounterDecoration('<', '>'),
			new CounterDecoration('<', '>'),
			new CounterDecoration('!', '!')
		);
		let pauseRunState = new CounterRunState(
			new CounterDecoration('>', '<'),
			new CounterDecoration('>', '<'),
			new CounterDecoration('$', '$')
		);
		let workEditState = new CounterEditState();
		let pauseEditState = new CounterEditState();

		let workCounter = new Counter(70, CounterId.Work, CounterId.Pause, workRunState, workEditState);
		let pauseCounter = new Counter(30, CounterId.Pause, CounterId.Work, pauseRunState, pauseEditState);

		return new Pomodoro(workCounter, pauseCounter);
	}
}
