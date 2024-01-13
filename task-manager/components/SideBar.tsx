"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import MainSide from "./MainSide";
import SecondSide from "./SecondSide";

const SideBar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <SecondSide show={show} setShow={setShow} />
      <MainSide show={show} />
      <div>
        <button
          onClick={() => setShow(!show)}
          className=" fixed bottom-6 right-6 shadow-2xl z-40 btn btn-primary rounded-full"
        >
          {show ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </>
  );
};

export default SideBar;
