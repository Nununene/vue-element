// For authoring Nightwatch tests, see
// http://nightwatchjs.org/api
//
// * Do not call browser.end() after assertion.
//

module.exports = {
  /**
   * Check login function
   */
  'login': function(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'root'
    const password = '123'
    const timeout  = 1000

    browser
      .url(devServer)
      .waitForElementVisible('#login-comp', timeout)
      .setValue('input.username', username)
      .setValue('input.password', password)
      .click('button[type=submit]')
      .waitForElementVisible('#top_menu', timeout)
      .assert.visible('li.logo')
  }
};
