import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Mail,
    MapPin,
    RotateCw,
    Users,
    GraduationCap,
    ArrowRight,
    Shield,
    Info
} from "lucide-react";
import API from "../../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Fallback demo students in case backend server is offline or empty
const DEMO_STUDENTS = [
    { id: 1, name: "Musharof Chowdhury", email: "musharof@example.com", city: "New York, USA" },
    { id: 2, name: "Naimur Rahman", email: "naimur@example.com", city: "London, UK" },
    { id: 3, name: "Shafiq Hammad", email: "shafiq@example.com", city: "Dubai, UAE" },
    { id: 4, name: "Alex Johnson", email: "alex.j@example.com", city: "Toronto, Canada" },
    { id: 5, name: "Priya Sharma", email: "priya@example.com", city: "Mumbai, India" },
    { id: 6, name: "Lucas Vance", email: "lucas@example.com", city: "Sydney, Australia" }
];

function Home() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDemo, setIsDemo] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchStudents = async () => {
        setLoading(true);

        try {
            const response = await API.get("/students");
            const data = response.data?.data || response.data || [];
            if (Array.isArray(data) && data.length > 0) {
                setStudents(data);
                setIsDemo(false);
            } else {
                setStudents(DEMO_STUDENTS);
                setIsDemo(true);
            }
        } catch {
            // Graceful fallback to demo data if backend connection fails
            setStudents(DEMO_STUDENTS);
            setIsDemo(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            try {
                const response = await API.get("/students");
                const data = response.data?.data || response.data || [];
                if (isMounted) {
                    if (Array.isArray(data) && data.length > 0) {
                        setStudents(data);
                        setIsDemo(false);
                    } else {
                        setStudents(DEMO_STUDENTS);
                        setIsDemo(true);
                    }
                }
            } catch {
                if (isMounted) {
                    setStudents(DEMO_STUDENTS);
                    setIsDemo(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, []);

    // Filter students by name, email, or city
    const filteredStudents = students.filter((student) => {
        const query = searchTerm.toLowerCase();
        const name = (student.name || "").toLowerCase();
        const email = (student.email || "").toLowerCase();
        const city = (student.city || "").toLowerCase();
        return name.includes(query) || email.includes(query) || city.includes(query);
    });

    // Helper for initials
    const getInitials = (name) => {
        if (!name) return "ST";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    // Color palette for profile avatars
    const getAvatarTheme = (index) => {
        const themes = [
            { bg: "bg-blue-500", light: "bg-blue-50 text-blue-700 border-blue-200" },
            { bg: "bg-purple-500", light: "bg-purple-50 text-purple-700 border-purple-200" },
            { bg: "bg-emerald-500", light: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { bg: "bg-amber-500", light: "bg-amber-50 text-amber-700 border-amber-200" },
            { bg: "bg-rose-500", light: "bg-rose-50 text-rose-700 border-rose-200" },
            { bg: "bg-indigo-500", light: "bg-indigo-50 text-indigo-700 border-indigo-200" }
        ];
        return themes[index % themes.length];
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
            {/* Top Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/60 py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100/70 text-blue-800 border border-blue-200 mb-6 shadow-2xs">
                        <GraduationCap size={15} className="text-blue-600" />
                        <span>Public Directory & Community</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
                        Meet Our <span className="text-blue-600">Students</span> & Scholars
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Welcome to our public student directory. Browse student profiles, verify enrolled members, and discover scholars across various cities.
                    </p>

                    {/* Search Bar in Hero */}
                    <div className="mt-8 sm:mt-10 max-w-xl mx-auto">
                        <div className="relative flex items-center shadow-lg shadow-slate-200/50 rounded-2xl bg-white border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition">
                            <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base text-slate-800 bg-transparent outline-none placeholder:text-slate-400 rounded-2xl"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mr-3 px-2.5 py-1 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Banner */}
                    {/* <div className="mt-8 flex items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isDemo ? "bg-amber-500" : "bg-emerald-500"}`} />
                            <span>{isDemo ? "Sample Roster Preview" : "Live MySQL Public Data"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-blue-600" />
                            <span>
                                {students.length} {students.length === 1 ? "Student Enrolled" : "Students Enrolled"}
                            </span>
                        </div>
                    </div> */}

                </div>
            </section>

            {/* Students Showcase Section */}
            <main id="students" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">

                {/* Notice if Backend is Offline (Subtle, Friendly) */}
                {isDemo && (
                    <div className="mb-8 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-blue-900 text-xs sm:text-sm flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <Info size={18} className="text-blue-600 shrink-0" />
                            <span>Showing sample student cards. Connect your backend server on port 3000 to stream live database records.</span>
                        </div>
                        <button
                            onClick={fetchStudents}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shrink-0 cursor-pointer"
                        >
                            <RotateCw size={12} className={loading ? "animate-spin" : ""} />
                            <span>Retry Live</span>
                        </button>
                    </div>
                )}

                {/* Section Header */}
                {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-slate-200/80">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Enrolled Students
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {searchTerm
                                ? `Showing search results for "${searchTerm}"`
                                : "List of all active student profiles"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchStudents}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-2xs disabled:opacity-50 cursor-pointer"
                        >
                            <RotateCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div> */}

                {/* State 1: Loading Skeleton Grid */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs animate-pulse space-y-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-200 shrink-0" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                                        <div className="h-3 w-1/2 bg-slate-100 rounded" />
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                                    <div className="h-3 w-5/6 bg-slate-100 rounded" />
                                    <div className="h-3 w-2/3 bg-slate-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* State 2: Empty State (No Students Found) */}
                {!loading && filteredStudents.length === 0 && (
                    <div className="max-w-md mx-auto my-12 text-center p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                            <Users size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">
                            {searchTerm ? "No Matching Students" : "No Students Listed"}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                            {searchTerm
                                ? `No students matched the query "${searchTerm}". Try checking for spelling or search another city.`
                                : "There are currently no student records available in the directory."}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-5 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                            >
                                Reset Search Filter
                            </button>
                        )}
                    </div>
                )}

                {/* State 3: Responsive Student Card Grid (Blog Card Style) */}
                {!loading && filteredStudents.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredStudents.map((student, idx) => {
                            const theme = getAvatarTheme(idx);
                            const studentId = student.id || student._id || idx + 1;

                            return (
                                <article
                                    key={studentId}
                                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    {/* Top Card Info */}
                                    <div>
                                        {/* Avatar & Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            {/* Vibrant Initials Avatar */}
                                            <div
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg text-white shadow-md shrink-0 ${theme.bg}`}
                                            >
                                                {getInitials(student.name)}
                                            </div>

                                            {/* Name & ID Badge */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[11px] font-mono text-slate-400">
                                                        #{studentId}
                                                    </span>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        Enrolled
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate mt-0.5">
                                                    {student.name || "Unnamed Student"}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Student Details with Icons */}
                                        <div className="space-y-2.5 pt-3 border-t border-slate-100 text-sm">

                                            {/* Email */}
                                            <div className="flex items-center gap-2.5 text-slate-600">
                                                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                                                    <Mail size={14} />
                                                </div>
                                                <a
                                                    href={`mailto:${student.email}`}
                                                    className="truncate hover:text-blue-600 hover:underline transition-colors"
                                                    title={student.email}
                                                >
                                                    {student.email || "No email listed"}
                                                </a>
                                            </div>

                                            {/* City */}
                                            <div className="flex items-center gap-2.5 text-slate-600">
                                                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                                                    <MapPin size={14} />
                                                </div>
                                                <span className="truncate">
                                                    {student.city || "Location unspecified"}
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Bottom Card Footer */}
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                        <span className="font-medium text-slate-500">
                                            Active Academic Profile
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                                            <span>Verified</span>
                                            <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

            </main>

            {/* About / Informational CTA Section */}
            <section id="about" className="bg-white border-t border-slate-200/80 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl text-center md:text-left">
                            <span className="text-xs font-bold tracking-widest text-blue-200 uppercase">
                                For Administrators & Faculty
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                                Need to manage student registrations or update records?
                            </h2>
                            <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
                                Authorized staff can log in to the secure Admin Panel to add new students, edit existing entries, or manage full academic records.
                            </p>
                        </div>

                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-black/10 transition-all shrink-0"
                        >
                            <Shield size={18} />
                            <span>Access Admin Panel</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;
