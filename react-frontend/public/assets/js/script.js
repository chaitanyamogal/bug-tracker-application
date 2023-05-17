document.getElementById("menu-toggle").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("wrapper").classList.toggle("toggled");
});

document.getElementById("menu-toggle-2").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("wrapper").classList.toggle("toggled-2");
  document.querySelector("#menu ul").style.display = "none";
});

function initMenu() {
  var menuElements = document.querySelectorAll("#menu ul");
  for (var i = 0; i < menuElements.length; i++) {
    menuElements[i].style.display = "none";
    if (menuElements[i].querySelector(".current")) {
      menuElements[i].parentNode.style.display = "block";
    }
  }

  var menuLinks = document.querySelectorAll("#menu li a");
  for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", function () {
      var checkElement = this.nextElementSibling;
      if (
        checkElement &&
        checkElement.tagName === "UL" &&
        window.getComputedStyle(checkElement).display === "block"
      ) {
        return false;
      }
      if (
        checkElement &&
        checkElement.tagName === "UL" &&
        window.getComputedStyle(checkElement).display !== "block"
      ) {
        var visibleMenus = document.querySelectorAll("#menu ul:visible");
        for (var j = 0; j < visibleMenus.length; j++) {
          visibleMenus[j].style.display = "none";
        }
        checkElement.style.display = "block";
        return false;
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initMenu();
});
