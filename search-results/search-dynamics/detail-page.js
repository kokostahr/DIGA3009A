document.addEventListener("DOMContentLoaded", () => {
    const postContent = document.getElementById("postContent");
    const commentList = document.getElementById("commentList");
    const commentInput = document.getElementById("commentInput");
    const postCommentBtn = document.getElementById("postCommentBtn");

    const fakePosts = [
        {
            id: "tip-001",
            title: "Hydration Hack",
            type: "tip",
            date: "1 May 2025",
            author: {
                username: "Sexy_Gege",
                profileImg: "images/caleb-pfp.jpg"
            },
            content: "Staying Hydrated on long- flights is a nightmare. My girlfriend is forgetful. So guess who drinks my water ? Pilots should be given free water...",
            comments: [
                { username: "MC", text: "Caleb... watch yourself" },
                { username: "Anonymooose_crew", text: "This guy is just bragging 🙄" },
                { username: "Gideon_Here", text: "Someone's in love 👀" },
                { username: "Snowflake_Zayne", text: "These kinds of nonsense posts need to be moderated." },
                { username: "N109_Leader_Sy", text: "Ah... so kitten has been globe trotting with you?" }
            ]
        },
        {
            id: "question-002",
            title: "Best layover snacks?",
            type: "question",
            date: "3 Feb 2025",
            author: {
                username: "Hungry_Lyin",
                profileImg: "images/lying-pfp.jpg"
            },
            content: "What snacks do you pack for layovers?",
            comments: [
                { username: "FruitFan", text: "Fruit + nuts combo always wins." },
                { username: "Alien_Xavier", text: "Sushi." },
                { username: "Fishboy_RafRaf", text: "We're allowed to pack snacks??" },
                { username: "SimbaStan", text: "Simba Chips. Nothing beats South African snacks!" },
                { username: "Snowflake_Zayne", text: "Sushi? Who said sushi?! <b>@Alien_Xavier</b> Sushi isn't a snack... guess you left your common sense on Philos" },
            ]
        },
        {
            id: "api-003",
            title: "Flight Delay API",
            type: "api",
            date: "10 Mar 2025",
            author: {
                username: "TechCrew",
                profileImg: "images/tech-pfp.jpg"
            },
            content: "Hey crew! I built a simple API that tracks flight delays based on airline and route. It’s free to use and updates every 15 minutes. Great for planning ahead or warning passengers. Link: flightdelayapi.thissitedoesnexist",
            comments: [
                { username: "LayoverLegend", text: "This is incredible! Permission to use it into an app I'm developing?" },
                { username: "SkepticalPilot", text: "How accurate is it? Does it pull from ATC or airline feeds?" },
                { username: "SnackSeeker", text: "I used it last week. Saved me from a 3-hour wait in Joburg!" },
                { username: "TechCrew", text: "It pulls from public airline feeds + crowdsourced updates. Still improving!" },
                { username: "RevolvingHostess", text: "This isn't a tech site. I don't even know what you guys are talking about." },
            ]
        },
        {
            id: "post-004",
            title: "Forum Post: Doha Hotspots",
            type: "post",
            date: "15 Apr 2025",
            author: {
                username: "FreeAsaBird",
                profileImg: "images/woman-pfp.jpg"
            },
            content: "Just wrapped a 48-hour layover in Doha and wanted to share some gems: 1) Souq Waqif for spices and snacks, 2) MIA Park for skyline views, 3) Chapati & Karak for cheap eats. Heres a lil secret: crew discount at the Pearl’s sushi spot if you flash your badge!",
            comments: [
                { username: "FruitFan", text: "Chapati & Karak is a must. Their chai hits different." },
                { username: "JetSetJess", text: "Souq Waqif is magical at night. Thanks for the tip!" },
                { username: "CrewQueen", text: "Wait, wait, WAIT! There’s a sushi discount? 😳 Doha just got upgraded." },
                { username: "DohaLocal_Aali", text: "Try the falafel at Al Jasra. Hidden gem." },
                { username: "Crew_WorldExplorar", text: "Yeah, I've been there! The Pearl Sushi Lounge. Show your crew badge, get 15% off. It's basically for free." }
            ]
        },
        {
            id: "tip-005",
            title: "Uniform Hacks for Humid Layovers",
            type: "tip",
            date: "22 May 2025",
            author: {
                username: "BadgeBabe",
                profileImg: "images/badge-babe-pfp.jpg"
            },
            content: "Humidity ruins everything...especially polyester (and my private jet. Guys it's so expensive to maintain). I pack mini deodorant wipes, fold my stage costumes--I mean, my uniform ofc, inside a ziplock with silica gel, and hang it in the hotel bathroom with the AC blasting. Green earth who?",
            comments: [
                { username: "JetLaggedJay", text: "Silica gel?? You’re a genius." },
                { username: "CrewQueen", text: "I just wear linen and pray." },
                { username: "Snowflake_Zayne", text: "Polyester is a crime against humanity. Kind of like your jet, but I guess we not ready to have that convo." },
                { username: "FruitFan", text: "Mini wipes are underrated. I keep them in my shoe." },
                { username: "MC", text: "AC trick works. I do it with socks too. BTW are you supposed to be on this site 🤔?" }
            ]
        },
        {
            id: "question-006",
            title: "Red-Eye Recovery Rituals?",
            type: "question",
            date: "30 May 2025",
            author: {
                username: "JetSetJess",
                profileImg: "images/jess-pfp.jpg"
            },
            content: "After a red-eye, I feel like a ghost. What’s your recovery ritual? Mine: blackout curtains, magnesium, and no talking to humans for 6 hours.",
            comments: [
                { username: "Alien_Xavier", text: "I eat a banana and stare at the wall." },
                { username: "SimbaStan", text: "Sleep. Just sleep. Don’t fight it." },
                { username: "TechCrew", text: "Blue light blockers + blackout mask. Game changer." },
                { username: "Crew_WorldExplorar", text: "I journal my rage then nap." },
                { username: "RevolvingHostess", text: "I watch cat videos until I forget I exist... then a customer interrupts me." }
            ]
        },
        {
            id: "tip-007",
            title: "Packing Light for 5-Day Trips",
            type: "tip",
            date: "4 June 2025",
            author: {
                username: "SkySnackie",
                profileImg: "images/skysnackie-pfp.jpg"
            },
            content: "Crew packing tip: roll everything, wear your heaviest shoes, and never pack more than 3 tops. You’ll rewear. You always rewear.",
            comments: [
                { username: "Fishboy_RafRaf", text: "I pack 7 shirts. I regret it every time." },
                { username: "Hungry_Lyin", text: "I pack snacks instead of socks. Priorities." },
                { username: "JetSetJess", text: "Rewearing is our lifestyle. No overconsumption for me." },
                { username: "FruitFan", text: "I pack one outfit and wash it in the sink." },
                { username: "MC", text: "Heavy shoes = airport regret. But yes. I've saved a lot, been using the same outfit for the past 3 years" }
            ]
        },
        {
            id: "post-008",
            title: "Crew Meals That Actually Slap",
            type: "post",
            date: "10 June 2025",
            author: {
                username: "LayoverLegend",
                profileImg: "images/layoverlegend-pfp.jpg"
            },
            content: "Okay, hear me out: the veggie curry on Qatar is elite. Emirates breakfast wrap? Surprisingly edible. Let’s rank crew meals that actually slap.",
            comments: [
                { username: "SnackSeeker", text: "The curry is 🔥. I hoard it." },
                { username: "DohaLocal_Aali", text: "Try the lentil soup on Turkish. Life-changing." },
                { username: "CrewQueen", text: "Breakfast wrap is my religion." },
                { username: "Snowflake_Zayne", text: "I bring my own food. I don’t trust the system." },
                { username: "JetLaggedJay", text: "Singapore Airlines dessert tray. That’s all." },
                { username: "Sexy_Gege", text: "<b>@Snowflake_Zayne</b> ur not even a crew member. dont u have a surgery to get back to, doc?" }
            ]
        }
    ];


    // Get post ID from the url
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");

    const post = fakePosts.find(p => p.id === postId);

    if (!post) {
        postContent.innerHTML = "<p>Post not found.</p>";
        return;
    }

    postContent.innerHTML = `
        <div class="post-header">
            <img src="${post.author.profileImg}" alt="${post.author.username}'s profile" class="profile-icon" />
            <h1>${post.title}</h1>
            <p><b>Posted by:</b> ${post.author.username}</p>
            <p><b>Type:</b> ${post.type}</p>
            <p><b>Date:</b> ${post.date}</p>
            <button class="save-btn">𖹭 Save</button>
        </div>
        <p>${post.content}</p>
    `;

    const mainSaveBtn = document.querySelector(".save-btn");
    mainSaveBtn.addEventListener("click", () => {
        mainSaveBtn.classList.toggle("saved");
        mainSaveBtn.textContent = mainSaveBtn.classList.contains("saved") ? "𖹭 Saved" : "𖹭 Save";
    });


    function renderComments() {
        commentList.innerHTML = "";
        post.comments.forEach(comment => {
            const commentBox = document.createElement("div");
            commentBox.classList.add("comment-box");
            commentBox.innerHTML = `
      <p><strong>${comment.username}:</strong> ${comment.text}</p>
    `;
            commentList.appendChild(commentBox);
        });
    }
    renderComments();

    postCommentBtn.addEventListener("click", () => {
        const newComment = commentInput.value.trim();
        if (newComment) {
            post.comments.push({ username: "You", text: newComment });
            renderComments();
            commentInput.value = "";
            commentInput.style.height = "auto";
        }
    });

    //trying the carosul agai. please work... its brokenish... only displays 1 post. idk whyyyy
    //update, now it looks funky on mobile... but almost all 3 are shpwing
    try {
        const carouselContainer = document.getElementById("carouselContainer");
        const suggestedPosts = fakePosts.filter(p => p.id !== postId);

        suggestedPosts.forEach(suggested => {
            const card = document.createElement("div");
            card.classList.add("carousel-card");
            card.innerHTML = `
                <h3>${suggested.title}</h3>
                <p><b>Type:</b> ${suggested.type}</p>
                <p><b>Date:</b> ${suggested.date}</p>
                <p><b>By:</b> ${suggested.author.username}</p>
                
            `;
            card.addEventListener("click", () => {
                window.location.href = `detail-page.html?id=${suggested.id}`;
            });
            carouselContainer.appendChild(card);
        });

        //saveeee button
        const saveBtn = card.querySelector(".save-btn");
        saveBtn.addEventListener("click", () => {
            saveBtn.classList.toggle("saved");
            saveBtn.textContent = saveBtn.classList.contains("saved") ? "𖹭 Saved" : "𖹭 Save";
        });

        gsap.from(".carousel-card", {
            x: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".carousel-container",
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    } catch (err) {
        console.error("Carousel logic failed:", err);
    }

    //then go back to the forum page 
    const backToForumBtn = document.getElementById("backToForumBtn");
    backToForumBtn.addEventListener("click", () => {
        window.location.href = "forum-search.html";
    });

    //a bit of gsap
    //content and comments
    gsap.from(".post-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".comment-box", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
    });

    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("pointerenter", () => {
            gsap.to(btn, {
                boxShadow: "0 0 3rem var(--soft-blue)",
                duration: 0.3
            });
        }, { passive: true });

        btn.addEventListener("pointerleave", () => {
            gsap.to(btn, {
                boxShadow: "none",
                duration: 0.3
            });
        }, { passive: true });
    });

    document.querySelectorAll(".save-btn").forEach(btn => {
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




    //upvoting is kinda broken:

    //upvote or downvote
    document.querySelector(".upvote").addEventListener("click", (e) => {
        e.target.classList.toggle("clicked");
    });

    document.querySelector(".downvote").addEventListener("click", (e) => {
        e.target.classList.toggle("clicked");
    });


});

