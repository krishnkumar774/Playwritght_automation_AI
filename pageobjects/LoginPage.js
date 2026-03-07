class LoginPage {

    constructor(page)  
    {this.page = page;
        this.newPage = null // Initialize newPage to null
         this.userName1 = page.locator('#username');
         this.passWord1 = page.locator("[type='password']");
         this.radioButton = page.locator('.radiotextsty');
         this.checkBox = page.locator('#terms');
         this.popup = page.locator('.btn-success');
        this.dropdown = page.locator('select.form-control')
        this.blinklink=page.locator('[href*="documents-request"]')

    }
    async gotoUrl()
    {
       await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }
    
async login(username,password)
{
    await this.userName1.fill(username);
    await this.passWord1.fill(password);
}

}
module.exports = {LoginPage};