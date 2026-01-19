class BrowserHistory {
  static browser = {};

  constructor(tab) {
    if (!BrowserHistory.browser[tab]) {
      BrowserHistory.browser[tab] = [];
    }
    this.tab = tab;
    this.index = -1;
  }

  visit(page) {
    // Remove forward history if we are not at the end
    const history = BrowserHistory.browser[this.tab];
    history.splice(this.index + 1);

    history.push(page);
    this.index++;
  }

  back(n = 1) {
    this.index = Math.max(0, this.index - n);
    return this.getCurrentPage();
  }

  forward(n = 1) {
    const history = BrowserHistory.browser[this.tab];
    this.index = Math.min(history.length - 1, this.index + n);
    return this.getCurrentPage();
  }

  getCurrentPage() {
    return BrowserHistory.browser[this.tab][this.index] ?? null;
  }
}
const browser = new BrowserHistory("home");
browser.visit("page1");
browser.visit("page2");
console.log(browser.back(1)); // "page1"
console.log(browser.forward(1)); // "page2"
console.log(browser.getCurrentPage()); // "page2"
