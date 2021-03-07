// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    let HtmlReporter = require('protractor-beautiful-reporter');
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'reports_new',
      screenshotsSubfolder: 'screenshotsOnFailure',
      takeScreenShotsOnlyForFailedSpecs: true,
      jsonsSubfolder: 'jsonFiles',
      excludeSkippedSpecs: true,
      preserveDirectory: false,
      clientDefaults:{
        showTotalDurationIn: "header",
        totalDurationFormat: "h:m:s",
        gatherBrowserLogs: true
      },
    }).getJasmine2Reporter());
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        // displayStacktrace: StacktraceOption.PRETTY,
        displayStacktrace: StacktraceOption.NONE
      }
    }));
  }
};
