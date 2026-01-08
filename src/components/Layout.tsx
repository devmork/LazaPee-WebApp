import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SignUp from "@/pages/SignUp";

const Layout = () => {
  const [signUpOpen, setSignUpOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50">
        {/* Header/Navigation */}
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-2xl font-bold hover:text-blue-100 transition">
                LazaPee
              </Link>
              <div className="flex gap-2">
                <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
                  <DialogTrigger asChild>
                    <Button>Register</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <SignUp onSuccess={() => setSignUpOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 mt-12">
          <p className="text-sm">LazaPee © 2025</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
