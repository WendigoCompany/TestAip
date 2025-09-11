// @ts-ignore
import Link from "next/link";

const endpoints = [
  {
    path: "/",
    method: "GET",
    description: "Main API.",
  },
  {
    path: "/status",
    method: "GET",
    description:
      "Performs a lightweight health check against the database using SELECT 1.",
  },
  {
    path: "/db/records",
    method: "GET",
    description: "Returns all alarm records from the database.",
  },
  {
    path: "/health",
    method: "GET",
    description:
      "Redirects to /status. Useful for external health probes or legacy paths.",
  },
];

export default function DocsPage() {
  return (
    <main className="p-8 bg-white text-black dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      <ul className="list-none p-0">
        {endpoints.map(({ path, method, description }, index) => (
          <li key={path} className="mb-6">
            <Link href={path}>
              <strong
                className="
                  text-lg font-semibold
                  text-blue-700 dark:text-blue-400
                  hover:text-orange-500 dark:hover:text-orange-400
                  transition-colors
                  cursor-pointer
                "
              >
                {method} {path}
              </strong>
            </Link>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{description}</p>

            <hr className="mt-4 border-t-2 border-orange-400 dark:border-orange-500" />
          </li>
        ))}
      </ul>
    </main>
  );
}
