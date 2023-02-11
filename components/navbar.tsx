import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/firebase/provider";
import styles from "./Navbar.module.css";
import SiteIcon from "@/icons/site-icon.svg";

const NavBar = () => {
  const { user, logout } = useAuth();

  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  const { asPath } = useRouter();
  const inLoginPage = asPath === "/auth/login" ? true : false;

  let displayLoginBtn: boolean;
  if (user) {
    displayLoginBtn = false;
  } else {
    if (inLoginPage) {
      displayLoginBtn = false;
    } else {
      displayLoginBtn = true;
    }
  }

  return (
    <nav className={styles.navbar}>
      {/* <!-- logo --> */}
      <div className="inline-flex">
        <Link href="/">
          <SiteIcon />
        </Link>
      </div>

      {/* <!-- end logo --> */}

      {/* <!-- login --> */}
      <div className="flex-initial inline-flex relative">
        {!user ? (
          <div>
            {displayLoginBtn ? <Link href="/auth/login">Log in</Link> : null}
          </div>
        ) : (
          <div className="flex-initial inline-flex relative">
            <div className="my-auto">
              <span>{user.email}</span>
            </div>
            <div>
              <button
                type="button"
                className="w-full justify-center focus:outline-none"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={handleDropDown}
              >
                <div className="flex h-10 w-12 pl-3">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                  </svg>
                </div>
              </button>
              <div
                className={`absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  isOpen ? "block" : "hidden"
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div role="none">
                  <Link
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    id="menu-item-0"
                    onClick={handleDropDown}
                  >
                    Account settings
                  </Link>
                  <Link
                    href="/admin/places"
                    className="text-gray-700 block px-4 py-2 text-sm"
                  >
                    Manage Places
                  </Link>
                  <Link
                    href="/admin/invite"
                    className="text-gray-700 block px-4 py-2 text-sm"
                  >
                    Send Invitation
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    id="menu-item-1"
                    onClick={() => {
                      handleDropDown;
                      logout();
                    }}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <!-- end login --> */}
      </div>
    </nav>
  );
};

export default NavBar;
