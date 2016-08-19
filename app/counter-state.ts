export interface CounterState {
	start() : void;
	reset() : void;
	onStateExit() : void;
	onStateEnter() : void;
	updateDisplay() : void;
	toggle() : void;
	incrementMin() : void;
	decrementMin() : void;
	incrementSec() : void;
	decrementSec() : void;
}
