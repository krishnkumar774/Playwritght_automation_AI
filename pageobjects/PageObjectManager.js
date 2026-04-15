const {LoginPage} =require('../pageobjects/LoginPage');
const {DocumentPage} =require('../pageobjects/DocumentPage');
const {LocatorsPracticePage} =require('../pageobjects/LocatorsPracticePage');

class PageObjectManager
{
    
    constructor(page)   { 
        this.page = page;
        this.LoinPage = new LoginPage(this.page);
        this.DocumentPage = new DocumentPage(this.page);
        this.LocatorsPracticePage = new LocatorsPracticePage(this.page);
    }

getLoginPage()
{
    return this.LoinPage;   

}
getDocumentPage()
{
    return this.DocumentPage;       
}

getLocatorsPracticePage()
{
    return this.LocatorsPracticePage;
}
}
module.exports = {PageObjectManager};