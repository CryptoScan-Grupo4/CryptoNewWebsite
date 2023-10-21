  function openSideMenu() {
    let menu = document.getElementById("headerLinksContainer")
    console.log(menu.classList.value)
    if (menu.classList.value == "menuActived") {
      menu.classList.remove("menuActived")
      menu.classList.add("menuDisabled")
    } else {
      menu.classList.remove("menuDisabled")
      menu.classList.add("menuActived")
    }
  }
