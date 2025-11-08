document.addEventListener("DOMContentLoaded", () => {
    //making the boxes bounce around the screen lightli, for attention focus
    gsap.to(".user-wan", {
        x: "random(-80, 80)",
        y: "random(-50, 50)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".user-too", {
        x: "random(-120, 120)",
        y: "random(-80, 80)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

