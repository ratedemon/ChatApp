import { FirebasePage } from './app.po';

describe('firebase App', () => {
  let page: FirebasePage;

  beforeEach(() => {
    page = new FirebasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
