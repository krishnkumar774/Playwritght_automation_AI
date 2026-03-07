class LoginPage {

    constructor(page)  
    {this.page = page;
        this.newPage = null // Initialize newPage to null
         this.userName = page.locator('#username');
         this.passWord = page.locator("[type='password']");
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
    await this.userName.fill(username);
    await this.passWord.fill(password);
}

async childWindowBlinkTest()
{
    
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.page.locator('[href*="documents-request"]').click()
  ]);
    this.newPage = newPage; // save it for later use
    //await this.newPage.waitForLoadState();
    const text=await this.newPage.locator('.red').textContent();
    const userid = text.split('@')[0].split(' ')[1];
    console.log(userid);
}
}
module.exports = {LoginPage};