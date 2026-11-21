import Link from "next/link";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    // pointer-events-none on the bar itself lets wheel/touch input fall through
    // to the hero underneath; only the actual controls are interactive.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-gray-200/70 bg-[#FAFAFA]/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6"
      >
        {/* Left: logo */}
        <Link
          href="/"
          className="pointer-events-auto justify-self-start text-lg font-semibold tracking-tight text-gray-900"
        >
          Nailart AI
        </Link>

        {/* Center: links */}
        <ul className="pointer-events-auto hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA */}
        <a
          href="#get-started"
          className="pointer-events-auto col-start-3 justify-self-end rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Get started
        </a>
      </nav>
    </header>
  );
}
