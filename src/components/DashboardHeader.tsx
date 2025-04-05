import Image from "next/image";

const DashboardHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-20 flex justify-center items-center gap-8 border-b">
      <ul className="flex gap-8">
        <li>PROFILE</li>
        <li>MEMBERS</li>
      </ul>
      <Image src="/logo.svg" alt="logo" width={80} height={50} />
      <ul className="flex gap-8">
        <li>EVENTS</li>
        <li>CONTACT</li>
      </ul>
    </header>
  );
};

export default DashboardHeader;
