import { useEffect } from "react";

export function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        // Optional: unobserve if you only want it to trigger once
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% visible
                rootMargin: "0px 0px -50px 0px" // Trigger slightly before bottom
            }
        );

        const elements = document.querySelectorAll(".reveal-on-scroll");
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []); // Run once on mount (and re-run if DOM changes significantly, but usually once is enough for static content. ideally call in component)
}
