import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

function Layout() {
  return (
    <div className="flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold hover:text-blue-100 transition">
              LazaPee
            </Link>
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" className="bg-white text-blue-600">
                  Log In
                </Button>
              </Link>

              <Link to="/signup">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">LazaPee © 2025</p>
      </footer>
    </div>
  );
}

export default Layout;
