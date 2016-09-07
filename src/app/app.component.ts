import { Component, OnInit } from '@angular/core';
import { Pomodoro } from './pomodoro/pomodoro';
import { PomodoroDisplay } from './pomodoro/pomodoro-display';
import { PomodoroService } from './pomodoro/pomodoro.service';

import { MODULE_POMODORO } from './pomodoro/pomodoro.module';

@Component({
		selector: 'app-root',
		templateUrl: 'app.component.html',
		styleUrls:  ['app.component.css'],
		providers: [ PomodoroService, MODULE_POMODORO ]
})
export class AppComponent implements OnInit  {
	public pomodoro: PomodoroDisplay;
	private controller: Pomodoro;

	constructor(private pomodoroService: PomodoroService) {}

	ngOnInit(): void {
		this.pomodoro = this.pomodoroService.display;
		this.controller = this.pomodoroService.pomodoro;
	}

	public onEdit() { this.controller.onEdit(); }
	public onToggle() { this.controller.onToggle(); }
	public onReset() { this.controller.onReset(); }

	public incrementMin() { this.controller.incrementMin(); }
	public decrementMin() { this.controller.decrementMin(); }
	public incrementSec() { this.controller.incrementSec(); }
	public decrementSec() { this.controller.decrementSec(); }
}
