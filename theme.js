const select = document.getElementById("themeSelect");

function changeTheme(themeName) {
   switch (themeName) {
    case "light":
         document.getElementById("html").setAttribute("data-theme", themeName);
         select.value = themeName;
         localStorage.setItem("themeChoice", themeName);
        break;
    
    case "dark":
         document.getElementById("html").setAttribute("data-theme", themeName);
         select.value = themeName;
         localStorage.setItem("themeChoice", themeName);
        break;
    default:
        // if the name did not match any above, default to light.
        document.getElementById("html").setAttribute("data-theme", "light");
        select.value = "light";
        localStorage.setItem("themeChoice", "light");
        break;
   } 
}

document.getElementById("themeSelect").addEventListener("change", () => {
    changeTheme(select.value);
});

document.addEventListener("DOMContentLoaded", () => {
    // if there is none saved, it will default to light.
    changeTheme(localStorage.getItem("themeChoice"));
})