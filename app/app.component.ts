import { Component, OnInit } from '@angular/core';
import { Pomodoro } from './pomodoro';
import { PomodoroDisplay } from './pomodoro-display';
import { PomodoroInitializer } from './pomodoro-initializer';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
		styleUrls:  ['app/app.component.css']
})
export class AppComponent implements OnInit  {
	public pomodoro: PomodoroDisplay;
	private controller: Pomodoro;

	constructor() {}

	ngOnInit(): void {
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
