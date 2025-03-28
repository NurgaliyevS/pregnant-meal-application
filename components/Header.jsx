"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { handleSignIn } from "./handleSignIn";
import { useSession } from "next-auth/react";
import { usePlausible } from "next-plausible";

const defaultLinks = [
  {
    href: "/#pricing",
    label: "Pricing",
  },
  // {
  //   href: "/#reviews",
  //   label: "Reviews",
  // },
  {
    href: "/#faq",
    label: "FAQ",
  },
  {
    href: "/#sample",
    label: "Meals",
  },
];

const Header = ({ linksOutside, buttonCore }) => {
  const plausible = usePlausible();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const links = linksOutside || defaultLinks;

  // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <div className="container max-w-7xl flex items-center flex-wrap justify-between px-8 mx-auto py-10">
      <nav
        className="container flex items-center justify-between mx-auto"
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 "
            href="/"
            title="Pregnant Meal - home page"
          >
            <Image
              src={"/company_related/logo.webp"}
              alt="Pregnant Meal logo"
              className="w-5 h-5"
              priority={true}
              width={24}
              height={24}
            />
            <span className="font-extrabold text-lg">PregnantMeal</span>
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        {buttonCore ? (
          <div className="flex lg:hidden">
            <Link
              href={buttonCore.href}
              className="btn btn-primary no-underline"
              title="Create new meal"
              rel="nofollow"
            >
              {buttonCore.label}
            </Link>
          </div>
        ) : (
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-base-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover"
              title={link.label}
              onClick={() => {
                if (link.label === "Pricing") {
                  plausible("PRICING");
                }
                if (link.label === "FAQ") {
                  plausible("FAQ");
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA on large screens */}
        {!session?.user ? (
          <div className="hidden lg:flex lg:justify-end lg:flex-1">
            <button className="btn btn-primary btn-wide no-underline" onClick={handleSignIn}>
              Login
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:justify-end lg:flex-1">
            {buttonCore ? (
              <Link
                href={buttonCore.href}
                className="btn btn-primary btn-wide no-underline"
                title="Create new meal"
                rel="nofollow"
              >
                {buttonCore.label}
              </Link>
            ) : (
              <Link
                href="/meal"
                className="btn btn-primary btn-wide no-underline"
                title="Admin page"
                rel="nofollow"
                onClick={() => {
                  plausible("ADMIN_PAGE");
                }}
              >
                {session?.user?.email}
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-10 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          {/* Your logo/name on small screens */}
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0 "
              title="Pregnant Meal - home page"
              href="/"
            >
              <Image
                src={"/company_related/logo.webp"}
                alt="Pregnant Meal logo"
                className="w-5 h-5"
                priority={true}
                width={24}
                height={24}
              />
              <span className="font-extrabold text-lg">PregnantMeal</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Your links on small screens */}
          <div className="flow-root mt-6">
            <div className="py-4">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="link link-hover"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            {/* Your CTA on small screens */}
            {!session?.user ? (
              <div className="flex flex-col">
                <button
                  className="btn btn-primary no-underline"
                  onClick={handleSignIn}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <Link
                  href="/meal"
                  className="btn btn-primary no-underline"
                  title="Admin page"
                  rel="nofollow"
                >
                  {session?.user?.email}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
