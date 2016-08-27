import { Component } from '@angular/core';
import { Pomodoro } from './pomodoro';
import { Timer } from './timer';
import { PomodoroInitializer } from './pomodoro-initializer';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
		styleUrls:  ['app/app.component.css']
})
export class AppComponent {
	public pomodoro: Timer;
	private controller: Pomodoro;

	constructor() {
		let pomodoroInit = new PomodoroInitializer();
		this.pomodoro = pomodoroInit.display;
		this.controller = pomodoroInit.pomodoro;
	}

	public onEdit(){ this.controller.onEdit(); }
	public onToggle() { this.controller.onToggle(); }
	public onReset() { this.controller.onReset(); }

	public incrementMin() { this.controller.incrementMin(); }
	public decrementMin() { this.controller.decrementMin(); }
	public incrementSec() { this.controller.incrementSec(); }
	public decrementSec() { this.controller.decrementSec(); }
}
