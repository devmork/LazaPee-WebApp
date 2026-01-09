import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  getCurrentUser,
  isAuthenticated,
  logOut,
} from "@/services/authService";
import { getSellerProfile } from "@/services/sellerService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Search, ShoppingCart, User, Store } from "lucide-react"; // ← Added Store icon
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon } from "./ui/input-group";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ShoppingBag } from 'lucide-react';

function Layout() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSeller, setIsSeller] = useState(false); // ← New state to track seller status
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();

  // Check if user has a seller profile on mount (only if authenticated)
  useEffect(() => {
    const checkSellerStatus = async () => {
      if (authenticated) {
        try {
          await getSellerProfile(); // This succeeds only if seller profile exists
          setIsSeller(true);
        } catch (err) {
          setIsSeller(false); // No seller profile or error
        }
      } else {
        setIsSeller(false);
      }
    };

    checkSellerStatus();
  }, [authenticated]);

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="w-full bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-3xl font-bold hover:opacity-90 transition whitespace-nowrap flex items-center gap-3">
                <ShoppingBag className="h-12 w-12 text-white drop-shadow-xl" />
                <span className="text-white">LazaPee</span>
            </Link>

           {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder="Search for products, brands and shops"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-14 pr-6 bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 rounded-60 focus:ring-4 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                />
              </div>
            </form>

            {/* Right side navigation */}
            <div className="flex items-center gap-3">
              {authenticated ? (
                <>
                  {/* Start Selling Button */}
                  <Link to="/start-selling">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-blue-100 hover:bg-blue-700">
                      Start Selling
                    </Button>
                  </Link>

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
                      {/* Seller Dashboard Link — Only shows if user is a seller */}
                      {isSeller && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => navigate("/seller/dashboard")}
                            className="font-medium text-purple-600"
                          >
                            <Store className="mr-2 h-4 w-4" />
                            <span>Seller Dashboard</span>
                          </DropdownMenuItem>
                        </>
                      )}
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
      <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
        <p className="text-sm">LazaPee © 2025</p>
      </footer>
    </div>
  );
}

export default Layout;
