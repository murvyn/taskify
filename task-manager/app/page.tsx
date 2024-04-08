"use client";
import { useRouter } from "next/navigation";
import Logo from "../assets/logo.png";
import Image from "next/image";
import peres from '../assets/1.jpg'
import raph from '../assets/2.jpg'
import jamal from '../assets/jamal.jpg'
import enerst from '../assets/ernest.jpg'
import aug from '../assets/aug.jpg'
import bat from '../assets/bat.jpg'
import kel from '../assets/kel.jpg'
import marv from '../assets/marv.jpg'

const feats = [
  "Intuitive Task Management: Create, organize, and prioritize tasks effortlessly.",
  "Collaboration Made Easy: Share tasks, delegate responsibilities, and work together seamlessly.",
  "Deadline Tracking: Never miss a deadline again with Taskify's built-in reminders and notifications.",
  "Customizable Workflows: Tailor Taskify to fit your unique workflow and preferences.",
  "Sync Across Devices: Access your tasks anytime, anywhere, with Taskify's multi-platform support.",
];

const collaborators = [
  {
    name: "Marvin Asamoah",
    position: "Frontend Developer",
    image: marv
  },
  {
    name: "Dogah Perez Kwame",
    position: "Backend Developer",
    image: peres
  },

  {
    name: "Akandi Raphael",
    position: "Project Manager",
    image: raph
  },
  {
    name: "Kelvin Dauodi",
    position: "Project Manager",
    image: kel
  },
  {
    name: "Iddrisu Jamal",
    position: "Frontend Developer",
    image: jamal
  },
  {
    name: "Frimpong Ernest",
    position: "Frontend Developer",
    image: enerst
  },
  {
    name: "Augustine Nkrumah",
    position: "Backend Developer",
    image: aug
  },
  {
    name: "Wontewe Bartholomew",
    position: "Backend Developer",
    image: bat
  },
];

const Home = () => {
  const router = useRouter();
  return (
    <div className="px-5 lg:px-28 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src={Logo} alt="logo" width={80} height={80} />
          <h1 className="text-secondary text-4xl font-semibold">Taskify</h1>
        </div>
        <button
          onClick={() => router.push("/get-started")}
          className="btn btn-primary"
        >
          Get Started
        </button>
      </div>
      <div className=" h-screen ">
        <div className="w-full flex flex-col content-center justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <h2 className=" text-primary text-7xl font-bold text-center mb-6">
              Take Control of Your Day
            </h2>
            <p className="w-[30rem] text-center text-xl">
              Taskify is your all-in-one solution for managing tasks
              efficiently. Whether you&apos;re a busy professional, a student
              with deadlines, or just someone who loves staying organized,
              Taskify is here to help.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center -mt-20 mb-52">
          <div className="flex flex-col mb-6  items-center">
            <h3 className="text-4xl mb-1 ">Key Features</h3>
            <span className="max-sm:w-1/5 w-1/2  h-1 bg-primary"></span>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {feats.map((feat, index) => (
              <li key={index}>
                <div className="card shadow-md bg-base-300 w-96">
                  <div className="card-body">
                    <div className="card-title text-primary">{index + 1}</div>
                    {feat}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-20 h-screen">
          <div className="flex flex-col mb-6  items-center">
            <h3 className="text-4xl mb-1 ">Collaborators</h3>
            <span className="max-sm:w-1/5 w-1/6  h-1 bg-primary"></span>
          </div>
          <div className="w-full mb-28">
            <div className="items-center justify-center content-center flex">
              <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {collaborators.map((collaborator, index) => (
                  <li key={index}>
                    <div className="card shadow-md bg-base-200 w-96">
                      <div className="card-body flex flex-col items-center">
                        <div className="avatar w-56 h-56 bg-base-200 rounded-full mb-5">
                          <Image
                            src={collaborator!.image!}
                            alt={collaborator.name}
                            width={500}
                            height={500}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <h4 className="text-2xl font-bold">
                          {collaborator.name}
                        </h4>
                        <p>{collaborator.position}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
