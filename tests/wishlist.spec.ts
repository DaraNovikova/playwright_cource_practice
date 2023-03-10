import { test } from '../fixture/fixture';
import { userData } from '../test-data/testData';
import { pageTitles } from '../test-data/pageTitles';
import { colors, numberSizes } from '../test-data/productDetails';

test.describe('Wishlist tests for mageto web site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User should be able to add product from wishlist to cart', async ({
    page,
    basePage,
    productPage,
    authorizationPage,
    myWishListPage,
    cartPage,
  }) => {
    await authorizationPage.clickCreateAccountLink();
    await authorizationPage.fillFirstNameInputField(userData.firstName);
    await authorizationPage.fillLastNameInputField(userData.lastName);
    await authorizationPage.fillEmailInputField(userData.userEmail);
    await authorizationPage.fillPasswordInputField(userData.password);
    await authorizationPage.fillPasswordConfirmInputField(userData.password);
    await authorizationPage.clickCreateAccountBtn();
    await page.goto('/promotions/pants-all.html');
    await basePage.clickFirstProductItem();
    const productData = await productPage.getProductInformation();
    await page.reload();
    await productPage.clickAddToWishListBtn();
    await basePage.verifyPageTitleText(pageTitles.myWishList);
    await myWishListPage.verifyProductIsVisible(productData.productName!);
    await myWishListPage.addToCartProduct(productData.productName!);
    await productPage.verifyProductName(productData.productName!);
    await productPage.verifyProductPrice(productData.productPrice!);
    await productPage.verifyProductImages(productData.productImg);
    await productPage.selectProductItemColor(colors.blue);
    await productPage.selectProductItemSize(numberSizes.twentyEightSize);
    await productPage.clickAddToCartBtn();
    await page.waitForSelector(cartPage.cartCountLocator);
    await myWishListPage.verifyNoItemsMessageIsVisible();
    await cartPage.openCartPage();
    await cartPage.verifyProductItemSizeColor([
      numberSizes.twentyEightSize,
      colors.blue,
    ]);
  });
});
