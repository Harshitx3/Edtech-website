// Course Enrollment JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    const paymentMethod = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('cardDetails');
    const upiDetails = document.getElementById('upiDetails');

    if(paymentMethod) {
        paymentMethod.addEventListener('change', function() {
            const method = this.value;
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'none';
            
            if (method === 'credit_card' || method === 'debit_card') {
                cardDetails.style.display = 'block';
            } else if (method === 'upi') {
                upiDetails.style.display = 'block';
            }
        });
    }

    if(enrollmentForm) {
        enrollmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;

            try {
                const formData = collectFormData();
                
                const response = await fetch('/api/enroll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    window.location.href = `/html/thank-you.html?enrollmentId=${result.enrollmentId}&courseTitle=${formData.courseInfo.courseTitle}&amount=${formData.paymentInfo.amount}`;
                } else {
                    throw new Error(result.message || 'Enrollment failed');
                }
            } catch (error) {
                console.error('Enrollment error:', error);
                alert('Enrollment failed. Please try again. Error: ' + error.message);
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    function validateForm() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const paymentMethodVal = document.getElementById('paymentMethod').value;

        if (!firstName || !lastName || !email || !phone || !paymentMethodVal) {
            alert('Please fill in all required fields.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit Indian phone number.');
            return false;
        }

        if (paymentMethodVal === 'credit_card' || paymentMethodVal === 'debit_card') {
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expiryDate = document.getElementById('expiryDate').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (!cardNumber || !expiryDate || !cvv) {
                alert('Please fill in all card details.');
                return false;
            }

            if (cardNumber.length < 13 || cardNumber.length > 19 || !/^\d+$/.test(cardNumber.replace(/\s/g, ''))) {
                alert('Please enter a valid card number.');
                return false;
            }

            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryRegex.test(expiryDate)) {
                alert('Please enter a valid expiry date (MM/YY).');
                return false;
            }

            if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
                alert('Please enter a valid CVV.');
                return false;
            }
        } else if (paymentMethodVal === 'upi') {
            const upiId = document.getElementById('upiId').value.trim();
            
            if (!upiId) {
                alert('Please enter your UPI ID.');
                return false;
            }

            const upiRegex = /^[\w.-]+@[\w.-]+$/;
            if (!upiRegex.test(upiId)) {
                alert('Please enter a valid UPI ID (e.g., name@upi).');
                return false;
            }
        }

        return true;
    }

    function collectFormData() {
        const formData = {
            studentInfo: {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim()
            },
            courseInfo: {
                courseId: 'full-stack-web-development-masterclass',
                courseTitle: 'Full-Stack Web Development Masterclass',
                price: 4999,
                currency: 'INR'
            },
            paymentInfo: {
                method: document.getElementById('paymentMethod').value,
                amount: 4999,
                currency: 'INR'
            },
            enrollmentDate: new Date().toISOString()
        };

        if (formData.paymentInfo.method === 'credit_card' || formData.paymentInfo.method === 'debit_card') {
            formData.paymentInfo.cardLast4 = document.getElementById('cardNumber').value.slice(-4);
            formData.paymentInfo.expiryDate = document.getElementById('expiryDate').value;
        } else if (formData.paymentInfo.method === 'upi') {
            formData.paymentInfo.upiId = document.getElementById('upiId').value.trim();
        }

        return formData;
    }
});