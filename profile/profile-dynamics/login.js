document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    //animating the login sectiooon & welcomes
    gsap.from(".login-section", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".news-feed", {
        scrollTrigger: {
            trigger: ".news-feed",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });

    //input form fields follw
    gsap.from("#loginForm label, #loginForm input, .forgot-password, .login-btn", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.3
    });

    //exyras
    const loginBtn = document.querySelector(".login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("mouseenter", () => {
            gsap.to(loginBtn, {
                boxShadow: "0 0 10px rgba(92, 163, 255, 0.6)",
                duration: 0.3
            });
        });

        loginBtn.addEventListener("mouseleave", () => {
            gsap.to(loginBtn, {
                boxShadow: "none",
                duration: 0.3
            });
        });
    }


    gsap.from(".forgot-password", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6
    });



    //need some fake users because idk how to do back-end logic stuff
    const fakeUsers = [
        {
            username: "crewqueen",
            email: "crewqueen@cabinclue.com",
            password: "hydration123",
            fullName: "Lindwe Mashile",
            crewType: "aspiring",
            crewSince: "2025",
            bio: "Dreaming of sky routes and layover snacks. Hydration is my superpower. Caleb is my soulmate",
            profileImg: "images/Lindiwe-Profile.png",
            savedTips: [
                { title: "Hydration Hack", date: "1 Jan 2025", rank: "1st" },
                { title: "Jet Lag Stretch", date: "3 Feb 2025", rank: "2nd" }
            ],
            savedNotes: [
                "Pack electrolytes",
                "Sleep mask = survival",
                "Always check gate changes"
            ],
            lastSubmitted: [
                "7th Question", "3rd Tip", "2nd Tip"
            ],
            savedCities: [
                "Weather in Dubai", "Hotspots in Doha", "New York Safety Tips"
            ]
        },

        {
            username: "layoverlegend",
            email: "legend@cabinclue.com",
            password: "snackattack",
            fullName: "Markus van Dyk",
            crewType: "crew",
            crewSince: "2012",
            bio: "Crew since 2012. Stop asking me ridiculous questions please. NO I will NOT marry you.",
            profileImg: "images/Markus-Profile.png",
            savedTips: [
                { title: "Snack Stash", date: "5 Mar 2025", rank: "1st" },
                { title: "Layover Zen", date: "10 Apr 2025", rank: "3rd" }
            ],
            savedNotes: [
                "Always carry protein bars",
                "Noise-cancelling headphones",
                "Check crew rest rules"
            ],
            lastSubmitted: [
                "5th Tip", "2nd Question"
            ],
            savedCities: [
                "Weather in Cape Town", "Hotspots in Singapore"
            ]
        }

    ];

    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    //validation for el fake personas
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent page reload

        const enteredUsername = usernameInput.value.trim();
        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value;

        const matchedUser = fakeUsers.find(user =>
            user.username === enteredUsername &&
            user.email === enteredEmail &&
            user.password === enteredPassword
        );

        if (matchedUser) {
            // worked, take em to the profile
            localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
            window.location.href = "profile-page.html";
        } else {
            //didnt work, erro shown
            errorMsg.style.display = "block";
            gsap.fromTo(errorMsg, { opacity: 0, y: 10 }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        }
    });

    //error message
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Invalid login credentials.";
    errorMsg.classList.add("error-message");
    errorMsg.style.display = "none"; // hide initially
    loginForm.appendChild(errorMsg);

    gsap.from(errorMsg, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out"
    });






});
