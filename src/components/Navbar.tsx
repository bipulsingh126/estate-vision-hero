
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Updated navigation to include protected property
const navigation = [
  { name: "Home", href: "/", id: "home", protected: false },
  { name: "Properties", href: "/properties", id: "properties", protected: false },
  { name: "Agents", href: "/agents", id: "agents", protected: false },
  { name: "Meet Our Experts", href: "/meet-experts", id: "meet-experts", protected: false },
  { name: "About", href: "/about", id: "about", protected: false },
  { name: "Contact", href: "/contact", id: "contact", protected: false },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b glass-effect">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link to="/" key="logo-desktop" className="flex items-center font-semibold">
          {siteConfig.name}
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4">
            {navigation.map((item) => {
              // Only show protected routes if authenticated
              if (item.protected && !isAuthenticated) {
                return null;
              }
              
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.name && <p className="font-medium">{user.name}</p>}
                      {user?.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/properties">My Properties</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-500 cursor-pointer" 
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="sm:w-64" 
            title="Navigation Menu" 
            description="Main navigation for EstateVision website"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <Link to="/" key="logo-mobile" className="flex items-center font-semibold p-4">
                  {siteConfig.name}
                </Link>
                <nav className="flex flex-col gap-4 p-4">
                  {navigation.map((item) => {
                    // Only show protected routes if authenticated
                    if (item.protected && !isAuthenticated) {
                      return null;
                    }
                    
                    return (
                      <Link
                        key={item.id}
                        to={item.href}
                        className="text-sm font-medium transition-colors hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  
                  {isAuthenticated ? (
                    <>
                      <div className="border-t pt-4 mt-2">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-10 w-10 mr-2">
                            <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          className="text-sm font-medium transition-colors hover:text-primary block mb-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Button 
                          variant="ghost" 
                          className="text-sm font-medium text-red-500 p-0 h-auto" 
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t pt-4 mt-2">
                      <div className="flex flex-col gap-2">
                        <Button asChild>
                          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                            Login
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                            Register
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </nav>
              </div>
              <div className="p-4">
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
