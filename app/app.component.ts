import { Component } from '@angular/core';
import { Pomodoro } from './pomodoro';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
		styleUrls:  ['app/app.component.css']
})

export class AppComponent {
	pomodoro: Pomodoro;

	constructor() {
		this.pomodoro = new Pomodoro();
	}
}
