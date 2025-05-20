export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          {/* //Navbar */}
        </header>

        <main className="flex-1 overflow-auto p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
