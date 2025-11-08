document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "login-page.html";
        return;
    }

    //the header
    document.getElementById("username").textContent = user.username;
    document.getElementById("fullName").textContent = user.fullName;
    document.getElementById("crewRole").textContent =
        user.crewType === "crew" ? "Crew Member" : "Aspiring Crew";
    document.getElementById("crewSince").textContent = `Crew since ${user.crewSince}`;
    document.getElementById("bio").textContent = user.bio;

    //profile pic
    const img = document.createElement("img");
    img.src = user.profileImg;
    img.alt = `${user.username}'s profile picture`;
    img.classList.add("profile-img");
    document.querySelector(".profile-header").prepend(img);

    //saved stuff
    const tipList = document.querySelector(".tip-list");
    user.savedTips.forEach(tip => {
        const tipItem = document.createElement("p");
        tipItem.textContent = `${tip.rank}: ${tip.title} (${tip.date})`;
        tipList.appendChild(tipItem);
    });

    const noteList = document.querySelector(".note-list");
    user.savedNotes.forEach(note => {
        const noteItem = document.createElement("p");
        noteItem.textContent = note;
        noteList.appendChild(noteItem);
    });

    const submissionList = document.querySelector(".submission-list");
    user.lastSubmitted.forEach(item => {
        const subItem = document.createElement("p");
        subItem.textContent = item;
        submissionList.appendChild(subItem);
    });

    const cityList = document.querySelector(".city-list");
    user.savedCities.forEach(city => {
        const cityItem = document.createElement("p");
        cityItem.textContent = city;
        cityList.appendChild(cityItem);
    });

    //now that that's done :'>, time for the animations
    gsap.from(".profile-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
    });

    gsap.from(".profile-box", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.8
    });

    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
                boxShadow: "0 0 10px var(--light-magenta)",
                duration: 0.3
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                boxShadow: "none",
                duration: 0.3
            });
        });
    });

    //no, you cannot edit the profile. too much work
    const editBtn = document.querySelector(".edit-btn");
    const tooltip = document.getElementById("editTooltip");

    editBtn.addEventListener("click", () => {
        tooltip.style.display = "block";
        gsap.fromTo(tooltip, { y: 10, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });

        setTimeout(() => {
            gsap.to(tooltip, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    tooltip.style.display = "none";
                }
            });
        }, 3000); //3 secs
    });


});

