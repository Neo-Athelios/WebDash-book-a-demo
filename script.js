
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('demoForm');
            const feedbackDiv = document.getElementById('feedback');
    
            form.addEventListener('submit', async function(event) {
                event.preventDefault(); // Prevent default form submission
                feedbackDiv.style.display = 'none'; // Hide previous feedback
    
                // Front-end validation
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const remarksInput = document.getElementById('remarks');
    
                if (!nameInput.value.trim()) {
                    displayFeedback('Please enter your name.', 'error');
                    return;
                }
    
                if (!emailInput.value.trim()) {
                    displayFeedback('Please enter your email.', 'error');
                    return;
                } else if (!isValidEmail(emailInput.value.trim())) {
                    displayFeedback('Please enter a valid email address.', 'error');
                    return;
                }
    
                if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
                    displayFeedback('Please enter a valid phone number (10 digits).', 'error');
                    return;
                }
    
                // Simulate backend submission with network connectivity
                try {
                    displayFeedback('Submitting your request...', 'success');
                    const response = await fakeApiCall({
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        phone: phoneInput.value.trim(),
                        remarks: remarksInput.value.trim() // Include remarks in the submission
                    });
    
                    if (response.success) {
                        displayFeedback('Your request has been submitted successfully! We will contact you within 3-5 business days.', 'success');
                        form.reset(); // Clear the form
                    } else {
                        displayFeedback('Oops! Something went wrong. Please try again later.', 'error');
                    }
                } catch (error) {
                    displayFeedback('Network error. Please check your connection and try again.', 'error');
                }
            });
    
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
    
            function isValidPhone(phone) {
                const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
                return phoneRegex.test(phone);
            }
    
            function displayFeedback(message, type) {
                feedbackDiv.textContent = message;
                feedbackDiv.className = `feedback-message ${type}-message`;
                feedbackDiv.style.display = 'block';
            }
    
            // Simulated API call function
            async function fakeApiCall(data) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const isSuccess = Math.random() < 0.7; // Simulate success or failure
                        if (isSuccess) {
                            resolve({ success: true });
                        } else {
                            reject(new Error('Simulated API failure'));
                        }
                    }, 1500); // Simulate network latency
                });
            }
        });