const {LoginPage} =require('../pageobjects/LoginPage');
const {DocumentPage} =require('../pageobjects/DocumentPage');

class PageObjectManager
{
    
    constructor(page)   { 
        this.page = page;
        this.LoinPage = new LoginPage(this.page);
        this.DocumentPage = new DocumentPage(this.page);
    }

getLoginPage()
{
    return this.LoinPage;   

}
getDocumentPage()
{
    return this.DocumentPage;       
}
}
module.exports = {PageObjectManager};