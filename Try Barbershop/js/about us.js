// DI NA TO KASAMA SA WEBSITE PERO ANDITO SYA SA LOOB NG FILE

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
