
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    //Adding the fake interactions here too...
    const fakePosts = [
        {
            id: "tip-001",
            title: "Hydration Hack",
            type: "tip",
            tags: ["crew hacks", "uniform"],
            date: "1 May 2025",
            comments: 18,
            saves: 45
        },
        {
            id: "question-002",
            title: "Best layover snacks?",
            type: "question",
            tags: ["food", "crew hacks"],
            date: "3 Feb 2025",
            comments: 8,
            saves: 30
        },
        {
            id: "tip-005",
            title: "Uniform Hacks for Humid Layovers",
            type: "tip",
            tags: ["uniform", "crew hacks"],
            date: "22 May 2025",
            comments: 9,
            saves: 33
        },
        {
            id: "question-006",
            title: "Red-Eye Recovery Rituals?",
            type: "question",
            tags: ["crew hacks", "health"],
            date: "30 May 2025",
            comments: 7,
            saves: 21
        },
        {
            id: "tip-007",
            title: "Packing Light for 5-Day Trips",
            type: "tip",
            tags: ["crew hacks", "travel"],
            date: "4 June 2025",
            comments: 6,
            saves: 40
        },
        {
            id: "post-008",
            title: "Crew Meals That Actually Slap",
            type: "post",
            tags: ["food", "airline"],
            date: "10 June 2025",
            comments: 5,
            saves: 26
        }
    ];

    const scrollWrapper = document.querySelector(".carousel-scroll-wrapper");
    const carouselTrack = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    carouselTrack.innerHTML = "";
    if (carouselTrack) {
        const recentPosts = fakePosts
            .filter(p => p.type === "tip" || p.type === "question")
            .slice(0, 6);

        recentPosts.forEach(post => {
            const card = document.createElement("div");
            card.classList.add("carousel-card");

            card.innerHTML = `
                <h4>“${post.title}”</h4>
                <p><b>Date:</b> ${post.date}</p>
                <p><b>Comments:</b> ${post.comments} | <b>Saves:</b> ${post.saves}</p>
            `;

            carouselTrack.appendChild(card);
        });
    }

    prevBtn.addEventListener("click", () => {
        scrollWrapper.scrollBy({ left: -300, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
        scrollWrapper.scrollBy({ left: 300, behavior: "smooth" });
    });

    //gsap for site
    gsap.from(".hot-cards .card, .area-cards .card", {
        scrollTrigger: {
            trigger: ".hot-container",
            start: "top bottom",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    });


    /*animatinh weather box slide in*/
    gsap.from(".weather-box", {
        scrollTrigger: {
            trigger: ".weather-box",
            start: "top bottom",
            toggleActions: "play none none none"
        },
        x: 200,
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "bounce.out"

    });

    /*carosel effects*/
    gsap.from(".carousel-card", {
        scrollTrigger: {
            trigger: ".carousel-section",
            start: "top bottom",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
    });
    ScrollTrigger.refresh();

    /*navi links hover and fade on homepage*/
    const navLinks = document.querySelectorAll(".nav-links a, .footer-links a");
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            gsap.to(link, { color: "#f9cce3", duration: 0.3 });
        });
        link.addEventListener("mouseleave", () => {
            gsap.to(link, { color: "#323b60", duration: 0.3 });
        });
    });

    //buttons
    const joinBtn = document.querySelector(".join-btn");
    const submitBtn = document.querySelector(".submit-btn");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (joinBtn) {
        joinBtn.addEventListener("click", () => {
            window.location.href = "profile/signup-page.html";
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            if (loggedInUser && loggedInUser.username) {
                window.location.href = "profile/profile-page.html";
            } else {
                window.location.href = "profile/login-page.html";
            }
        });
    }

    //didnt wanna leave these cards empty, so i decided to just hard code the stuff
    function loadFeaturedPostsFallback() {
        const featuredPostsCard = document.getElementById("featuredPostsCard");
        const posts = fakePosts.filter(p => p.type === "post" || p.type === "tip").slice(0, 3);

        featuredPostsCard.innerHTML = `
            <h4>Featured Posts</h4>
            <ol>${posts.map(p => `<li>${p.title}</li>`).join("")}</ol>
        `;
    }

    function loadFeaturedQuestionsFallback() {
        const featuredQuestionsCard = document.getElementById("featuredQuestionsCard");
        const questions = fakePosts.filter(p => p.type === "question").slice(0, 3);

        featuredQuestionsCard.innerHTML = `
            <h4>Featured Questions</h4>
            <ol>${questions.map(q => `<li>${q.title}</li>`).join("")}</ol>
        `;
    }

    //WEATHERAPI code

    //first the code to find a person's weather by location... no im not a stalker :(
    function loadWeatherByLocation() {
        const apiKey = "44a0a0f1e9d4495199a90542251206";

        navigator.geolocation.getCurrentPosition(
            async position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const res = await fetch(
                        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
                    );
                    const data = await res.json();

                    document.getElementById("weather-temp").textContent = `${data.current.temp_c}°C`;
                    document.getElementById("weather-desc").textContent = data.current.condition.text;
                    document.getElementById("weather-icon").src = `https:${data.current.condition.icon}`;
                } catch (error) {
                    console.error("Weather fetch failed:", error);
                }
            },
            error => {
                console.warn("Location access denied. Using default city.");
                loadCustomWeather(); // fallback to Jhb incase this thing breaks
            }
        );
    }
    //fallback function because this stuff is annoying
    async function loadCustomWeather() {
        const apiKey = "44a0a0f1e9d4495199a90542251206";
        const city = "Johannesburg";

        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
            );
            const data = await res.json();

            document.getElementById("weather-temp").textContent = `${data.current.temp_c}°C`;
            document.getElementById("weather-desc").textContent = data.current.condition.text;
            document.getElementById("weather-icon").src = `https:${data.current.condition.icon}`;
        } catch (error) {
            console.error("Failed to load weather data :CC", error);
            document.getElementById("weather-temp").textContent = "Unavailable";
            document.getElementById("weather-desc").textContent = "Could not fetch data";
        }
    }

    //GeoAPIfy API
    function loadGeoHotspots() {
        const geoKey = "f983ab38f4ad4e979bb111a74ff3a368";
        navigator.geolocation.getCurrentPosition(
            async position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const endpoint = `https://api.geoapify.com/v2/places?categories=accommodation.hotel,entertainment,catering.restaurant&filter=circle:${lon},${lat},5000&limit=5&apiKey=${geoKey}`;

                try {
                    const res = await fetch(endpoint);
                    const data = await res.json();

                    const hotspotCards = document.getElementById("hotspotCards");
                    hotspotCards.innerHTML = "";

                    data.features.forEach(place => {
                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.innerHTML = `
                            <h4>${place.properties.name || "Unnamed Spot"}</h4>
                            <p>${place.properties.categories?.[0] || "Unknown type"}</p>
                            <small>${place.properties.address_line1 || "No address"}</small>
                        `;
                        hotspotCards.appendChild(card);
                    });

                    //animations
                    gsap.from("#hotspotCards .card", {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.2
                    });
                } catch (error) {
                    console.error("Geoapify fetch failed:", error);
                }
            },
            error => {
                console.warn("Location access denied. Hotspots not loaded.");
            }
        );
    }

    //SerAPI tbh I dont know what to do with this API because my site has almost no live/real info
    /**So... i think this code works because serpapi shows that I am making searches... in real time,
     * but I don't have a lot of data from any real users on my website... so I think once I have added that
     * type of stuff it would work and bring visible results. At least it works, lol.
     */
    async function loadFeaturedCities() {
        const serpKey = "22119667b73a8246af94d260164aaa35b5ddf5020750d4e7dab15fdd810ce14e";
        const query = "crew layover tips";
        const endpoint = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&location=South Africa&api_key=${serpKey}`;

        try {
            const res = await fetch(endpoint);
            const data = await res.json();

            const cities = data.organic_results
                .filter(r => r.title.toLowerCase().includes("in"))
                .map(r => r.title.match(/in\s([A-Za-z\s]+)/)?.[1])
                .filter(Boolean);

            const featuredCitiesCard = document.getElementById("featuredCitiesCard");
            featuredCitiesCard.innerHTML = `
      <h4>Featured Cities</h4>
      <ul>${cities.slice(0, 3).map(city => `<li>${city}</li>`).join("")}</ul>
    `;
        } catch (error) {
            console.error("SerpApi cities fetch failed:", error);
        }
    }

    window.onload = () => {
        loadFeaturedCities();
        loadFeaturedPostsFallback()
        loadWeatherByLocation();
        loadGeoHotspots();
        loadFeaturedQuestionsFallback()
    };




});





