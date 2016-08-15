import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
		styleUrls:  ['app/app.component.css']
})

export class AppComponent {
	statusLabel: string;
	countdown: number;
	leftDecoration: string;
	rightDecoration: string;
	stateLabel: string;
	editLabel: string;

	constructor() {
		this.statusLabel="go work";
		this.countdown= 1000;
		this.leftDecoration= "<";
		this.rightDecoration= ">";
		this.stateLabel= "state";
		this.editLabel= "edit";
	}
}
