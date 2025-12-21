import { useState, useEffect } from "react";

export const SpotlightGrid = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none", // Click-through
                overflow: "hidden",
            }}
        >
            {/* Base Grid - Subtle static grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                    maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", // Fade out at the bottom
                    WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
            />

            {/* Spotlight Grid - Glowing lines revealed by mouse */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(to right, rgba(96, 165, 250, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(96, 165, 250, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                    // The spotlight effect: circular revealing mask around the cursor
                    maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                }}
            />
        </div>
    );
};
