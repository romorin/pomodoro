import { Component, OnInit } from '@angular/core';
import { Pomodoro } from './pomodoro';
import { PomodoroDisplay } from './pomodoro-display';
import { PomodoroService } from './pomodoro.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
		styleUrls:  ['app/app.component.css'],
		providers: [ PomodoroService ]
})
export class AppComponent implements OnInit  {
	public pomodoro: PomodoroDisplay;
	private controller: Pomodoro;

	constructor(private pomodoroService: PomodoroService) {}

	ngOnInit(): void {
		this.pomodoro = this.pomodoroService.display;
		this.controller = this.pomodoroService.pomodoro;
  }

	public onEdit(){ this.controller.onEdit(); }
	public onToggle() { this.controller.onToggle(); }
	public onReset() { this.controller.onReset(); }

	public incrementMin() { this.controller.incrementMin(); }
	public decrementMin() { this.controller.decrementMin(); }
	public incrementSec() { this.controller.incrementSec(); }
	public decrementSec() { this.controller.decrementSec(); }
}
