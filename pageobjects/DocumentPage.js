class DocumentPage
{
    constructor(page)   {
    this.page = page;
    this.userName = page.locator('#username');
    this.passWord = page.locator("[type='password']");
    this.signIn = page.locator('#signInBtn');

    }
async redMessage()
{
    
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.page.locator('[href*="documents-request"]').click()
  ]);
    this.newPage = newPage; // save it for later use    
    //await this.newPage.waitForLoadState();
    const text=await this.newPage.locator('.red').textContent();
    const userid = text.split('@')[1].split(' ')[0];
    console.log(userid);
    await this.userName.fill(userid);
}
async mainpageLoin(username,password)
{
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.signIn.click();
}

}
module.exports = {DocumentPage};