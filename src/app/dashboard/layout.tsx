import { DashboardHeader } from "@/components";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default DashboardLayout;
