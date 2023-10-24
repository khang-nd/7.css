// Tabs
function tabHandler(e, tabButtons) {
  e.preventDefault();
  const tabContainer = e.target.parentElement.parentElement;
  const targetId = e.target.getAttribute("aria-controls");
  tabButtons.forEach((_tabButton) =>
    _tabButton.setAttribute("aria-selected", false)
  );
  e.target.setAttribute("aria-selected", true);
  e.target.focus();
  tabContainer
    .querySelectorAll("[role=tabpanel]")
    .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
  tabContainer
    .querySelector(`[role=tabpanel]#${targetId}`)
    .removeAttribute("hidden");
}

// Tabs > Sample Tabs
const tabList = document.querySelector("[aria-label='Sample Tabs']");
const tabButtons = tabList.querySelectorAll("[role=tab]");
tabButtons.forEach((tabButton) =>
  tabButton.addEventListener("mousedown", (evt) => {
    tabHandler(evt, tabButtons)
  }));
tabButtons.forEach((tabButton) =>
  tabButton.addEventListener("focus", (evt) => {
    tabHandler(evt, tabButtons)
  }));

// Tabs > Tabs Template
const templateTabList = document.querySelector("[aria-label='Tabs Template']");
const templateTabButtons = templateTabList.querySelectorAll("[role=tab]");
templateTabButtons.forEach((tabButton) =>
  tabButton.addEventListener("mousedown", (evt) => {
    tabHandler(evt, templateTabButtons)
  }));
templateTabButtons.forEach((tabButton) =>
  tabButton.addEventListener("focus", (evt) => {
    tabHandler(evt, templateTabButtons)
  }));

// Window Body > Window with Tabs
const windowTabList = document.querySelector("[aria-label='Window with Tabs']");
const windowTabButtons = windowTabList.querySelectorAll("[role=tab]");
windowTabButtons.forEach((tabButton) =>
  tabButton.addEventListener("mousedown", (evt) => {
    tabHandler(evt, windowTabButtons)
  }));
windowTabButtons.forEach((tabButton) =>
  tabButton.addEventListener("focus", (evt) => {
    tabHandler(evt, windowTabButtons)
  }));


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
