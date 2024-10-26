import SidebarAccount from "@/features/my-account/components/sidebar";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-grow flex-col md:flex-row">
      <SidebarAccount />
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  );
}
