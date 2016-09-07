/* tslint:disable:no-unused-variable */
///<reference path="./../../typings/globals/jasmine/index.d.ts"/>

import { addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { PomodoroService } from './pomodoro/pomodoro.service';
import { MODULE_POMODORO } from './pomodoro/pomodoro.module';

describe('App: Pomodoro2', () => {
	beforeEach(() => {
		addProviders([AppComponent, PomodoroService, MODULE_POMODORO]);
	});

	it('should create the app',
		inject([AppComponent], (app: AppComponent) => {
			expect(app).toBeTruthy();
		}));
});
