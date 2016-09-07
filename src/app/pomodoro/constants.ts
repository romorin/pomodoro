import { CounterConstants } from './counter-constants';

export class WorkCounterConstants implements CounterConstants {
	public get ACTION(): string { return 'Working'; };
	public get LENGTH(): number { return 25 * 60; };

	public get RUNNING_LEFT_DECORATION(): string { return '<'; };
	public get RUNNING_RIGHT_DECORATION(): string { return '>'; };
	public get PAUSED_LEFT_DECORATION(): string { return '<'; };
	public get PAUSED_RIGHT_DECORATION(): string { return '>'; };
	public get OVER_LEFT_DECORATION(): string { return '!'; };
	public get OVER_RIGHT_DECORATION(): string { return '!'; };
}

export class PauseCounterConstants implements CounterConstants {
	public get ACTION(): string { return 'Walking'; };
	public get LENGTH(): number { return 5 * 60; };

	public get RUNNING_LEFT_DECORATION(): string { return '>'; };
	public get RUNNING_RIGHT_DECORATION(): string { return '<'; };
	public get PAUSED_LEFT_DECORATION(): string { return '>'; };
	public get PAUSED_RIGHT_DECORATION(): string { return '<'; };
	public get OVER_LEFT_DECORATION(): string { return '$'; };
	public get OVER_RIGHT_DECORATION(): string { return '$'; };
}

export class Constants {
	public get RUNNING_TITLE_TEMPLATE(): string { return '@ for'; };
	public get PAUSED_TITLE_TEMPLATE(): string { return 'Start @'; };
	public get OVER_TITLE_TEMPLATE(): string { return '# time'; };

	public get RUNNING_TOGGLE_LABEL_TEMPLATE(): string { return 'Pause'; };
	public get PAUSED_TOGGLE_LABEL_TEMPLATE(): string { return 'Go!'; };
	public get OVER_TOGGLE_LABEL_TEMPLATE(): string { return 'Go #'; };

	public get CURRENT_TEMPLATE_TOKEN(): string { return '@'; };
	public get NEXT_TEMPLATE_TOKEN(): string { return '#'; };

	public get RUNNING_EDIT_LABEL(): string { return 'Edit'; };
	public get RUNNING_RESET_LABEL(): string { return 'Reset'; };

	public get EDIT_TOGGLE_LABEL(): string { return 'Next'; };
	public get EDIT_EDIT_LABEL(): string { return 'Save'; };
	public get EDIT_RESET_LABEL(): string { return 'Cancel'; };
}
