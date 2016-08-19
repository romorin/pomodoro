import { Timer } from './timer';
import { CounterLabel } from './counter-label';
import { CounterContext } from './counter-context';
import { CounterState } from './counter-state';
import { CounterRunState } from './counter-run-state';
import { CounterEditState } from './counter-edit-state';

export class Counter {
	private context : CounterContext;
	private runState : CounterState;
	private editState : CounterState;
	private currentState : CounterState;

	constructor( runningLabel: CounterLabel, pausedLabel: CounterLabel,
			overLabel: CounterLabel, limit: number, timer: Timer) {
		this.context = new CounterContext(runningLabel, pausedLabel, overLabel,
				limit, timer);
		this.runState = new CounterRunState(this.context);
		this.editState = new CounterEditState(this.context);
		this.currentState = this.runState;
	}

	public setEditing(editing: boolean) {
		if (editing && this.currentState === this.runState) {
			this.currentState.onStateExit();
			this.currentState = this.editState;
			this.currentState.onStateEnter();
		} else if (!editing && this.currentState === this.editState){
			this.currentState.onStateExit();
			this.currentState = this.runState;
			this.currentState.onStateEnter();
		}
	}

	public set() {
		this.currentState.set();
	}

	public reset() {
		this.currentState.reset();
	}

	public updateDisplay() {
		this.currentState.updateDisplay();
	}

	public toggle() {
		this.currentState.toggle();
	}

	public incrementMin() {
		this.currentState.incrementMin();
	}
	public decrementMin() {
		this.currentState.decrementMin();
	}
	public incrementSec() {
		this.currentState.incrementSec();
	}
	public decrementSec() {
		this.currentState.decrementSec();
	}
}
