//typewritter
const title = document.getElementById("hero-title");

//dark-light theme
const toggleButton = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;


//dark-light toggle
const applyTheme = (theme) => {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    toggleButton.setAttribute("aria-pressed", "true");
    toggleButton.textContent = "Switch to light";
  } else {
    document.body.removeAttribute("data-theme");
    toggleButton.setAttribute("aria-pressed", "false");
    toggleButton.textContent = "Switch to dark";
  }
};

applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

toggleButton.addEventListener("click", () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});


//Typewritter
if (title) {
  const text = title.dataset.text || title.textContent;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    title.textContent = text;
    title.classList.remove("typewriter");
  } else {
    title.textContent = "";
    let index = 0;

    const typeNext = () => {
      title.textContent = text.slice(0, index + 1);
      index += 1;
      if (index < text.length) {
        window.setTimeout(typeNext, 90);
      }
    };

    window.setTimeout(typeNext, 200);
  }
}
