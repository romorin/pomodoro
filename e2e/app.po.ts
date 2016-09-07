export class PomodoroPage {
  navigateTo() {
    return browser.get('/');
  }

  getEditButtonText() {
    return element(by.css('.action-buttons > button:last-child')).getText();
  }
}
