import Link from 'next/link';
import { sections } from '@/utils/sections';

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-700 px-6 backdrop-blur-md">
      <Link className="flex h-16 items-center justify-center text-xl" href="/">
        img.tools
      </Link>
      <ul className="flex space-x-2">
        {sections.map(section => (
          <li
            key={section.title}
            className="group relative flex items-center justify-center last:!inline-flex even:hidden xs:even:inline-flex"
          >
            <span className="pointer-events-none absolute z-10 w-max translate-y-14 transform rounded-md bg-primary-6 py-1 px-2 text-left opacity-0 duration-200 group-hover:translate-y-10 group-hover:opacity-100">
              {section.label}
            </span>
            <Link
              className="flex items-center justify-center rounded-md bg-primary-6 p-1"
              href={section.tryItOut}
              aria-label={section.title}
            >
              <section.icon />
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
