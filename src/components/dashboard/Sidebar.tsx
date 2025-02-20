import { Link, useLocation } from "react-router-dom";

const links = [
  {
    name: "Характеристики",
    href: "/dashboard",
  },
  {
    name: "Прайсы",
    href: "/dashboard/prices",
  },
  {
    name: "Предложении",
    href: "/dashboard/offers",
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  return (
    <aside className='flex-1 border py-4 px-2 rounded-lg'>
      <ul className='flex flex-col gap-1'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className={`block py-2 px-3 rounded-md text-lg font-semibold text-slate-700 transition-all hover:bg-[#F2F3F6] hover:text-slate-900 ${
                location.pathname === link.href
                  ? "bg-[#F2F3F6] text-slate-900"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
