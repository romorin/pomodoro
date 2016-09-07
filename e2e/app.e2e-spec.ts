import { PomodoroPage } from './app.po';

describe('pomodoro App', function() {
  let page: PomodoroPage;

  beforeEach(() => {
    page = new PomodoroPage();
  });

  it('should display Edit onn edit button', () => {
    page.navigateTo();
    expect(page.getEditButtonText()).toEqual('[Edit]');
  });
});
