import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarToggle,
  NavbarCollapse
} from 'flowbite-react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar fluid className="custom-navbar">
        <NavbarBrand href="/">
          <img
            src="https://www.franchisesidekick.com/hubfs/assets/logos/franchise-sidekick-logo.svg"
            alt="Franchise Sidekick Logo"
          />
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink as={Link} href="/" active={router.pathname === '/'}>
            Home
          </NavbarLink>
          <NavbarLink
            as={Link}
            href="/map"
            active={router.pathname === '/about'}
          >
            Franchise Map
          </NavbarLink>
          <NavbarLink
            as={Link}
            href="/map"
            active={router.pathname === '/contact'}
          >
            Map
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      {/* Page content */}
      <main className="flex-grow p-4 flex justify-center items-start mt-14">
        {children}
      </main>

      {/* Optional footer */}
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-500">
        <div>No rights reserved lol</div>
        <div>Please don't sue me</div>
      </footer>
    </div>
  );
}
