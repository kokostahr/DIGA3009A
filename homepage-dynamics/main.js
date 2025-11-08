document.addEventListener("DOMContentLoaded", function () {
    //issues with switching between 'profile' and 'login' button :(
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    /**let's uhm, make the navbar and footer dynamic first */
    const navbarHTML = `
        <nav class="main-nav">
            
            <div class="nav-group">
            <div class="logo">Cabin Clue</div>
                    <button class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                    </button>

                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="faqs/about-page.html">About</a></li>
                    <li><a href="faqs/faqs-page.html">FAQs</a></li>
                    <li><a href="search-results/forum-search.html">Forum</a></li>
                    <li><a href="faqs/contact-page.html">Contact</a></li>
                </ul>
                <div class="nav-auth"></div>

            </div     
        </nav>
    `;
    const navContainer = document.getElementById("nav-container");
    if (navContainer) {
        navContainer.innerHTML = navbarHTML;
    }

    const navAuth = document.querySelector(".nav-auth");
    if (navAuth) {
        if (loggedInUser && loggedInUser.username) {
            navAuth.innerHTML = `
               <a href="profile/profile-page.html" class="profile-link">
                    <i class="fas fa-user"></i> ${loggedInUser.username}
                </a>
                <button class="logout-btn">Logout</button>
            `;
        } else {
            navAuth.innerHTML = `
                <button class="login-btn" onclick="window.location.href='profile/login-page.html'">
                    Login
                </button>
            `;
        }
    }

    //signout option. rn the webpage just shows
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "/index.html";
        });
    }

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("open");
        });
    }

    /*same kinda method for the searchbar*/
    const searchbarHTML = `
        <section class="search-section">
            <form id="searchForm">
                <input type="text" id="searchInput" placeholder="Search Cabin Clue..." autocomplete="off" />
                <button type="submit" class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <ul id="autocompleteList" class="autocomplete-list"></ul>
        </section>
    `;
    const searchContainer = document.getElementById("searchbar-cta");
    if (searchContainer) {
        searchContainer.innerHTML = searchbarHTML;
    }

    /*let's attempt the footer*/
    const footerHTML = `
        <footer class="ftr">
            <ul class="footer-links">
                <li> <a href="/faqs/about-page.html">About</a> </li>
                <li> <a href="/faqs/faqs-page.html">FAQs</a> </li>
                <li> <a href="/faqs/contact-page.html">Contact</a> </li>
            </ul>
            <ul class="social-icons">
                <li> <a href="#">Instagram</a> </li>
                <li> <a href="#">YouTube</a> </li>
            </ul>
            <p>&copy; 2025 Cabin Clue ⋆｡ﾟ☁︎｡✈︎⋆｡ ﾟ☾ ﾟ｡⋆ Mine No Stealing</p>
        </footer >
    `;
    const ftrContainer = document.getElementById("ftr-container");
    if (ftrContainer) {
        ftrContainer.innerHTML = footerHTML;
    }

    //lets make the button do smth
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length > 0) {
                localStorage.setItem("lastSearchQuery", query);
                window.location.href = `search-results/forum-search.html?query=${encodeURIComponent(query)}`;
            } else {
                window.location.href = `search-results/forum-search.html`;
            }
        });
    }

    //Coding the auto-complete logic for the search bar. static info for now
    const searchInput = document.getElementById("searchInput");
    const autocompleteList = document.getElementById("autocompleteList");

    const sampleSuggestions = [
        "Hydration tips",
        "Layover snacks",
        "Packing hacks",
        "Red-eye survival",
        "Cabin crew routines",
        "Jet lag remedies",
        "Dubai",
        "South Africa",
        "Thailand",
        "Egypt",
        "Food Spots"

    ];

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        autocompleteList.innerHTML = "";

        if (query.length > 0) {
            const filtered = sampleSuggestions.filter(s =>
                s.toLowerCase().includes(query)
            );

            if (filtered.length > 0) {
                autocompleteList.style.display = "block";

                filtered.forEach(suggestion => {
                    const li = document.createElement("li");
                    li.textContent = suggestion;
                    li.addEventListener("click", () => {
                        searchInput.value = suggestion;
                        autocompleteList.innerHTML = "";
                        autocompleteList.style.display = "none";
                    });
                    autocompleteList.appendChild(li);
                });
            } else {
                autocompleteList.style.display = "none";
            }
        } else {
            autocompleteList.style.display = "none";
        }

        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
                autocompleteList.style.display = "none";
            }
        });


    });

    //need a back to top buttn
    const backToTopHTML = `
        <button id="backToTopBtn" class="back-to-top">↟Top↟</button>
    `;

    document.body.insertAdjacentHTML("beforeend", backToTopHTML);
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            gsap.to(backToTopBtn, { opacity: 1, pointerEvents: "auto", duration: 0.5 });
        } else {
            gsap.to(backToTopBtn, { opacity: 0, pointerEvents: "none", duration: 0.5 });
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });





})