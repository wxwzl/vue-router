const bsStatus = require('../browserstack-send-status')

module.exports = {
  ...bsStatus(),

  '@tags': ['hash'],

  'route-query-hash': function (browser) {
    browser
      .url('http://localhost:8080/route-query-hash/')
      .waitForElementVisible('#app', 1000)
      .assert.count('li a', 3)
      // https://github.com/vuejs/vue-router/issues/2800
      .click('li:nth-child(1) a')
      .assert.urlEquals('http://localhost:8080/route-query-hash/#/?a=1&b=2&a=2')
      .waitForElementPresent('#historyLength', 5000)
      .assert.containsText('#historyLength', 2)
      .click('li:nth-child(2) a')
      .assert.urlEquals('http://localhost:8080/route-query-hash/#/?a=1&b=2')
      .waitForElementPresent('#historyLength', 5000)
      .assert.containsText('#historyLength', 3)
      .click('li:nth-child(3) a')
      .assert.urlEquals('http://localhost:8080/route-query-hash/#/?b=2&a=1')
      .waitForElementPresent('#historyLength', 5000)
      .assert.containsText('#historyLength', 4)
      .end()
  }
}
