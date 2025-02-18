import { Link } from "react-router-dom";

const links = [
  {
    name: "Features",
    href: "features",
  },
  {
    name: "Offers",
    href: "offers",
  },
];

const DashboardSidebar = () => {
  return (
    <aside className='flex-1 bg-secondary p-5 rounded-lg'>
      <ul className='flex flex-col gap-1'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className='block py-2 px-3 rounded-md text-lg font-semibold text-slate-700 transition-all hover:bg-slate-200 hover:text-slate-900'
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
