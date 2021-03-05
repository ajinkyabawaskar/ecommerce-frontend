import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Protractor Demo App', function() {

  let page: AppPage;

  beforeEach(async () => {
    await browser.waitForAngularEnabled(false)
    page = new AppPage();
  });

  it('Should have a title', function() {
    browser.get('/');
    browser.getTitle().then(value => {
      expect(value).toBe('FlipZon')
    })
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
