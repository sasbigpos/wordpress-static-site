document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded successfully.");

    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!form) {
        console.log("Form NOT found. Check the ID 'contactForm'.");
        return;
    }
    console.log("Form found.");

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log("Form submitted, default prevented.");

        // Collect data using the 'name' attributes from the HTML
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log("Form data collected:", data);

        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.message) {
            formStatus.textContent = "Please fill in all required fields.";
            formStatus.style.color = "red";
            return;
        }

        // Disable button to prevent duplicate submissions
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formStatus.textContent = "";

        try {
            console.log("Sending data to Make webhook...");
            const response = await fetch('https://hook.eu1.make.com/dj8lzhyrrxupwprrdlhj60d749lu5jgm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    subject: data.subject,
                    message: data.message,
                    source: "Web Form"   // Default source set here
                })
            });

            console.log("Response received:", response);

            if (response.ok) {
                formStatus.textContent = "Thank you! Your message has been sent.";
                formStatus.style.color = "green";
                form.reset();
            } else {
                formStatus.textContent = "Something went wrong. Please try again.";
                formStatus.style.color = "red";
            }
        } catch (error) {
            console.error("Fetch error:", error);
            formStatus.textContent = "Connection error. Please check your internet and try again.";
            formStatus.style.color = "red";
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
