"use client";
import { useRouter } from "next/navigation";
import { useTypewriter } from "react-simple-typewriter";

const GetStartedPage = () => {
  const router = useRouter();
  const text = useTypewriter({
    words: [
      "Organize Your Life",
      "Boost Productivity",
      "Stay Organized",
      "Manage Tasks Effortlessly",
    ],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">
        <h1 className="text-7xl mb-1 font-bold text-center overflow-hidden">
          Taskify
        </h1>
        <h1 className="text-2xl  text-center overflow-hidden">{text[0]}</h1>
        <button
          onClick={() => router.push("/auth/login")}
          className="btn btn-primary px-7 mt-10"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default GetStartedPage;
