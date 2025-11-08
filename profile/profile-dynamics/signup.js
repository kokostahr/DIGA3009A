document.addEventListener("DOMContentLoaded", () => {
    //doing the form validation first
    const signupForm = document.getElementById("signupForm");
    //creating message
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "ERROR! Password must be longer than 8 characters.";
    errorMsg.classList.add("error-message");
    errorMsg.style.display = "none";
    signupForm.appendChild(errorMsg);


    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        //password matching!
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirmPassword").value;

        if (password.length < 8 || password !== confirm) {
            errorMsg.style.display = "block";
            gsap.fromTo(errorMsg, { y: 50, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            });
            return;
        }
        // simulating successful account creation, because idk how to store this sensitive data yet. 
        window.location.href = "login-details.html";
    });

    //then sliding into the gsapo

    //slide in
    gsap.from(".signup-section", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".signup-info", {
        scrollTrigger: {
            trigger: ".signup-info",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    //animated button glow
    const signupBtn = document.querySelector(".signup-btn");
    if (signupBtn) {
        signupBtn.addEventListener("mouseenter", () => {
            gsap.to(signupBtn, {
                boxShadow: "0 0 10px var(--soft-blue)",
                duration: 0.3
            });
        });
        signupBtn.addEventListener("mouseleave", () => {
            gsap.to(signupBtn, {
                boxShadow: "none",
                duration: 0.3
            });
        });
    }

    const checkboxes = document.querySelectorAll("input[type='radio']");
    checkboxes.forEach(box => {
        box.addEventListener("click", () => {
            gsap.fromTo(box, { scale: 1 }, {
                scale: 1.2,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
            });
        });
    });





});
