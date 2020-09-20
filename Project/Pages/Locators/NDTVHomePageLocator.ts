import { findBy, How } from "../../Utils/PageFactory";
import { ElementFinder } from "protractor";

export class HomePageLocator {
  private static _homePageLocator: HomePageLocator = new HomePageLocator();

  /**
   * Return the instance of HomePageLocator Page.
   */
  public static getHomePageLocatorInstance(): HomePageLocator {
    return this._homePageLocator;
  }

  @findBy(How.XPATH, "//a[contains(text(),'WEATHER')]")
  private _weatherLink: ElementFinder;

  /**
   * Return the element finder of Weather Link.
   */
  public getWeatherLinkLocator(): ElementFinder {
    return this._weatherLink;
  }
}
