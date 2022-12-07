export default class Tabs {
  constructor(tabsHeader = null, tabs = null, tabsContent = null, activeClass = "", defaultTab = 0) {
    this.tabsHeader = document.querySelector(tabsHeader);
    this.tabs = document.querySelectorAll(tabs);
    this.tabsContent = document.querySelectorAll(tabsContent);
    this.activeClass = activeClass;
    this.defaultTab = defaultTab;
  }

  hideContent() {
    this.tabsContent.forEach((item) => {
      item.style.display = "none";
    });
    this.tabs.forEach((item) => {
      item.classList.remove(this.activeClass);
    });
  }

  showContent(n) {
   try {
    this.tabsContent[n].style.display = "block";
    this.tabs[n].classList.add(this.activeClass);
   } catch {}
  }

  addListener() {
    try {
    this.tabsHeader.addEventListener("click", (e) => {
      this.tabs.forEach((item, i) => {
        if (e.target == item || e.target == item.children[0]) {
          this.hideContent();
          this.showContent(i);
        }
      });

    });
  } catch {}
  }

  init() {
    this.addListener();
    this.hideContent();
    this.showContent(this.defaultTab);
  }
}
