import { test } from '../fixture/fixture';
import { data, userData } from '../test-data/testData';
import { pageTitles } from '../test-data/pageTitles';
import { errorMessages } from '../test-data/errorMessages';

test.describe('Login tests for mageto web site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User should be able to create an account and then log out', async ({
    authorizationPage,
    basePage,
  }) => {
    const email = authorizationPage.setRandomMail(data.fakeEmail, 3);
    await authorizationPage.clickCreateAccountLink();
    await basePage.verifyPageTitleText(pageTitles.createNewCustomer);
    await authorizationPage.fillFirstNameInputField(data.firstName);
    await authorizationPage.fillLastNameInputField(data.lastName);
    await authorizationPage.fillEmailInputField(email);
    await authorizationPage.fillPasswordInputField(data.password);
    await authorizationPage.fillPasswordConfirmInputField(data.password);
    await authorizationPage.clickCreateAccountBtn();
    await authorizationPage.verifyWelcomeUserText(
      data.firstName,
      data.lastName
    );
    await authorizationPage.clickLogOutBtn();
    await basePage.verifyPageTitleText(pageTitles.youAreSignOut);
  });

  test('User should be able to reset password and log in using new one', async ({
    page,
    basePage,
    authorizationPage,
    myAccountPage,
    editAccountInformationPage,
    signInPage,
  }) => {
    await authorizationPage.clickCreateAccountLink();
    await authorizationPage.fillFirstNameInputField(userData.firstName);
    await authorizationPage.fillLastNameInputField(userData.lastName);
    await authorizationPage.fillEmailInputField(userData.email);
    await authorizationPage.fillPasswordInputField(userData.password);
    await authorizationPage.fillPasswordConfirmInputField(userData.password);
    await authorizationPage.clickCreateAccountBtn();
    await basePage.verifyPageTitleText(pageTitles.myAccount);
    await myAccountPage.clickChangePasswordBtn();
    await basePage.verifyPageTitleText(pageTitles.editAccountInformation);
    await editAccountInformationPage.fillCurrentPasswordInputField(
      userData.password
    );
    await editAccountInformationPage.fillNewPasswordInputField(
      userData.newPassword
    );
    await editAccountInformationPage.fillConfirmNewPasswordInputField(
      userData.newPassword
    );
    await editAccountInformationPage.clickSaveBtn();
    // waiting for loading Sign-in page
    await page.waitForSelector(signInPage.signInButton);
    await basePage.verifyPageTitleText(pageTitles.customerLogin);
    await signInPage.fillEmailInputField(userData.email);
    await signInPage.fillPasswordInputField(userData.password);
    await signInPage.clickSignInBtn();
    await basePage.verifyErrorMessageIsDisplayed(
      errorMessages.theAccountSignInWasIncorrect
    );
    await signInPage.fillPasswordInputField(userData.newPassword);
    await signInPage.clickSignInBtn();
    await authorizationPage.verifyWelcomeUserText(
      userData.firstName,
      userData.lastName
    );
  });
});
