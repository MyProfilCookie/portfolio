"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Home, Code, CreditCard, Mail, Github, Linkedin, Twitter, User, LogOut, Settings } from "lucide-react";
import AstronautIcon from "./astronaut-icon";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Vérifier si l'utilisateur est connecté
    const checkAuth = () => {
      const isAdmin = document.cookie.includes('isAdmin=true');
      setIsLoggedIn(isAdmin);
    };

    window.addEventListener("scroll", handleScroll);
    checkAuth();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Supprimer le cookie
    document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    router.push('/');
  };

  const navItems = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Projets", href: "/projects", icon: Code },
    { name: "Tarifs", href: "/tarifs", icon: CreditCard },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/MyProfilCookie", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/yourprofile", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/yourprofile", icon: Twitter },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-black/95 backdrop-blur-2xl shadow-2xl shadow-cyan-500/40 border-b border-cyan-500/40"
          : "shadow-lg shadow-cyan-500/20 border-b border-cyan-500/20"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <AstronautIcon className="w-6 h-6" page="home" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                MyProfilCookie
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center space-x-2 transition-colors ${isActive(item.href)
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="relative">
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transition-transform duration-300 ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                </span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors">
                  <Avatar className="h-8 w-8 bg-gray-800">
                    <AvatarImage src="/avatar-placeholder.png" alt="Avatar" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signin" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Connexion
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive(item.href)
                ? "text-cyan-400 bg-cyan-400/10"
                : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          {!isLoggedIn && (
            <Link
              href="/auth/signin"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>Connexion</span>
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </>
          )}
          <div className="flex items-center justify-center space-x-4 pt-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}