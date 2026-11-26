import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, LogIn, Menu, X, Shield } from "lucide-react";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18">
                    
                    {/* Brand Logo & Title */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                            <GraduationCap size={22} />
                        </div>
                        <div>
                            <span className="text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                                StudentPortal
                            </span>
                            <span className="block text-[11px] font-medium text-slate-500">
                                Public Directory
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1"
                        >
                            Home
                        </Link>
                        <a
                            href="#students"
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Students Directory
                        </a>
                        <a
                            href="#about"
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            About
                        </a>
                    </nav>

                    {/* Desktop Right Action: Admin Login */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all shadow-xs"
                        >
                            <Shield size={16} className="text-blue-600" />
                            <span>Admin Login</span>
                            <LogIn size={15} className="text-slate-400" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50"
                    >
                        Home
                    </Link>
                    <a
                        href="#students"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Students Directory
                    </a>
                    <a
                        href="#about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        About
                    </a>
                    <div className="pt-2 border-t border-slate-100">
                        <Link
                            to="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                        >
                            <Shield size={16} />
                            <span>Admin Login</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
