document.addEventListener("DOMContentLoaded", () => {

    const resultsContainer = document.getElementById("resultsContainer");
    const filterToggleBtn = document.getElementById("filterToggleBtn");
    const searchInput = document.getElementById("searchInput");
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
            id: "api-003",
            title: "Flight Delay API",
            type: "api",
            tags: ["airline", "safety"],
            date: "10 Mar 2025",
            comments: 5,
            saves: 4

        },
        {
            id: "post-004",
            title: "Forum Post: Doha Hotspots",
            type: "post",
            tags: ["city", "food"],
            date: "15 Apr 2025",
            comments: 15,
            saves: 68

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

    function renderResults(posts) {
        resultsContainer.innerHTML = "";
        posts.forEach(post => {
            const card = document.createElement("div");
            card.classList.add("result-card");
            card.innerHTML = `
        <h3>${post.title}</h3>
        <p>Type: ${post.type}</p>
        <p>Date: ${post.date}</p>
        <p>Comments: ${post.comments} | Saves: ${post.saves}</p>
        <button onclick="window.location.href='detail-page.html?id=${post.id}'">View</button>
      `;
            resultsContainer.appendChild(card);
        });
        gsap.from(".result-card", {
            scrollTrigger: {
                trigger: ".result-card",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2
        });


    }
    renderResults(fakePosts);

    //then increase on hover
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(".result-card")) {
            gsap.to(e.target.closest(".result-card"), {
                y: -5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(".result-card")) {
            gsap.to(e.target.closest(".result-card"), {
                y: 0,
                boxShadow: "0 0.2rem 0.5rem rgba(0, 0, 0, 0.05)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    const applyFiltersBtn = document.getElementById("applyFiltersBtn");

    applyFiltersBtn.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        const sortValue = document.querySelector("input[name='sort']:checked")?.value;

        let filtered = fakePosts.filter(post =>
            post.title.toLowerCase().includes(query)
        );

        const selectedTags = Array.from(document.querySelectorAll(".filter-group input:checked"))
            .map(input => input.value);

        if (selectedTags.length > 0) {
            filtered = filtered.filter(post =>
                selectedTags.some(tag => post.tags.includes(tag))
            );
        }

        const selectedTypes = Array.from(document.querySelectorAll(".type-group input:checked"))
            .map(input => input.value);

        if (selectedTypes.length > 0) {
            filtered = filtered.filter(post =>
                selectedTypes.includes(post.type)
            );
        }

        if (sortValue === "comments") {
            filtered.sort((a, b) => b.comments - a.comments);
        } else if (sortValue === "saved") {
            filtered.sort((a, b) => b.saves - a.saves);
        } else if (sortValue === "recent") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        renderResults(filtered);
    });

    //making the filter slide out
    const filterMenu = document.getElementById("filterMenu");

    filterToggleBtn.addEventListener("click", () => {
        if (filterMenu.classList.contains("open")) {
            gsap.to(filterMenu, {
                x: "-100%",
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => filterMenu.classList.remove("open")
            });
            filterToggleBtn.textContent = "▶";
        } else {
            filterMenu.classList.add("open");
            gsap.fromTo(filterMenu, { x: "-100%" }, {
                x: "0%",
                duration: 0.4,
                ease: "power2.out"
            });
            filterToggleBtn.textContent = "▼";
        }
    });

    //close it
    const closeFilterBtn = document.getElementById("closeFilterBtn");
    closeFilterBtn.addEventListener("click", () => {
        gsap.to(filterMenu, {
            x: "-100%",
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => filterMenu.classList.remove("open")
        });
        filterToggleBtn.textContent = "▶";
    });

    //the button that wont work...
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            if (loggedInUser && loggedInUser.username) {
                window.location.href = "/profile/profile-page.html";
            } else {
                window.location.href = "/profile/login-page.html";
            }
        });
    }

    //time to animate
    const allButtons = document.querySelectorAll("button");

    allButtons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
                boxShadow: "0 0 10px var(--soft-blue)",
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

    //serpapi injection
    async function loadSerpResults(query) {
        const serpKey = "22119667b73a8246af94d260164aaa35b5ddf5020750d4e7dab15fdd810ce14e";
        const endpoint = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&location=South Africa&api_key=${serpKey}`;

        try {
            const res = await fetch(endpoint);
            const data = await res.json();

            const serpPosts = data.organic_results?.slice(0, 3).map((result, index) => ({
                id: `serp-${index}`,
                title: result.title,
                type: "search result",
                date: "Live",
                comments: 0,
                saves: 0
            })) || [];

            renderResults([...serpPosts, ...fakePosts]);
        } catch (error) {
            console.error("SerpApi failed:", error);
            renderResults(fakePosts);
        }
    }
    const queryFromURL = new URLSearchParams(window.location.search).get("query");
    if (queryFromURL) {
        searchInput.value = queryFromURL;
        loadSerpResults(queryFromURL);
    } else {
        renderResults(fakePosts);
    }

    //weather results for the place
    async function loadWeatherPreview(city) {
        const apiKey = "44a0a0f1e9d4495199a90542251206";
        const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        try {
            const res = await fetch(endpoint);
            const data = await res.json();

            document.getElementById("weatherPreview").innerHTML = `
                <div class="weather-box">
                    <h4>${data.current.temp_c}°C</h4>
                    <p>${data.current.condition.text}</p>
                    <small>Weather in ${data.location.name}</small>
                </div>
            `;
        } catch (error) {
            console.warn("Weather preview failed:", error);
        }
    }
    if (queryFromURL) {
        loadWeatherPreview(queryFromURL);
    }





    window.onload = () => {

    };


});

