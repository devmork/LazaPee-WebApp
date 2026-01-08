import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  getCurrentUser,
  isAuthenticated,
  logOut,
} from "@/services/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon } from "./ui/input-group";
import { Avatar, AvatarFallback } from "./ui/avatar";

function Layout() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
  };

  const getUserInitials = () => {
    if (!currentUser?.userName) return "U";
    return currentUser.userName.charAt(0).toUpperCase();
  };

  return (
    <div className="max-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold hover:text-blue-100 transition whitespace-nowrap">
              LazaPee
            </Link>

            {/* Search Bar*/}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search for products, brands and shops"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-gray-900"
                />
                <InputGroupAddon>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-full bg-blue-700 hover:bg-blue-800">
                    <Search className="h-4 w-4" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </form>

            {/* Right side navigation */}
            <div className="flex items-center gap-3">
              {authenticated ? (
                <>
                  {/* Start Selling Button */}
                  <Button
                    variant="ghost"
                    className="text-white hover:text-blue-100 hover:bg-blue-700">
                    Start Selling
                  </Button>

                  {/* Cart */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-white hover:text-blue-100 hover:bg-blue-700">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </Button>

                  {/* User Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full">
                        <Avatar>
                          <AvatarFallback className="bg-blue-800 text-white">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {currentUser?.userName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {currentUser?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>My Account</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/orders")}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <span className="text-red-600">Log Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Login & Register buttons (shown when not authenticated) */}
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="bg-white text-blue-600">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">LazaPee © 2025</p>
      </footer>
    </div>
  );
}

export default Layout;
