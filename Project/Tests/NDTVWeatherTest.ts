import { BasePage } from '../Pages/BasePage/BasePage';
import { CONSTDATA, weatherPageData } from '../Data/NDTVData';
import { WeatherPage } from '../Pages/Actions/NDTVWeatherPage';
import { HomePage } from '../Pages/Actions/NDTVHomePage';
import { WeatherApi } from '../API/WeatherApi';
import { Utilities } from '../Utils/Utilities';

let weatherApi:WeatherApi = new WeatherApi();
let homePage:HomePage = new HomePage();
let utilities:Utilities = new Utilities();
let weatherPage:WeatherPage;
describe("Temprature Verfication Using web and api", () => {
    beforeAll(async () => {
        await BasePage.initialization(CONSTDATA.URL);
        weatherPage = await homePage.clickOnWeatherLink();
    });
  
    it('Verify the temprature using api and web', async function () {
        expect(await utilities.tempComparator(await weatherApi.getWeatherUsingApi(weatherPageData.city), await weatherPage.getWeather(weatherPageData.city))).toBe(true, "Temprature Diffrence in API and Web is more than 2 Degree Celcius")
    });
  });