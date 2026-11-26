import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Edit3, Search, User, Mail, MapPin, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import API from "../../services/api";

function UpdateStudent() {
    const location = useLocation();
    const navigate = useNavigate();

    const initialStudent = location.state?.student;
    const initialId = location.state?.id || initialStudent?.id || initialStudent?._id || "";

    const [id, setId] = useState(() => String(initialId || ""));
    const [name, setName] = useState(() => initialStudent?.name || "");
    const [email, setEmail] = useState(() => initialStudent?.email || "");
    const [city, setCity] = useState(() => initialStudent?.city || "");
    const [studentFound, setStudentFound] = useState(() => Boolean(initialStudent));
    const [message, setMessage] = useState(() => initialStudent ? "Student details loaded from selection." : "");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Auto-fetch if only ID was passed without full student details
    useEffect(() => {
        let isMounted = true;
        const targetId = location.state?.id;

        if (targetId && !location.state?.student) {
            const loadStudent = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await API.get(`/students/${targetId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const student = response.data?.data || response.data;
                    if (isMounted && student) {
                        setName(student.name || "");
                        setEmail(student.email || "");
                        setCity(student.city || "");
                        setStudentFound(true);
                        setMessage("Student details loaded successfully.");
                    }
                } catch (err) {
                    console.error("Auto Search Error:", err);
                    if (isMounted) {
                        setStudentFound(false);
                        setError(err.response?.data?.message || `Unable to find student #${targetId}.`);
                    }
                }
            };

            loadStudent();
        }

        return () => {
            isMounted = false;
        };
    }, [location.state?.id, location.state?.student]);

    // Manual fetch student by ID button
    const handleSearchClick = async () => {
        if (!id) return;

        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");
            const response = await API.get(`/students/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const student = response.data?.data || response.data;
            if (student) {
                setName(student.name || "");
                setEmail(student.email || "");
                setCity(student.city || "");
                setStudentFound(true);
                setMessage("Student details loaded successfully.");
            } else {
                setStudentFound(false);
                setError("No record found with this ID.");
            }

        } catch (err) {
            console.error("Search Error:", err);
            setStudentFound(false);
            setError(
                err.response?.data?.message || `Unable to find student #${id}.`
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Update student
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");
            const response = await API.put(
                `/students/${id}`,
                { name, email, city },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data?.message || "Student updated successfully!");
            setTimeout(() => {
                navigate("/students");
            }, 1000);

        } catch (err) {
            console.error("Update Error:", err);
            setError(
                err.response?.data?.message || "Unable to update student."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <Edit3 className="w-6 h-6 text-blue-600" />
                        Update Student Record
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Find a student by ID to inspect and modify their information.
                    </p>
                </div>

                <Link
                    to="/students"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to List
                </Link>
            </div>

            {/* Notifications */}
            {message && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{message}</span>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Step 1: ID Search Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Enter Student ID to Edit
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        placeholder="e.g. 1, 2, 3..."
                        value={id}
                        onChange={(e) => {
                            setId(e.target.value);
                            setStudentFound(false);
                            setMessage("");
                            setError("");
                        }}
                        className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    />
                    <button
                        type="button"
                        onClick={handleSearchClick}
                        disabled={!id || isLoading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                        <Search className="w-4 h-4" />
                        <span>Find Student</span>
                    </button>
                </div>
            </div>

            {/* Step 2: Edit Form Card */}
            {studentFound && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 animate-in fade-in duration-300">
                    <div className="border-b border-slate-100 pb-4 mb-5">
                        <h2 className="text-base font-bold text-slate-800">
                            Editing Student #{id}
                        </h2>
                        <p className="text-xs text-slate-500">
                            Modify the fields below and click save to commit changes.
                        </p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-11 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                                />
                                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-11 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                                />
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                City / Region <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-11 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                                />
                                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="pt-3 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setStudentFound(false)}
                                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition disabled:opacity-60 cursor-pointer"
                            >
                                {isLoading ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}

export default UpdateStudent;
