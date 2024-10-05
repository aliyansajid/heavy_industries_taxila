import Sidebar from "@/components/Sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="lg:hidden bg-background-secondary p-4 shadow-md space-y-4">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-medium">HIT</h1>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
