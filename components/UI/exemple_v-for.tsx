import Link from "next/link";

const Navbar = () => {
  const menuItems = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    // {
    //   id: 2,
    //   name: "Login",
    //   link: "/login",
    // },
    {
      id: 3,
      name: "Sign Up",
      link: "/auth/signup",
    },
  ];

  return (
    <nav className="bg-slate-200 w-full flex relative justify-between items-center mx-auto px-8 h-20">
      <ul className="text-lg inline-flex">
        {menuItems.map((item) => (
          <li key={item.id} className="my-3 md:my-0 items-center mr-4">
            <Link href={item?.link}>{item?.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
