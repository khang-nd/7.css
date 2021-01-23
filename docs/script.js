// Tabs
const tabButtons = document.querySelectorAll("[role=tab]");
tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", (e) => {
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
      }
      if (e.key === "Backspace") {
        tooltip.setAttribute("hidden", true);
      }
    });
  });
