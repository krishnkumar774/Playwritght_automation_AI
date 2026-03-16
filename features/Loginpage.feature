Feature: Loginpage validation

  Scenario: Login in the page by sececting the dropdown and radio button
    Given on the login page  entered the "Krishn" and "Kumar"
    When  enter username and password and click on login button
    Then verify the title og the page  and dropdown and radio button and checkbox should be selected and click on submit button