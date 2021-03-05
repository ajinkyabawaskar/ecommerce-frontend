import {browser, by, element, logging, protractor} from 'protractor';
import { AppPage } from './app.po';

describe('Protractor Demo App', function() {

  let page: AppPage;

  beforeEach(async () => {
    browser.waitForAngularEnabled(false);
    page = new AppPage();
  });

  it('Should have a title', function() {
    browser.get('/');
    browser.getTitle().then(value => {
      expect(value).toBe('FlipZon')
    });
  });

  it('Should click login button', function() {
    browser.get('/');
    element(by.xpath('//body/app-root[1]/app-navbar[1]/div[1]/mat-toolbar[1]/button[1]')).click();
  });

  it('Should enter username & password', function() {
    browser.getCurrentUrl().then(value => {
      expect(value).toContain('/signin');
    });

    element(by.xpath('//input[@id=\'mat-input-0\']')).sendKeys('user');
    element(by.xpath('//input[@id=\'mat-input-1\']')).sendKeys('pass');
  });

  it('Should enter click login button', function() {
    element(by.xpath('//body/app-root[1]/app-navbar[1]/div[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/app-signin[1]/div[1]/div[1]/div[1]/mat-card[1]/mat-card-content[1]/form[1]/div[1]/div[3]/div[1]/button[1]')).click();
  });

  it('Should redirect', async function() {
    await browser.getCurrentUrl().then(value => {
      console.log(value);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
