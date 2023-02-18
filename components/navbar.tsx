import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/firebase/provider";
// Icons
import SiteIcon from "@/icons/site-icon.svg";
import ShareIcon from "@/icons/share.svg";
import ProfileIcon from "@/icons/profile.svg";
import ChevronUp from "@/icons/chevron-up.svg";
import ChevronDown from "@/icons/chevron-down.svg";

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
    <nav className="navbar inline-flex w-full h-100 top-0 left-0 justify-between items-center bg-light-grey border border-grey p-12">
      {/* <!-- logo --> */}
      <Link href="/">
        <SiteIcon />
      </Link>
      {/* <!-- end logo --> */}

      {/* <!-- login --> */}
      <div className="flex-initial inline-flex">
        {!user ? (
          <div>
            {displayLoginBtn ? (
              <Link
                href="/auth/login"
                className="loginText text-green font-bold"
              >
                <span className="font-bold">Log in</span>
              </Link>
            ) : null}
          </div>
        ) : (
          <div>
            <div className="flex-initial inline-flex relative">
              <button className="flex mt-1">
                <ShareIcon className="mt-1" />
                <span className="ml-2.5 leading-7 font-bold">Share</span>
              </button>
              <button
                type="button"
                className="flex ml-10"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={handleDropDown}
              >
                <ProfileIcon />
                <div className="flex leading-9">
                  <span className="ml-2.5 font-bold">Alessandro</span>
                  <div className="mt-2">
                    {isOpen ? (
                      <ChevronUp className="ml-4" />
                    ) : (
                      <ChevronDown className="ml-4" />
                    )}
                  </div>
                </div>
              </button>
            </div>
            <div
              className={`absolute mt-1 right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
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
                  Change Password
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
        )}
        {/* <!-- end login --> */}
      </div>
    </nav>
  );
};

export default NavBar;
