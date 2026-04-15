class LocatorsPracticePage {

    constructor(page) {
        this.page = page;
        // Username and password input fields
        this.usernameField = page.locator('input[placeholder="Username"]');
        this.passwordField = page.locator('input[placeholder="Password"]');
        this.usernameFieldAlt = page.locator('input[type="text"]:first-of-type');
        this.passwordFieldAlt = page.locator('input[type="password"]');
        
        // Checkboxes
        this.rememberMeCheckbox = page.locator('input[type="checkbox"]').nth(0);
        this.termsCheckbox = page.locator('input[type="checkbox"]').nth(1);
        
        // Sign In button
        this.signInButton = page.locator('button:has-text("SIGN IN")');
        this.signInButtonAlt = page.locator('button').filter({ hasText: /SIGN IN|Sign In/i });
        
        // Error message
        this.errorMessage = page.locator('text=* Incorrect username or password');
    }

    /**
     * Navigate to the locators practice URL
     */
    async navigateToPage() {
        await this.page.goto('https://rahulshettyacademy.com/locatorspractice/', { waitUntil: 'domcontentloaded' });
    }

    /**
     * Fill username field
     */
    async fillUsername(username) {
        let field = this.usernameField;
        if (!await field.isVisible().catch(() => false)) {
            field = this.usernameFieldAlt;
        }
        await field.fill(username);
    }

    /**
     * Fill password field
     */
    async fillPassword(password) {
        let field = this.passwordField;
        if (!await field.isVisible().catch(() => false)) {
            field = this.passwordFieldAlt;
        }
        await field.fill(password);
    }

    /**
     * Check the "Remember my username" checkbox
     */
    async checkRememberMeCheckbox() {
        await this.rememberMeCheckbox.check();
        return await this.rememberMeCheckbox.isChecked();
    }

    /**
     * Check the "I agree to the terms and privacy policy" checkbox
     */
    async checkTermsCheckbox() {
        await this.termsCheckbox.check();
        return await this.termsCheckbox.isChecked();
    }

    /**
     * Click the Sign In button
     */
    async clickSignInButton() {
        let button = this.signInButton;
        if (!await button.isVisible().catch(() => false)) {
            button = this.signInButtonAlt;
        }
        await button.click();
    }

    /**
     * Wait for response after clicking sign in
     */
    async waitForResponse() {
        await this.page.waitForTimeout(1000);
    }

    /**
     * Verify if error message is visible
     */
    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible().catch(() => false);
    }

    /**
     * Get error message text
     */
    async getErrorMessageText() {
        return await this.errorMessage.textContent();
    }

    /**
     * Check if error exists in page HTML
     */
    async isErrorInPageHTML() {
        const pageHTML = await this.page.content();
        return pageHTML.includes('Incorrect username or password') || pageHTML.includes('Error');
    }

    /**
     * Perform complete login attempt with error checking
     */
    async attemptLoginWithErrorCheck(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        
        const rememberMeChecked = await this.checkRememberMeCheckbox();
        const termsChecked = await this.checkTermsCheckbox();
        
        await this.clickSignInButton();
        await this.waitForResponse();
        
        const errorVisible = await this.isErrorMessageVisible();
        let errorText = null;
        
        if (errorVisible) {
            errorText = await this.getErrorMessageText();
            return {
                success: true,
                errorVisible: true,
                errorText: errorText,
                rememberMeChecked,
                termsChecked
            };
        } else {
            const errorInHTML = await this.isErrorInPageHTML();
            return {
                success: errorInHTML,
                errorVisible: false,
                errorText: null,
                rememberMeChecked,
                termsChecked,
                errorInHTML
            };
        }
    }
}

module.exports = { LocatorsPracticePage };
