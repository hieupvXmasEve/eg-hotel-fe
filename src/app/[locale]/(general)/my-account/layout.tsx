import SidebarAccount from "@/features/my-account/components/sidebar";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-grow flex-col gap-4 md:flex-row md:gap-6">
      <SidebarAccount />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
