export class Utilities {
  /**
   * Compare the temprature received from api and web .
   * @param apiTemp API temp
   * @param webTemp Web Temp
   */
  public async tempComparator(
    apiTemp: string,
    webTemp: string
  ): Promise<boolean> {
    let apiTempInInt: number = parseInt(apiTemp);
    console.log("API temp in kelvin " + apiTempInInt);
    let webTempInInt: number = parseInt(webTemp.split("℃")[0]);
    console.log("Web temp is celcius " + webTempInInt);
    let apiTempCelcius: number = apiTempInInt - 273.15;
    console.log("API temp in celcius is " + apiTempCelcius);
    let tempDifference: number = apiTempCelcius - webTempInInt;
    console.log("Temprature difference is " + tempDifference);
    if (tempDifference <= -2 || tempDifference <= 2) {
      return true;
    } else {
      return false;
    }
  }
}
