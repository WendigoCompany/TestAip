import EventTester from "@/components/EventTester.tsx";

// 🏠 Main page: renders the security event tester
export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Security Event Tester</h1>
      <p>
        Active mode:
        <strong>
          {process.env.NEXT_PUBLIC_USE_MOCK === "true" ? "Mock" : "REAL"}
        </strong>
      </p>
      <EventTester />
    </main>
  );
}
