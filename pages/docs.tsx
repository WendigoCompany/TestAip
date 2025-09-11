// @ts-ignore
import Link from 'next/link';

const endpoints = [
  {
    path: '/',
    method: 'GET',
    description: 'Main API entry point. Can be used for general status or landing.',
  },
  {
    path: '/status',
    method: 'GET',
    description: 'Performs a lightweight health check against the database using SELECT 1.',
  },
  {
    path: '/db/records',
    method: 'GET',
    description: 'Returns all alarm records from the database.',
  },
  {
    path: '/health',
    method: 'GET',
    description: 'Redirects to /status. Useful for external health probes or legacy paths.',
  },
];

export default function DocsPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>API Documentation</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {endpoints.map(({ path, method, description }) => (
          <li key={path} style={{ marginBottom: '1.5rem' }}>
            <Link href={path}>
              <strong style={{ fontSize: '1.1rem' }}>{method} {path}</strong>
            </Link>
            <p style={{ margin: '0.5rem 0 0' }}>{description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
