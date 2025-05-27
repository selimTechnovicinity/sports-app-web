export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          {/* //Navbar */}
        </header>

        <main className="flex-1 overflow-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
