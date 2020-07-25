import React from "react";
import Link from "next/link";
import Logo from "../assets/logo-with-text.svg";
function Footer(props) {
  return (
    <div className="bg-background py-12">
      <div className="mx-auto container flex justify-between items-middle">
        <Link href="/">
          <a>
            <Logo className="h-12 m min-w-12" />
          </a>
        </Link>
        <div className="grid gap-2 grid-flow-col items-center">
          <Link href="/about">
            <a>About</a>
          </Link>

          <Link href="/faq">
            <a>FAQ</a>
          </Link>

          <Link href="/contact">
            <a>Contact</a>
          </Link>

          <a
            target="_blank"
            href="https://medium.com"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
