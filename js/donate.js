document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var amount = document.getElementById('amount').value;
    
    var message = document.getElementById('message');
    message.style.display = 'block';
    message.innerHTML = `Thank you, ${name}! Your donation of $${amount} has been received. A confirmation email will be sent to ${email}.`;
    
    this.reset();
});

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