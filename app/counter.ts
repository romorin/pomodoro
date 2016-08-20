import { Timer } from './timer';
import { CounterContext } from './counter-context';
import { CounterDecoration } from './counter-decoration';
import { CounterState } from './counter-state';
import { CounterRunState } from './counter-run-state';
import { CounterEditState } from './counter-edit-state';
import { CounterId } from './counter-id';
import { CounterStatus } from './counter-status';

export class Counter implements CounterContext {
	private runState : CounterState;
	private editState : CounterState;
	private currentState : CounterState;
	private decorations: {[status: number]: CounterDecoration} = {};

	constructor(
		public limit: number,
		public timer: Timer,
		public id: CounterId,
		public nextId: CounterId,
		runningDecorations: CounterDecoration,
		pausedDecorations: CounterDecoration,
		overDecorations: CounterDecoration
	) {
		this.decorations[CounterStatus.Running] = runningDecorations;
		this.decorations[CounterStatus.Paused] = pausedDecorations;
		this.decorations[CounterStatus.Over] = overDecorations;

		this.runState = new CounterRunState(this);
		this.editState = new CounterEditState(this);
		this.currentState = this.runState;
	}

	public decorate(status: CounterStatus) {
		this.timer.leftDecoration = this.decorations[status].left;
		this.timer.rightDecoration = this.decorations[status].right;
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

	public start() {
		this.currentState.start();
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
