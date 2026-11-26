import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, LogOut, ShieldCheck, Globe } from "lucide-react";

function Header({ setSidebarOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="w-full h-18 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">

            {/* Left: Mobile Menu Toggle & Brand Indicator */}
            <div className="flex items-center gap-3">
                {/* Mobile Hamburger Toggle Button */}
                <button
                    type="button"
                    onClick={() => setSidebarOpen && setSidebarOpen(true)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition lg:hidden cursor-pointer"
                    aria-label="Open Sidebar Navigation"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Panel Active</span>
                </div>
            </div>

            {/* Right: Search, Notifications & User Profile */}
            <div className="flex items-center gap-3 sm:gap-5">

                {/* Quick Search Input */}
                <div className="relative hidden md:block w-56 lg:w-72">
                    <input
                        type="text"
                        placeholder="Search records, students..."
                        className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Public Website Shortcut */}
                <Link
                    to="/"
                    title="View Public Website"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition"
                >
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Site</span>
                </Link>

                {/* Notification Bell */}
                <button
                    type="button"
                    className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                    title="Notifications"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                <div className="h-6 w-px bg-slate-200" />

                {/* User Profile Badge */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-blue-500/20 shrink-0">
                        A
                    </div>

                    <div className="hidden sm:block text-left">
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                            Administrator
                        </p>
                        <p className="text-[10px] text-slate-400">
                            Super Admin
                        </p>
                    </div>

                    {/* Quick Logout Button */}
                    <button
                        onClick={handleLogout}
                        title="Sign Out"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-0.5 cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>

            </div>

        </header>
    );
}

export default Header;
