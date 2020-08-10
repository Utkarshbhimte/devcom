import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../util/auth";
import logo from "../../assets/logo-with-text.svg";

function Navbar(props) {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white py-4 sticky">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a>
            <img src={logo} className="h-12" />
          </a>
        </Link>
        {!auth.loading && (
          <div className="grid gap-4 align-middle items-center grid-flow-col">
            {auth.user && (
              <>
                <Link href="/dashboard">
                  <a className="navbar-item">Dashboard</a>
                </Link>

                <Link href="/logout">
                  <a
                    className="navbar-item"
                    onClick={(e) => {
                      e.preventDefault();
                      auth.signout();
                    }}
                  >
                    Sign out
                  </a>
                </Link>
              </>
            )}

            {!auth.user && (
              <Link href="/login">
                <a className="navbar-item">Sign in</a>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
