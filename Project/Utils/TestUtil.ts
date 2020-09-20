import {
  ElementFinder,
  browser,
  ExpectedConditions,
  Locator,
  element,
  ProtractorExpectedConditions,
} from "protractor";
import { Workbook, Worksheet } from "exceljs";
let until: ProtractorExpectedConditions = ExpectedConditions;
let process = require("process");
const EXCEL_SHEET_PATH =
  process.cwd() +
  "\\Projects\\Guru99BankTestAutomation\\TestData\\Guru99Bank.xlsx";

export class TestUtil {
  private static _instanse: TestUtil = new TestUtil();
  /**
   * Return the object of TestUtil class.
   */
  public static getInstance(): TestUtil {
    return this._instanse;
  }

  /**
   * Retrun the element finder
   * @param locator
   */
  public async getElement(locator: Locator): Promise<ElementFinder> {
    return await element(locator);
  }

  /**
   * Explicitly wait until the element is clickble the default time is 30 second
   * @param webElement Webelement for which method wait until element is clickable
   * @param time Time for the expected conditions waits the default time is 30 second
   */
  private static async elmentToBeClickableWait(
    webElement: ElementFinder,
    time: number = 3000
  ) {
    await browser.wait(
      until.elementToBeClickable(webElement),
      time,
      "Element is not present on page limit was " + time + " milisecond"
    );
  }

  /**
   * Explicitly wait until the element is visible the default time is 30 second
   * @param webElement Webelement for which method method wait until element is visible
   * @param time Time for which expected condition waits the default time is 30 second
   */
  private static async elementToBeVisiblePresent(
    webElement: ElementFinder,
    time: number = 3000
  ) {
    await browser.wait(
      until.visibilityOf(webElement),
      time,
      "Element is not present on page limit was " + time + " milisecond"
    );
  }

  /**
   * Performed click action on the webelement
   * @param webElement Webelement on which click action is performed
   */
  public async clickOnElement(locator: ElementFinder) {
    await TestUtil.elmentToBeClickableWait(locator);
    await locator.click();
  }

  /**
   * Enter text into element after clearing the text box
   * @param webElement Webelement on which values to be enter
   * @param keyValues Values which user wants to enter
   */
  public async enterTextIntoTextBox(locator: ElementFinder, keyValues: string) {
    await TestUtil.elmentToBeClickableWait(locator);
    await locator.clear();
    await locator.sendKeys(keyValues);
  }

  /**
   * Enter text into text box without clear
   * @param WebElement
   * @param keyValues
   */
  public async enterTextIntoTextBoxWithoutClear(
    locator: ElementFinder,
    keyValues: string
  ): Promise<void> {
    await TestUtil.elmentToBeClickableWait(locator);
    await locator.sendKeys(keyValues);
  }

  /**
   * Schedule a command to get the text of web elemnt
   * @param webElement Webelement to get text
   * @returns Return the text of the web element
   */
  public async getWebElementText(locator: ElementFinder): Promise<string> {
    await TestUtil.elementToBeVisiblePresent(locator);
    return locator.getText();
  }

  /**
   * Schedule a command to get the attriute value of web elemnt
   * @param webElement Webelement to get attribute
   * @returns Return the attribute of the web element
   */
  public async getAttributeOfElement(
    locator: ElementFinder,
    attributeName: string
  ): Promise<string> {
    await TestUtil.elementToBeVisiblePresent(locator);
    return locator.getAttribute(attributeName);
  }

  /**
   * Switch to alert and get text of the alerts
   */
  public async getAlertText(): Promise<string> {
    let alertText: string = await browser.switchTo().alert().getText();
    return alertText;
  }

  /**
   * Perform a command to accept the alert
   */
  public async acceptAlert() {
    (await browser.switchTo().alert()).accept();
  }

  /**
   * Perform the command to reject the alert
   */
  public async dimissAlert() {
    (await browser.switchTo().alert()).dismiss();
  }

  /**
   * Clear the text of textbox.
   * @param webElement
   */
  public async clearTextBox(locator: ElementFinder) {
    await TestUtil.elmentToBeClickableWait(locator);
    await locator.clear();
  }

  /**
   * Perform click action on elementfinder using javascript.
   * @param locator Locator to click javascript.
   */
  public async jsClick(locator: ElementFinder) {
    await browser.executeScript("arguments[0].click()", locator);
  }

  /**
   * Schedule to command to check weather elements is selected or not.
   * @param locator Element to check.
   */
  public async isElementSelected(locator: ElementFinder): Promise<boolean> {
    await TestUtil.elmentToBeClickableWait(locator);
    return await locator.isSelected();
  }
}
