import React from "react";
import {Link} from "react";

const menuItems = [
  {
    label: "Impressum",
    path: "/impressum",
  },
  {
    label: "AGBs",
    path: "/agbs",
  },
  {
    label: "Datenschutz",
    path: "/data-protection",
  },
];

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/Akkurent/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 23 23" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/akkurent/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="-2 -3 26 26" {...props}>
          <path
            fillRule="evenodd"
            d="M14.52,11 C14.52,12.9440423 12.9440423,14.52 11,14.52 C9.05595768,14.52 7.48,12.9440423 7.48,11 C7.48,9.05595768 9.05595768,7.48 11,7.48 C12.9431208,7.48222288 14.5177771,9.05687917 14.52,11 L14.52,11 Z M22,6.16 L22,15.84 C21.9961488,19.2404776 19.2404776,21.9961488 15.84,22 L6.16,22 C2.75952243,21.9961488 0.00385117055,19.2404776 0,15.84 L0,6.16 C0.00385117055,2.75952243 2.75952243,0.00385117055 6.16,0 L15.84,0 C19.2404776,0.00385117055 21.9961488,2.75952243 22,6.16 Z M16.28,11 C16.28,8.08393652 13.9160635,5.72 11,5.72 C8.08393652,5.72 5.72,8.08393652 5.72,11 C5.72,13.9160635 8.08393652,16.28 11,16.28 C13.9146974,16.2767047 16.2767047,13.9146974 16.28,11 Z M18.04,5.28 C18.04,4.55098413 17.4490159,3.96 16.72,3.96 C15.9909841,3.96 15.4,4.55098413 15.4,5.28 C15.4,6.00901587 15.9909841,6.6 16.72,6.6 C17.4490159,6.6 18.04,6.00901587 18.04,5.28 Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/akkurent/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 28 28" {...props}>
          <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
        </svg>
      ),
    },
  ],
};

const Footer = () => (
  <footer className="">
    <div className="container border-t border-gray-200 mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        className="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        {menuItems.map((item, i) => (
          <div key={i} className="px-5 py-2">
            <a
              href={item.href}
              className="text-base text-gray-500 hover:text-gray-900"
            >
              {item.label}
            </a>
          </div>
        ))}
      </nav>
      <div className="mt-8 flex justify-center space-x-6">
        {navigation.social.map((item) => (
          <a
            href={item.href}
            className="text-gray-400 hover:text-gray-500"
            target="_blank"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </a>
        ))}
      </div>
      <p className="mt-8 text-center text-base text-gray-400">
        &copy; {new Date().getFullYear()} Akkurent. Alle Rechte vorbehalten.
      </p>
    </div>
  </footer>
);

export default Footer;
