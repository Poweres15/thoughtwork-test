export default class MarsAirObject {
  marsAirLogo = "//a[text()=' MarsAir']";
  contentBox = "#content";
  departLabel = '//label[@for="departing"]';
  welcomeToMarsairHeader = '//*[text()="Welcome to MarsAir!"]';
  returnLabel = '//label[@for="returning"]';
  promotionCodeLabel = '//label[@for="promotional_code"]';
  searchButton = '//input[@value="Search"]';
  departSelectBox = "#departing";
  returnSelectBox = "#returning";
  promitionCodeInput = "#promotional_code";
  promotionCodeMessage = '//*[@class="promo_code"]';
  searchResultHeader = '//*[text()="Search Results"]';
  welcomeToMarsai = '//*[text()="Search Results"]';
  depatureOptionByMonth(mothName) {
    return ` //*[@name="departing"]//*[text()="${mothName}"]`;
  }
  returnOptionByMonth(mothName) {
    return ` //*[@name="returning"]//*[text()="${mothName}"]`;
  }
  resultMessage(resultMessage) {
    return ` //p[text()="${resultMessage}"]`;
  }
}
