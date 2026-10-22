


// const menuToggle = document.getElementById("menuToggle");
// const navLinks = document.querySelector(".nav-links");

// if (menuToggle && navLinks) {
//     menuToggle.addEventListener("click", function () {
//         const isOpen = navLinks.classList.toggle("open");

//         menuToggle.setAttribute("aria-expanded", isOpen);
//         menuToggle.setAttribute(
//             "aria-label",
//             isOpen ? "Close navigation menu" : "Open navigation menu"
//         );

//         menuToggle.textContent = isOpen ? "✕" : "☰";
//     });

//     navLinks.querySelectorAll("a").forEach(function (link) {
//         link.addEventListener("click", function () {
//             navLinks.classList.remove("open");
//             menuToggle.setAttribute("aria-expanded", "false");
//             menuToggle.setAttribute("aria-label", "Open navigation menu");
//             menuToggle.textContent = "☰";
//         });
//     });
// }





// const menuToggle = document.getElementById("menuToggle");
// const navLinks = document.querySelector(".nav-links");

// menuToggle.addEventListener("click", () => {
//     navLinks.classList.toggle("active");

//     const isOpen = navLinks.classList.contains("active");

//     menuToggle.setAttribute("aria-expanded", isOpen);
//     menuToggle.setAttribute(
//         "aria-label",
//         isOpen ? "Close navigation menu" : "Open navigation menu"
//     );

//     menuToggle.textContent = isOpen ? "✕" : "☰";
// });

// // Close the menu after clicking a link
// navLinks.querySelectorAll("a").forEach(link => {
//     link.addEventListener("click", () => {
//         navLinks.classList.remove("active");
//         menuToggle.setAttribute("aria-expanded", "false");
//         menuToggle.setAttribute("aria-label", "Open navigation menu");
//         menuToggle.textContent = "☰";
//     });
// });

   



const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a link is clicked
const links = navLinks.querySelectorAll("a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});
