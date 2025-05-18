import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-8 flex justify-center space-x-8">
            <Link href="https://github.com" aria-label="GitHub" className="text-muted-foreground hover:text-cyan-400 transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter" className="text-muted-foreground hover:text-cyan-400 transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="https://linkedin.com" aria-label="LinkedIn" className="text-muted-foreground hover:text-cyan-400 transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="mailto:contact@example.com" aria-label="Email" className="text-muted-foreground hover:text-cyan-400 transition-colors">
              <Mail className="h-6 w-6" />
            </Link>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MyProfilCookie. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}