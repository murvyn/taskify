import Link from "next/link";
import React from "react";
import { FaHome, FaCheck, FaClipboard } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

interface Props {
  show: boolean;
  setShow?: (value: boolean) => void;
}

const links = [
  { name: "All Tasks", route: "/", icon: <FaHome /> },
  { name: "Important", route: "/important", icon: <FaListCheck /> },
  { name: "Completed", route: "/completed", icon: <FaCheck /> },
  { name: "Do it Now", route: "/do-it-now", icon: <FaClipboard /> },
];

const SidebarLinks = ({ show, setShow }: Props) => {
  return (
    <div className="w-full">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            show && "tooltip  hover:tooltip-open tooltip-primary tooltip-right"
          } w-full`}
          data-tip={link.name}
        >
          <Link
            href={link.route}
            onClick={() => setShow && setShow(!show)}
            className={`border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center space-x-5  sm:${
              show && "w-[5rem]"
            } `}
          >
            {link.icon}
            <p className={`sm:${show && "hidden"}`}>{link.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SidebarLinks;
