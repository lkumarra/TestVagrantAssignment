import { findBy, How } from "../../Utils/PageFactory";
import { ElementFinder } from "protractor";

export class WeatherPageLocator {
  private static _weatherPageLocator: WeatherPageLocator = new WeatherPageLocator();

  /**
   * Return the Instance of WeatherPage Locator.
   */
  public static getWeatherPageLocatorInstance(): WeatherPageLocator {
    return this._weatherPageLocator;
  }

  @findBy(How.ID, "searchBox")
  private _weatherSearchBox: ElementFinder;

  /**
   * Return the locator of weather search box.
   */
  public getWeatherSearchBoxLocator(): ElementFinder {
    return this._weatherSearchBox;
  }
}
