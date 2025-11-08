document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    //doing eveything in 1 file

    //the logic for the Contact form
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields before attempting to contact us.");
                return;
            }
            //simulating submission
            alert(`Thanks ${name}! Your message has been received.\n\nOur devs are on holiday, so expect a reply in 30–55 days 😭`);

            //fun lil addition, lol
            const burst = document.createElement("div");
            burst.classList.add("confetti-burst");
            document.body.appendChild(burst);
            gsap.to(burst, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(burst, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.6,
                        ease: "power2.in",
                        delay: 0.5,
                        onComplete: () => burst.remove()
                    });
                }
            });
            contactForm.reset();
        });
    }



    //gsap
    //page headers
    gsap.from("main h1", {
        scrollTrigger: {
            trigger: "main h1",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    //section intros
    gsap.from("main p", {
        scrollTrigger: {
            trigger: "main p",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    });

    //content blocks (About & Contact)
    gsap.from("main h2, main label", {
        scrollTrigger: {
            trigger: "main",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    });

    //form inputs (Contact)
    gsap.from("input, textarea, button", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.15
    });

    //FAQ 
    gsap.from(".faq-list details", {
        scrollTrigger: {
            trigger: ".faq-list",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    });
});

