export interface PomodoroState {
	onEnterState(): void;
	onExitState(): void;
	onToggle(): void;
	onReset(): void;
	incrementMin(): void;
	decrementMin(): void;
	incrementSec(): void;
	decrementSec(): void;
	updateDisplay(): void;
}
