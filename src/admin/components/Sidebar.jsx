import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    LogOut,
    ShieldCheck,
    X
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Students List",
            path: "/students",
            icon: Users
        },
        // {
        //     name: "Add Student",
        //     path: "/add-student",
        //     icon: UserPlus
        // }
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleLinkClick = () => {
        if (setSidebarOpen) {
            setSidebarOpen(false);
        }
    };

    const sidebarContent = (
        <div className="flex flex-col justify-between h-full p-5 bg-slate-900 text-slate-300">
            {/* Top Section */}
            <div>
                {/* Brand Logo & Mobile Close */}
                <div className="flex items-center justify-between px-2 py-3 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-white shrink-0">
                            <GraduationCap size={22} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                                AdminPanel
                            </h1>
                            <span className="text-[11px] text-blue-400 font-semibold tracking-wider uppercase">
                                Management Suite
                            </span>
                        </div>
                    </div>

                    {/* Mobile Close Button */}
                    {setSidebarOpen && (
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Section Title */}
                <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Main Menu
                </p>

                {/* Nav Links */}
                <nav className="space-y-1.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={handleLinkClick}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="px-3 py-2.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
                    <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                    <span>JWT Auth Secure Session</span>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Static Sidebar (lg and above) */}
            <aside className="hidden lg:block w-64 min-h-screen shrink-0 border-r border-slate-800">
                {sidebarContent}
            </aside>

            {/* Mobile Slide-Out Drawer with Backdrop */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    {/* Dark Backdrop Overlay */}
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <aside className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
                        {sidebarContent}
                    </aside>
                </div>
            )}
        </>
    );
}

export default Sidebar;
