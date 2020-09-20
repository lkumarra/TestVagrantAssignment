import { WeatherPageLocator } from "../Locators/NDTVWeatherPageLocator";
import { TestUtil } from "../../Utils/TestUtil";
import { element, by, browser } from "protractor";
export class WeatherPage {
  private _weatherPageLocator: WeatherPageLocator = WeatherPageLocator.getWeatherPageLocatorInstance();
  private _testUtil: TestUtil = new TestUtil();

  /**
   * Return the temprature of the city
   * @param city city to get temp.
   */
  private async getTemprature(city: string): Promise<string> {
    return await this._testUtil.getWebElementText(
      element(
        by.xpath(
          "//div[text()='" +
            city +
            "']//preceding-sibling::div/span[@class='tempRedText']"
        )
      )
    );
  }

  /**
   * Return the weather of city
   * @param city city to get temp.
   */
  public async getWeather(city: string): Promise<string> {
    await this._testUtil.enterTextIntoTextBox(
      this._weatherPageLocator.getWeatherSearchBoxLocator(),
      city
    );
    let isElementSelected: boolean = await this._testUtil.isElementSelected(
      element(by.id(city))
    );
    if (isElementSelected) {
      return await this.getTemprature(city);
    } else {
      await this._testUtil.clickOnElement(element(by.id(city)));
      return await this.getTemprature(city);
    }
  }
}
