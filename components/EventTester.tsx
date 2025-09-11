import { useEffect, useRef, useState } from "react";

export default function EventTester() {
  const [eventText, setEventText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<any>(null);
  const waitAnimation = useRef<any>(null);

  // 🚀 Sends the event to the backend for processing
  const sendEvent = async () => {
    if (!eventText.trim()) return;
    try {
      setLoading(true);
      const res = await fetch("/api/process-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evento: eventText }),
      });
      const data = await res.json();
      setResult(data);
      waitAnimation.current.style.opacity = 0;
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      setLoading(false);
      console.error("Error processing event:", error);
    }
  };

  // 🌀 Fade-in animation for loading overlay
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        waitAnimation.current.style.opacity = 1;
      }, 1);
    }
  }, [loading]);

  // 🧹 Clears textarea if eventText is reset
  useEffect(() => {
    if (eventText === "" && textareaRef.current) {
      textareaRef.current.value = "";
    }
  }, [eventText]);

  const handleChange = (e: any) => {
    setEventText(e.target.value);
  };



  return (
    <div className="p-8 bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Loading overlay */}
      {loading && (
        <div
          ref={waitAnimation}
          className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center transition-opacity opacity-0"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/Lightness_rotate_36f-L_cw.gif"
            alt="Loading..."
            className="w-20 h-20"
          />
        </div>
      )}

      {/* Textarea input */}
      <textarea
        ref={textareaRef}
        value={eventText}
        onChange={handleChange}
        placeholder="Type the event..."
        rows={4}
        className="w-full px-4 py-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-gray-100 mb-4"
      />

      {/* Submit button */}
      <button
        onClick={sendEvent}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Process event
      </button>

      {/* Result display */}
      {result && (
        <div className="mt-6 space-y-2">
          <p>
            <strong>Summary:</strong> {result.summary}
          </p>
          <p>
            <strong>Severity:</strong> {result.severity}
          </p>
          <p>
            <strong>Suggested action:</strong> {result.action}
          </p>
        </div>
      )}
    </div>
  );

}

