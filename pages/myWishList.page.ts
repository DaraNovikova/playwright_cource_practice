import { Page, expect } from "@playwright/test";

export default class MyWishListPage {

    constructor(public page: Page) {}

    addToCartBtn: string = "[data-role='tocart']";
    noItemsMessage: string = "#wishlist-view-form div.message";

    wishListProductsLocator(productName: string): string {
        return `//form//*[@class='product-item' and contains(., '${productName}')]`;
    }

    async verifyProductIsVisible(productName: string, isVisible: boolean = true) {
        await expect(this.page.locator(this.wishListProductsLocator(productName))).toBeVisible({visible: isVisible});
    }

    async addToCartProduct(productName: string) {
        await this.page.locator(this.wishListProductsLocator(productName)).hover();
        await this.page.click(this.addToCartBtn);
        await this.page.waitForLoadState();
    }

    async verifyNoItemsMessageIsVisible(isVisible: boolean = true) {
        await expect(this.page.locator(this.noItemsMessage)).toBeVisible({visible: isVisible});
    }
}
