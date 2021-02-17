const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function detectColorScheme() {
  var theme = "light"; // default to light
  if (localStorage.getItem("colorscheme")) {
    //local storage is used to override OS theme settings
    theme = localStorage.getItem("colorscheme");
  } else {
    // OS theme setting detected as dark
    theme = darkModeMediaQuery.matches ? "dark" : "light";
  }
  return theme;
}

function setColorScheme(theme) {
  const body = document.body;
  // remove the old color scheme
  inverse = theme === "dark" ? "light" : "dark";
  body.classList.remove("colorscheme-" + inverse);
  // set new color scheme
  body.classList.add("colorscheme-" + theme);
  localStorage.setItem("colorscheme", theme);
}

function initColorScheme() {
  const body = document.body;
  if(body.classList.contains("colorscheme-auto")) {
    let theme = detectColorScheme();
    // remove the tage auto
    body.classList.remove("colorscheme-auto");
    // update the theme
    setColorScheme(theme);
    // change the color scheme when OS color theme changes
    darkModeMediaQuery.addEventListener((event) => {
      setColorScheme(event.matches ? "dark" : "light");
    });
  }
}

initColorScheme();

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
  setTheme(body.classList.contains("colorscheme-dark") ? "light" : "dark");
});
