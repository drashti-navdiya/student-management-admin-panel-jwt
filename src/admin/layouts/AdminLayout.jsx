import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans">

            {/* Responsive Sidebar (Desktop Static + Mobile Drawer) */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Header Navbar */}
                <Header setSidebarOpen={setSidebarOpen} />

                {/* Page Body Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;
