import { TaskContext } from "@/contexts/taskContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { FaHome, FaCheck, FaClipboard } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

interface Props {
  show: boolean;
  setShow?: (value: boolean) => void;
}

const SidebarLinks = ({ show, setShow }: Props) => {
  const router = usePathname();
  const { allTaskCount, importantCount, completedCount, todayCount } =
    useContext(TaskContext);
  const links = [
    {
      name: "All Tasks",
      route: "/dashboard",
      icon: <FaHome />,
      count: allTaskCount,
    },
    {
      name: "Important",
      route: "/dashboard/important",
      icon: <FaListCheck />,
      count: importantCount,
    },
    {
      name: "Completed",
      route: "/dashboard/completed",
      icon: <FaCheck />,
      count: completedCount,
    },
    {
      name: "Do it Today",
      route: "/dashboard/do-it-today",
      icon: <FaClipboard />,
      count: todayCount,
    },
  ];
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
            className={` border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center items-center   sm:${
              show && "w-[5rem]"
            } ${router === link.route ? "border-r-primary" : ""} `}
          >
            <div className="indicator space-x-5">
              {link.icon}
              {link.count ? (
                <span className="indicator-item text-[0.7rem] p-[0.3rem] w-[1.3rem] h-[1.3rem] -mt-2 badge badge-secondary">
                  {link.count}
                </span>
              ): ''}
              <p className={`sm:${show && "hidden"}`}>{link.name}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SidebarLinks;
