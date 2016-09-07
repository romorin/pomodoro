import { Pomodoro2Page } from './app.po';

describe('pomodoro2 App', function() {
  let page: Pomodoro2Page;

  beforeEach(() => {
    page = new Pomodoro2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
