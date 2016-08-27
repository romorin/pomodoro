export class Constants {
	public runningTitleTemplate = "@ for";
	public pausedTitleTemplate = "Start @";
	public overTitleTemplate = "# time";

	public runningToggleLabelTemplate = "Pause";
	public pausedToggleLabelTemplate = "Go!";
	public overToggleLabelTemplate = "Go #";

	public currentTemplateToken = "@";
	public nextTemplateToken = "#";

	public runningEditLabel = "Edit";
	public runningResetLabel = "Reset";


	public editToggleLabel = "Next";
	public editEditLabel = "Save";
	public editResetLabel = "Cancel";

	public workCounter = {
		action: "Working",
		length: 25 * 60,
		runningLeftDecoration: '<',
		runningRightDecoration: '>',
		pausedLeftDecoration: '<',
		pausedRightDecoration: '>',
		overLeftDecoration: '!',
		overRightDecoration: '!'
	};

	public pauseCounter = {
		action: "Walking",
		length: 5 * 60,
		runningLeftDecoration: '>',
		runningRightDecoration: '<',
		pausedLeftDecoration: '>',
		pausedRightDecoration: '<',
		overLeftDecoration: '$',
		overRightDecoration: '$'
	};
}
