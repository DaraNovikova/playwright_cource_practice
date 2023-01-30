import { test as baseTest } from '@playwright/test';
import AuthorizationPage from '../pages/authorization.page';
import MainPage from '../pages/main.page';
import ProductPage from '../pages/product.page';
import CartPage from '../pages/cart.page';
import SalePage from '../pages/sale.page';
import ProductTeesPage from '../pages/tees.page';
import FormPage from '../pages/form.page';
import BasePage from '../pages/basePage.page';
import MyAccountPage from '../pages/myAccount.page';
import EditAccountInformationPage from '../pages/editAccountInformation.page';
import SignInPage from '../pages/signIn.page';
import AdvancedSearchPage from '../pages/advancedSearch.page';
import MyWishListPage from '../pages/myWishList.page';

type pages = {
  authorizationPage: AuthorizationPage;
  mainPage: MainPage;
  productPage: ProductPage;
  cartPage: CartPage;
  salePage: SalePage;
  productTeesPage: ProductTeesPage;
  formPage: FormPage;
  basePage: BasePage;
  myAccountPage: MyAccountPage;
  editAccountInformationPage: EditAccountInformationPage;
  signInPage: SignInPage;
  advancedSearchPage: AdvancedSearchPage;
  myWishListPage: MyWishListPage;
};

const testPages = baseTest.extend<pages>({
  authorizationPage: async ({ page }, use) => {
    await use(new AuthorizationPage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  salePage: async ({ page }, use) => {
    await use(new SalePage(page));
  },

  productTeesPage: async ({ page }, use) => {
    await use(new ProductTeesPage(page));
  },

  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  editAccountInformationPage: async ({ page }, use) => {
    await use(new EditAccountInformationPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  advancedSearchPage: async ({ page }, use) => {
    await use(new AdvancedSearchPage(page));
  },

  myWishListPage: async ({ page }, use) => {
    await use(new MyWishListPage(page));
  },
});

export const test = testPages;
export const expect = testPages.expect;
