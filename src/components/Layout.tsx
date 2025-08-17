import { Navbar, NavbarBrand, NavbarToggle } from 'flowbite-react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
