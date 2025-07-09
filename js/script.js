console.log("Script is running");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM is loaded");
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('#nav');

    console.log("Hamburger:", hamburger);
    console.log("Nav:", nav);

    hamburger.addEventListener('click', function() {
        console.log("Hamburger clicked");
        nav.classList.toggle('active');
        console.log("Nav classes:", nav.classList);
    });
});
