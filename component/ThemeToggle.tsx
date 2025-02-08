"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Icons for better UI

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light"); // Default theme

    useEffect(() => {
        // Ensure localStorage is accessed only on the client
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn-circle btn-ghost flex items-center justify-center absolute top-4 right-4 z-10"
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
