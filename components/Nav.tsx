
import DarkModeToggle from '@/lib/adapters/darkMode.tsx';
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
    <nav className="p-4 border-b border-gray-300 dark:border-gray-700 dark: text-black dark:text-gray-100">
      {navItems.map(({ label, href }) => (
        <Link key={href} href={href} passHref>
          <span
            className={`mr-4 cursor-pointer ${router.pathname === href
                ? "text-orange-500 dark:text-orange-400 font-bold"
                : "text-gray-800 dark:text-gray-300"
              }`}
          >
            {label}
          </span>
        </Link>
      ))}
      <DarkModeToggle />
    </nav>
  );
}
