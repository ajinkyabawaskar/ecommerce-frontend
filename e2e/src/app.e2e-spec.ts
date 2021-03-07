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


});
