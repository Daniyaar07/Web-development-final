document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('input[placeholder="Your name"]');
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.querySelector('textarea');
    const topic = document.querySelector('#topic');
    const orderField = document.querySelector('#orderField');
    const orderId = document.querySelector('#orderId');

    topic.addEventListener('change', function() {
    if (topic.value === 'Returns') {
        orderField.style.display = 'block';
        orderId.required = true;
        } 
    else {
        orderField.style.display = 'none';
        orderId.required = false;
        orderId.value = '';
        }
    }); 
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
        orderId.style.borderColor = '';

        const oldErrors = document.querySelectorAll('.error-message');
        for (let error of oldErrors) {
            error.remove();
        }
    }

    form.addEventListener('submit', async function(e) {
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
        if (topic.value === 'Returns' && orderId.value.trim() === '') {
            showError(orderId, 'Order ID is required.');
            isValid = false;
        }
        
        if (isValid) {
            const button = form.querySelector('button[type="submit"]');

            button.innerText = 'Sending...';
            button.disabled = true;

        try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                topic: document.querySelector('#topic').value,
                orderId: document.querySelector('#orderId').value,
                message: messageInput.value
            })
        });

        if (!response.ok) {
            throw new Error('Failed');
        }

        alert('Message sent successfully!');
        form.reset();
        document.querySelector('#orderField').style.display = 'none';
        document.querySelector('#orderId').required = false;

        } catch (error) {
        alert('Failed to send message.');
        }

        button.innerText = 'Send message';
        button.disabled = false;
        }
    });
});
$(document).ready(function() {
    $("#topic").change(function() {
        if ($("#topic").val() === "Returns") {
            $("#orderField").show();
            $("#orderId").prop("required", true);
        } else {
            $("#orderField").hide();
            $("#orderId").prop("required", false);
        }
    });
});