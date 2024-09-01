import Link from "next/link";
import { MaterialSymbolsArrowDropDownRounded } from "../icons/arrow-drop-down";
import { PhUserCircleLight } from "../icons/user-circle";

const Navbar = () => {
  return (
    <nav className="flex justify-end bg-blue-500">
      <div className="flex items-center gap-4 border-l-4 border-blue-600 p-4 w-72">
        <PhUserCircleLight className="w-12 h-12 text-white" />
        <div className="flex flex-col">
          <Link href="/profile">
            <h1 className="text-white font-bold flex gap-2 items-center">
              JASON LEE L.W.
              <MaterialSymbolsArrowDropDownRounded className="w-8 h-8 text-white" />
            </h1>
          </Link>
          <h3 className="text-white text-xs">Sales Lead</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
