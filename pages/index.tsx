import EventTester from "@/components/EventTester.tsx";

// Main page: renders the security event tester
export default function Home() {
  const mode =
    process.env.NEXT_PUBLIC_USE_MOCK === "true" ? "Mock" : "REAL";

  return (
    <main className="p-8 font-sans bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Security Event Tester</h1>
      <p className="text-lg">
        Active mode:{" "}
        <strong className="text-orange-500 dark:text-orange-400">{mode}</strong>
      </p>
      <EventTester />
    </main>
  );
}
