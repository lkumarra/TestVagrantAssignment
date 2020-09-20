import { Config} from "protractor";
import { suites } from "../Suites/Suites";
import * as moveFile from "move-file";
import * as process from "process";
let HtmlReporter = require("protractor-beautiful-reporter");
let jasmineReporters = require("jasmine-reporters");
let exec = require("child_process");
let locateChrome = require("locate-chrome");
let AllureReporter = require("jasmine-allure-reporter");
let colors = require("colors");
let displayProcessor = require("jasmine-spec-reporter").DisplayProcessor;
let globals = require("protractor");
let totalDateString: string;
let jsonsFolderName: string = "jsons";
let screenshotsFolderName: string = "screenshots";
let reportName: string = "TestVagrant";
let hideSkippedTest: any;
let reportDirectory: string =
  process.cwd() + "/Project/TestReports/";
let reportFolder: string = "TestVagrant";
let reportPath: string = reportDirectory + reportFolder;
let oldReportPath: string =
  process.cwd() + "/Project/OldTestReports";
let reportURl: string =
  reportDirectory + reportFolder + "/" + reportName + ".html";
let convert = (input) => {
  let output;
  if (input < 10) {
    output = "0" + input;
  } else {
    output = input;
  }
  return output;
};
function TimeProcessor(configuration) {}

function getTime() {
  let now = new Date();
  return (
    convert(now.getHours()) +
    ":" +
    convert(now.getMinutes()) +
    ":" +
    convert(now.getSeconds())
  );
}

TimeProcessor.prototype = new displayProcessor();

TimeProcessor.prototype.displaySuite = (suite, log) => {
  return getTime() + " - " + log;
};

TimeProcessor.prototype.displaySuccessfulSpec = (spec, log) => {
  return getTime() + " - " + log;
};

TimeProcessor.prototype.displayFailedSpec = (spec, log) => {
  return getTime() + " - " + log;
};

TimeProcessor.prototype.displayPendingSpec = (spec, log) => {
  return getTime() + " - " + log;
};

export let config: Config = {
  SELENIUM_PROMISE_MANAGER: false,
  suites: suites,
  useAllAngular2AppRoots: true,
  framework: "jasmine2",
  capabilities: {
    browserName: "chrome",
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 600000 * 3,
    print: () => {}, // print jasmine result (suppress protractor's default "dot" reporter)
  },
  onPrepare: async () => {
    let browser = globals.browser;
    let currentDate: Date = new Date();
    let specReporter: any;
    let infoToLog: any;
    let reporter: any;
    // Create Date and Time string
    totalDateString =
      currentDate.getFullYear() +
      "-" +
      convert(currentDate.getMonth() + 1) +
      "-" +
      convert(currentDate.getDate()) +
      "_" +
      convert(currentDate.getHours()) +
      "-" +
      convert(currentDate.getMinutes());
    //Move the old reportd to old reports folder.
    try{
    await moveFile(
      reportPath,
      oldReportPath + "/" + reportFolder + "_" + totalDateString
    );
    }catch(e){
      console.log("File is not present in directory so move operation can not performed")
    }
    process.setMaxListeners(100);
    console.log("The file has been moved");
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(10000);
    // Console reports
    specReporter = require("jasmine-spec-reporter").SpecReporter;
    reporter = new specReporter({
      customProcessors: [TimeProcessor],
      colors: { enabled: true },
      spec: { displayDuration: true },
      summary: { displayStacktrace: true },
    });
    infoToLog = {
      suiteStarted: (result) => {
        console.log(
          "\n  " +
            colors.bgBlue(' Running test: "' + result.description + '" ') +
            "\n"
        );
      },
      specStarted: (result) => {
        console.log(
          "\n    " +
            colors.bgCyan(' Running IT: "' + result.description + '" ') +
            "\n"
        );
      },
    };
    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(infoToLog);
    jasmine.getEnv().addReporter(reporter);
    //protractor-beautiful-reporter config
    jasmine.getEnv().addReporter(
      new HtmlReporter({
        docName: reportName + ".html",
        docTitle: "TestVagrant",
        baseDirectory: reportPath,
        jsonsSubfolder: jsonsFolderName,
        takeScreenShotsOnlyForFailedSpecs: true,
        excludeSkippedSpecs: hideSkippedTest,
        screenshotsSubfolder: screenshotsFolderName,
        clientDefaults: {
          showTotalDurationIn: "header",
          totalDurationFormat: "hms",
        },
        columnSettings: {
          displayTime: true,
          displayBrowser: false,
          displaySessionId: false,
          displayOS: false,
          inlineScreenshots: false,
          warningTime: 10000,
          dangerTime: 20000,
        },
      }).getJasmine2Reporter()
    );
    var junitReporter = new jasmineReporters.JUnitXmlReporter({
      // setup the output path for the junit reports
      savePath: reportPath,

      // conslidate all true:
      //   output/junitresults.xml
      //
      // conslidate all set to false:
      //   output/junitresults-example1.xml
      //   output/junitresults-example2.xml
      consolidateAll: true,
    });
    jasmine.getEnv().addReporter(junitReporter);
    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: "allure-results",
      })
    );
  },
  onComplete: async () => {
    locateChrome((where) => {
      // Print pdf report from html report
      console.log("Converting html report to pdf file");
      let command =
        '"' +
        where +
        '"' +
        " --headless --disable-gpu --print-to-pdf=" +
        reportPath +
        "/" +
        reportName +
        ".pdf --no-margins " +
        reportURl
      exec.execSync(command);
      console.log("Report Converted to pdf successfully")
    });
  },
};
