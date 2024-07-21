document.addEventListener("DOMContentLoaded", function() {
    const titles = document.querySelectorAll(".sidebar ul li span");

    titles.forEach(title => {
        title.addEventListener("click", function() {
            const subMenu = this.nextElementSibling;
            if (subMenu.style.display === "block") {
                subMenu.style.display = "none";
            } else {
                subMenu.style.display = "block";
            }
        });
    });

    const subMenuItems = document.querySelectorAll(".sub-menu li");

    subMenuItems.forEach(item => {
        item.addEventListener("click", function() {
            const content = document.querySelector(".content");
            content.innerHTML = `<h2>${this.innerText}</h2><p>Información detallada sobre ${this.innerText}.</p>`;
        });
    });
});
