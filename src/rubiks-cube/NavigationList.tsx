import Link from "next/link";

export default function NavigationList() {
  const routes = ["home", "projects", "about", "contact"] as const;

  return (
    <div className="relative inline-flex h-full flex-col overflow-clip">
      <div className="h-full px-10">
        <ul className="absolute top-0 left-0 inline-flex w-full flex-col">
          {routes.map((route) => (
            <li key={route} className="navigation text-center">
              <Link
                href={route === "home" ? "/" : `/${route}`}
                className="capitalize"
              >
                {route}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}