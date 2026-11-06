document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('input[placeholder="Your name"]');
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.querySelector('textarea');

    function showError(input, message) {
        input.style.borderColor = 'red';
        
        const errorText = document.createElement('small');
        errorText.className = 'error-message text-danger d-block mt-1';
        errorText.innerText = message;
        
        input.parentNode.appendChild(errorText);
    }

    function clearErrors() {
        nameInput.style.borderColor = '';
        emailInput.style.borderColor = '';
        messageInput.style.borderColor = '';

        const oldErrors = document.querySelectorAll('.error-message');
        for (let error of oldErrors) {
            error.remove();
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        let isValid = true;

        if (nameInput.value.trim().length <= 2) {
            showError(nameInput, 'Name must be more than 2 characters long.');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters long.');
            isValid = false;
        }

        if (isValid) {
            const successDiv = document.createElement('div');
            successDiv.className = 'alert alert-success mt-3';
            successDiv.innerText = 'Success! Your message has been sent.';
            
            form.appendChild(successDiv);
            form.reset();
            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }
    });
});