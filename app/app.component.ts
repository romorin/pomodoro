import { Component } from '@angular/core';
import { Pomodoro } from './pomodoro';
import { PomodoroInitializer } from './pomodoro-initializer';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
		styleUrls:  ['app/app.component.css']
})

export class AppComponent {
	pomodoro: Pomodoro;

	constructor() {
		this.pomodoro = new PomodoroInitializer().init();
	}

	public onEdit(){ this.pomodoro.onEdit(); }
	public onToggle() { this.pomodoro.onToggle(); }
	public onReset() { this.pomodoro.onReset(); }

	public incrementMin() { this.pomodoro.incrementMin(); }
	public decrementMin() { this.pomodoro.decrementMin(); }
	public incrementSec() { this.pomodoro.incrementSec(); }
	public decrementSec() { this.pomodoro.decrementSec(); }
}
