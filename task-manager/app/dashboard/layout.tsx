import SideBar from "@/components/SideBar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-2 p-5">
      <SideBar />
      <div className="sm:card w-full h-[96vh] sm:bg-base-300 sm:border sm:border-stone-700 sm:shadow-2xl p-5 sm:overflow-hidden sm:hover:overflow-y-scroll">
        {children}
      </div>
    </section>
  );
}
