const select = document.getElementById("themeSelect");
const themes = [
    "light",
    "dark",
    "purple-dark"
];

function changeTheme(themeName) {
    if (themes.includes(themeName)) {
        document.getElementById("html").setAttribute("data-theme", themeName);
        select.value = themeName;
        localStorage.setItem("themeChoice", themeName);
    } else {
        // if the name did not match any above, default to light.
        document.getElementById("html").setAttribute("data-theme", "light");
        select.value = "light";
        localStorage.setItem("themeChoice", "light");
    }
}

document.getElementById("themeSelect").addEventListener("change", () => {
    changeTheme(select.value);
});

document.addEventListener("DOMContentLoaded", () => {
    // if there is none saved, it will default to light.
    changeTheme(localStorage.getItem("themeChoice"));
})