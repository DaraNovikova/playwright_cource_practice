import { test } from '../fixture/fixture';
import { data } from '../test-data/testData';
import { pageTitles } from '../test-data/pageTitles';
import { errorMessages } from '../test-data/errorMessages';
import { colors, numberSizes, letterSizes, productItems } from '../test-data/productDetails';
import { sortValues, sortingDirections } from '../test-data/sortValues';

test.describe('Products tests for mageto web site', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User should see banners & content on the main page', async ({ page, mainPage }) => {
    await page.waitForLoadState('domcontentloaded');
    await mainPage.verifyBannersAreVisible();
    await mainPage.verifyLogoIsVisible();
  });

  test('User should be able to add product to the cart with right size and color', async ({ page, productPage, cartPage }) => {
      const productDetails: string[] = [numberSizes.twentyEightSize, colors.red];
      await page.goto('/promotions/pants-all.html');
      await productPage.selectProductItem(productItems.emmaLeggins);
      await productPage.verifyMoreInformationVisible();
      await productPage.verifyReviewsVisible();
      await productPage.selectProductItemColor(colors.red);
      await productPage.selectProductItemSize(numberSizes.twentyEightSize);
      await productPage.clickAddToCartBtn();
      await page.waitForSelector(productPage.addedProductToCartAlert);
      await cartPage.openCartPage();
      await cartPage.verifyProductItemSizeColor(productDetails);
  });

  test('User should be able to see tees products image, price, reviews and "Add To Cart" button appears on mouse over', async ({ page, salePage, productTeesPage }) => {
    await page.goto('/sale.html');
    await salePage.clickSidebarTeesBtn();
    await productTeesPage.verifyTeesDetailsOnMouseOverAreVisible();
  });

  test('User should not be able to submit a form with non-existing order id and the rest valid data', async ({ page, formPage, authorizationPage, basePage }) => {
    await page.goto('/sales/guest/form/');
    await formPage.fillOrderIdField(authorizationPage.setRandomNumber(9));
    await formPage.fillBillingLastNameField(data.lastName);
    await formPage.selectOptionInFindOrderByField('email');
    await formPage.fillEmailField(data.email);
    await formPage.clickContinueBtn();
    await basePage.verifyErrorMessageIsDisplayed(errorMessages.youEnteredIncorrectData);
    await formPage.fillOrderIdField(data.orderId);
    await formPage.fillBillingLastNameField(data.lastName);
    await formPage.selectOptionInFindOrderByField('email');
    await formPage.fillEmailField(data.email);
    await formPage.clickContinueBtn();
    await page.waitForLoadState();
    await basePage.verifyPageTitleText(pageTitles.orderNumberTitle(data.orderId));
  });

  test('User should be able to add most expensive searched item to the cart', async ({ page, basePage, productPage, cartPage }) => {
    await page.goto('/collections/eco-friendly.html');
    await basePage.searchForText(productItems.searchItems);
    await basePage.verifySearchResultsForLabel(productItems.searchItems);
    await basePage.sortByValue(sortValues.price);
    await basePage.setSortingDirection(sortingDirections.ascending);
    await basePage.clickFirstProductItem();
    await productPage.selectProductItemColor(colors.green);
    await productPage.selectProductItemSize(letterSizes.Lsize);
    await productPage.clickAddToCartBtn();
    await page.waitForSelector(productPage.addedProductToCartAlert);
    await cartPage.openCartPage();
    await cartPage.verifyProductItemSizeColor([letterSizes.Lsize, colors.green]);
  });

  test('User should be able to sort items by product name and price in descending and ascending directions', async ({ page, basePage }) => {
    await page.goto('/gear/bags.html');
    await basePage.sortByValue(sortValues.price);
    await basePage.setSortingDirection(sortingDirections.descending);
    await basePage.verifyProductsAreSortedByPriceAscending();
    await basePage.setSortingDirection(sortingDirections.ascending);
    await basePage.verifyProductsAreSortedByPriceAscending(false);
    await basePage.setProductLimiter(sortValues.limiter);
    await basePage.sortByValue(sortValues.productName);
    await basePage.verifyProductsAreSortedByProductNameAscending(false);
    await basePage.setSortingDirection(sortingDirections.descending);
    await basePage.verifyProductsAreSortedByProductNameAscending();
  });

  test('User should not be able to search items after entering invalid data', async ({ page, basePage, advancedSearchPage }) => {
    await page.goto('/catalogsearch/advanced/');
    await advancedSearchPage.fillProductNameInputField(colors.red);
    await advancedSearchPage.fillSkuInputField(letterSizes.Lsize);
    await advancedSearchPage.fillDescriptionInputField(numberSizes.twentyEightSize);
    await advancedSearchPage.fillPriceFromInputField("0");
    await advancedSearchPage.fillPriceToInputField("1000");
    await advancedSearchPage.clickSearchBtn();
    await basePage.verifyPageTitleText(pageTitles.catalogAdvancedSearch);
    await basePage.verifyErrorMessageIsDisplayed(errorMessages.weCantFindItemsMatchingTheseSearchCriteria);
  });
});
