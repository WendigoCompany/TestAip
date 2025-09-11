// @ts-ignore
import Link from 'next/link';
// @ts-ignore
import { useRouter } from 'next/router';


const navItems = [
  { label: 'Main Api', href: '/' },
  { label: 'DB - Records', href: '/db/records' },
  { label: 'Status', href: '/status' },
  { label: 'Docs', href: '/docs' },
];

export default function NavBar() {
  const router = useRouter();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px sol id #ccc' }}>
      {navItems.map(({ label, href }) => (
        <Link key={href} href={href} passHref>
          <span
            style={{
              marginRight: '1rem',
              fontWeight: router.pathname === href ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
