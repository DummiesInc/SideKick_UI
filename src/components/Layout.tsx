import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarLink } from "flowbite-react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Link from "next/link";


interface LayoutProps {
    children: ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}

      <Navbar fluid className="custom-navbar">
        <NavbarBrand href="/">
          <img src="https://www.franchisesidekick.com/hubfs/assets/logos/franchise-sidekick-logo.svg" alt="Franchise Sidekick Logo" />
        </NavbarBrand>
        <NavbarToggle/>
        <NavbarCollapse>
        <NavbarLink as={Link} href="/" active={router.pathname === "/"}>
            Home
          </NavbarLink>
          <NavbarLink as={Link} href="/about" active={router.pathname === "/about"}>
            About
          </NavbarLink>
          <NavbarLink as={Link} href="/contact" active={router.pathname === "/contact"}>
            Contact
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      {/* Page content */}
      <main className="flex-grow p-4">{children}</main>

      {/* Optional footer */}
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-500">
        No rights reserved lol
      </footer>
    </div>
  );
}
