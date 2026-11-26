import { GraduationCap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <span className="text-base font-bold text-white tracking-tight">
                                StudentPortal
                            </span>
                            <p className="text-xs text-slate-400">
                                Public Student Directory & Academic Roster
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-xs font-medium">
                        <Link to="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <a href="#students" className="hover:text-white transition-colors">
                            Directory
                        </a>
                        <Link to="/login" className="hover:text-white transition-colors flex items-center gap-1.5 text-blue-400">
                            <Shield size={14} />
                            Admin Suite
                        </Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} StudentPortal. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
