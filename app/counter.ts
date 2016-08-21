import { Timer } from './timer';
import { CounterContext } from './counter-context';
import { CounterDecoration } from './counter-decoration';
import { CounterState } from './counter-state';
import { CounterRunState } from './counter-run-state';
import { CounterEditState } from './counter-edit-state';
import { CounterId } from './counter-id';
import { CounterStatus } from './counter-status';

export class Counter implements CounterContext {
	private currentState : CounterState;

	constructor(
		public limit: number,
		public id: CounterId,
		public nextId: CounterId,
		private runState : CounterState,
		private editState : CounterState
	) {
		this.currentState = this.runState;
	}

	public setEditing( timer: Timer, editing: boolean) {
		if (editing && this.currentState === this.runState) {
			this.currentState.onStateExit(this, timer);
			this.currentState = this.editState;
			this.currentState.onStateEnter(this, timer);
		} else if (!editing && this.currentState === this.editState){
			this.currentState.onStateExit(this, timer);
			this.currentState = this.runState;
			this.currentState.onStateEnter(this, timer);
		}
	}

	public start(timer: Timer) {
		this.currentState.start(this, timer);
	}
	public reset(timer: Timer) {
		this.currentState.reset(this, timer);
	}
	public updateDisplay(timer: Timer) {
		this.currentState.updateDisplay(this, timer);
	}
	public toggle(timer: Timer) {
		this.currentState.toggle(this, timer);
	}
	public incrementMin(timer: Timer) {
		this.currentState.incrementMin(this, timer);
	}
	public decrementMin(timer: Timer) {
		this.currentState.decrementMin(this, timer);
	}
	public incrementSec(timer: Timer) {
		this.currentState.incrementSec(this, timer);
	}
	public decrementSec(timer: Timer) {
		this.currentState.decrementSec(this, timer);
	}
}
