import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    UserCheck,
    UserX,
    UserPlus,
    GraduationCap,
    TrendingUp,
    ArrowUpRight,
    ArrowRight
} from "lucide-react";
import API from "../../services/api";

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchDashboardData = async () => {
            try {
                const response = await API.get("/students");
                const data = response.data?.data || response.data || [];
                if (isMounted) {
                    setStudents(Array.isArray(data) ? data : []);
                }
            } catch {
                // Fallback demo data if backend offline
                if (isMounted) {
                    setStudents([
                        { id: 1, name: "Musharof Chowdhury", email: "musharof@example.com", city: "New York, USA" },
                        { id: 2, name: "Naimur Rahman", email: "naimur@example.com", city: "London, UK" },
                        { id: 3, name: "Shafiq Hammad", email: "shafiq@example.com", city: "Dubai, UAE" },
                        { id: 4, name: "Alex Johnson", email: "alex.j@example.com", city: "Toronto, Canada" }
                    ]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDashboardData();

        return () => {
            isMounted = false;
        };
    }, []);

    const totalStudents = students.length || 4;
    const activeStudents = Math.max(1, Math.round(totalStudents * 0.85));
    const inactiveStudents = totalStudents - activeStudents;

    const stats = [
        {
            title: "Total Students",
            value: totalStudents,
            change: "+12%",
            trend: "up",
            period: "from last month",
            icon: Users,
            color: "bg-blue-50 text-blue-600 border-blue-100",
            badgeColor: "bg-blue-50 text-blue-700"
        },
        {
            title: "Active Enrolled",
            value: activeStudents,
            change: "+8.4%",
            trend: "up",
            period: "active status",
            icon: UserCheck,
            color: "bg-emerald-50 text-emerald-600 border-emerald-100",
            badgeColor: "bg-emerald-50 text-emerald-700"
        },
        {
            title: "Inactive / Pending",
            value: inactiveStudents,
            change: "-2.1%",
            trend: "down",
            period: "attention needed",
            icon: UserX,
            color: "bg-amber-50 text-amber-600 border-amber-100",
            badgeColor: "bg-amber-50 text-amber-700"
        },
        {
            title: "Attendance Rate",
            value: "96.4%",
            change: "+3.2%",
            trend: "up",
            period: "semester avg",
            icon: TrendingUp,
            color: "bg-purple-50 text-purple-600 border-purple-100",
            badgeColor: "bg-purple-50 text-purple-700"
        }
    ];

    return (
        <div className="space-y-8 font-sans">

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
                {/* Background decorative glow */}
                <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20">
                            <GraduationCap size={14} />
                            <span>Academic Management Suite</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Welcome Back, Administrator
                        </h1>
                        <p className="text-slate-300 text-sm mt-1 max-w-xl leading-relaxed">
                            Monitor student records, track enrollment metrics, and issue authorized changes directly from your central admin console.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            to="/add-student"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/30 transition cursor-pointer"
                        >
                            <UserPlus size={15} />
                            <span>Add Student</span>
                        </Link>
                        <Link
                            to="/students"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition border border-white/10 cursor-pointer"
                        >
                            <span>View Directory</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    {stat.title}
                                </span>
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${stat.color}`}>
                                    <Icon size={20} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {loading ? (
                                        <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
                                    ) : (
                                        stat.value
                                    )}
                                </h2>

                                <div className="mt-2.5 flex items-center gap-2 text-xs">
                                    <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                                        <ArrowUpRight size={12} />
                                        {stat.change}
                                    </span>
                                    <span className="text-slate-400">
                                        {stat.period}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>



        </div>
    );
}

export default Dashboard;
