import { CounterState } from './counter-state';
import { CounterContext } from './counter-context';

export class CounterEditState implements CounterState{
	private static get TOGGLE_LABEL():string { return "Next"; }
	private static get EDIT_LABEL():string { return "Save"; }
	private static get RESET_LABEL():string { return "Cancel"; }

	private originalLimit : number;

	constructor( private context: CounterContext ) {
		this.originalLimit = context.limit;
	}

	set() {}

	reset() {
		this.context.limit = this.originalLimit;
	}

	onStateExit() {
	}

	onStateEnter() {
		this.originalLimit = this.context.limit;
	}

	updateDisplay() {
		this.context.timer.statusLabel = this.context.pausedLabel.title;
		this.context.timer.countdown = this.context.limit;
		this.context.timer.stateLabel = CounterEditState.TOGGLE_LABEL;
		this.context.timer.editLabel = CounterEditState.EDIT_LABEL;
		this.context.timer.resetLabel = CounterEditState.RESET_LABEL;
	}

	toggle() {
		this.context.timer.switchCounter();
	}

	incrementMin() {
		this.context.limit += 60;
		this.updateDisplay();
	}

	decrementMin() {
		if (this.context.limit > 60) {
			this.context.limit -= 60;
		} else {
			this.context.limit = 1;
		}
		this.updateDisplay();
	}

	incrementSec() {
		this.context.limit += 1;
		this.updateDisplay();
	}

	decrementSec() {
		if (this.context.limit > 1) {
			this.context.limit -= 1;
			this.updateDisplay();
		}
	}
}
