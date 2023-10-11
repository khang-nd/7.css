// Tabs
// Tabs > Sample Tabs
const tabList = document.querySelector("[aria-label='Sample Tabs']");
const tabButtons = tabList.querySelectorAll("[role=tab]");
tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const tabContainer = e.target.parentElement.parentElement;
    const targetId = e.target.getAttribute("aria-controls");
    tabButtons.forEach((_tabButton) =>
      _tabButton.setAttribute("aria-selected", false)
    );
    tabButton.setAttribute("aria-selected", true);
    tabButton.focus();
    tabContainer
      .querySelectorAll("[role=tabpanel]")
      .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
    tabContainer
      .querySelector(`[role=tabpanel]#${targetId}`)
      .removeAttribute("hidden");
  });
});
tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("focus", (e) => {
    e.preventDefault();
    const tabContainer = e.target.parentElement.parentElement;
    const targetId = e.target.getAttribute("aria-controls");
    tabButtons.forEach((_tabButton) =>
      _tabButton.setAttribute("aria-selected", false)
    );
    tabButton.setAttribute("aria-selected", true);
    tabContainer
      .querySelectorAll("[role=tabpanel]")
      .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
    tabContainer
      .querySelector(`[role=tabpanel]#${targetId}`)
      .removeAttribute("hidden");
  });
});

// Tabs > Tabs Template
const tabList_TabsTemp = document.querySelector("[aria-label='Tabs Template']");
const tabButtons_TabsTemp = tabList_TabsTemp.querySelectorAll("[role=tab]");
tabButtons_TabsTemp.forEach((tabButton) => {
  tabButton.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const tabContainer = e.target.parentElement.parentElement;
    const targetId = e.target.getAttribute("aria-controls");
    tabButtons_TabsTemp.forEach((_tabButton) =>
      _tabButton.setAttribute("aria-selected", false)
    );
    tabButton.setAttribute("aria-selected", true);
    tabButton.focus();
    tabContainer
      .querySelectorAll("[role=tabpanel]")
      .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
    tabContainer
      .querySelector(`[role=tabpanel]#${targetId}`)
      .removeAttribute("hidden");
  });
});
tabButtons_TabsTemp.forEach((tabButton) => {
  tabButton.addEventListener("focus", (e) => {
    e.preventDefault();
    const tabContainer = e.target.parentElement.parentElement;
    const targetId = e.target.getAttribute("aria-controls");
    tabButtons_TabsTemp.forEach((_tabButton) =>
      _tabButton.setAttribute("aria-selected", false)
    );
    tabButton.setAttribute("aria-selected", true);
    tabContainer
      .querySelectorAll("[role=tabpanel]")
      .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
    tabContainer
      .querySelector(`[role=tabpanel]#${targetId}`)
      .removeAttribute("hidden");
  });
});

// Window Body > Window with Tabs
const tabList_WinWTabs = document.querySelector("[aria-label='Window with Tabs']");
const tabButtons_WinWTabs = tabList_WinWTabs.querySelectorAll("[role=tab]");
tabButtons_WinWTabs.forEach((tabButton) => {
  tabButton.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const tabContainer = e.target.parentElement.parentElement;
    const targetId = e.target.getAttribute("aria-controls");
    tabButtons_WinWTabs.forEach((_tabButton) =>
      _tabButton.setAttribute("aria-selected", false)
    );
    tabButton.setAttribute("aria-selected", true);
    tabButton.focus();
    tabContainer
      .querySelectorAll("[role=tabpanel]")
      .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
    tabContainer
      .querySelector(`[role=tabpanel]#${targetId}`)
      .removeAttribute("hidden");
  });
});
tabButtons_WinWTabs.forEach((tabButton) => {
  tabButton.addEventListener("focus", (e) => {
    e.preventDefault();
    const tabContainer = e.target.parentElement.parentElement;
    const targetId = e.target.getAttribute("aria-controls");
    tabButtons_WinWTabs.forEach((_tabButton) =>
      _tabButton.setAttribute("aria-selected", false)
    );
    tabButton.setAttribute("aria-selected", true);
    tabContainer
      .querySelectorAll("[role=tabpanel]")
      .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
    tabContainer
      .querySelector(`[role=tabpanel]#${targetId}`)
      .removeAttribute("hidden");
  });
});


// Copy code
document.querySelectorAll(".copy").forEach((button) => {
  button.addEventListener("click", (e) => {
    const exampleElem = e.target.parentElement.parentElement;
    const rawElem = exampleElem.querySelector(".raw");
    navigator.clipboard.writeText(rawElem.innerHTML).then(() => {
      button.textContent = "Copied";
      setTimeout(() => (button.textContent = "Copy Code"), 1000);
    });
  });
});


// Balloon
document
  .querySelectorAll("input[type=text][aria-describedby]")
  .forEach((input) => {
    input.addEventListener("keydown", (e) => {
      const targetId = input.getAttribute("aria-describedby");
      const tooltip = document.querySelector(`[role=tooltip]#${targetId}`);
      if (e.key === "Enter") {
        tooltip.removeAttribute("hidden");
        tooltip.style.top = input.offsetTop + input.offsetHeight + 15 + "px";
        tooltip.style.zIndex = 1;
      }
      if (e.key === "Backspace") {
        tooltip.setAttribute("hidden", true);
      }
    });
  });
