import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);

    // On mount, read stored theme or system preference and apply
    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialDark = storedTheme === "dark" || (!storedTheme && prefersDark);

        setIsDark(initialDark);
        document.documentElement.classList.toggle("dark", initialDark);
    }, []);

    // Toggle dark/light mode and persist choice
    function toggleTheme() {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    }

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className="
        p-2 rounded-full
        bg-gray-200 text-gray-800
        dark:bg-gray-700 dark:text-gray-200
        hover:bg-gray-300 dark:hover:bg-gray-600
        transition
      "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="dark-mode-icon"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isDark ? (
                        // Moon icon
                        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                    ) : (
                        // Sun icon
                        <path d="M12 4.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 0112 4.75zm0 14.5a.75.75 0 01.75.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm8.25-7.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zm-16.5 0a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zm12.02-5.27a.75.75 0 011.06 0l.35.35a.75.75 0 11-1.06 1.06l-.35-.35a.75.75 0 010-1.06zm-9.54 9.54a.75.75 0 011.06 0l.35.35a.75.75 0 11-1.06 1.06l-.35-.35a.75.75 0 010-1.06zm9.54 1.06a.75.75 0 010 1.06l-.35.35a.75.75 0 11-1.06-1.06l.35-.35a.75.75 0 011.06 0zm-9.54-9.54a.75.75 0 010 1.06l-.35.35a.75.75 0 11-1.06-1.06l.35-.35a.75.75 0 011.06 0zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                    )}
                </svg>
            </button>
        </div>
    );

}
