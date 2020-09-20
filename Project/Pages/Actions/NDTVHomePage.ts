import { WeatherPage } from "./NDTVWeatherPage";
import { HomePageLocator } from "../Locators/NDTVHomePageLocator";
import { TestUtil } from "../../Utils/TestUtil";
export class HomePage {
  private _homePageLocator: HomePageLocator = HomePageLocator.getHomePageLocatorInstance();
  private _testUtil: TestUtil = new TestUtil();

  /**
   * Click on Weater Page Link to Navigate on Weather Page
   */
  public async clickOnWeatherLink(): Promise<WeatherPage> {
    await this._testUtil.jsClick(this._homePageLocator.getWeatherLinkLocator());
    return new WeatherPage();
  }
}
