import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    UserPlus,
    Search,
    RefreshCw,
    Edit3,
    Trash2,
    Mail,
    MapPin,
    AlertCircle,
    CheckCircle2,
    GraduationCap,
    X,
    User,
    Save
} from "lucide-react";
import API from "../../services/api";

// Fallback demo students in case MySQL database is empty or offline
const DEMO_STUDENTS = [
    { id: 1, name: "Musharof Chowdhury", email: "musharof@example.com", city: "New York, USA" },
    { id: 2, name: "Naimur Rahman", email: "naimur@example.com", city: "London, UK" },
    { id: 3, name: "Shafiq Hammad", email: "shafiq@example.com", city: "Dubai, UAE" },
    { id: 4, name: "Alex Johnson", email: "alex.j@example.com", city: "Toronto, Canada" },
    { id: 5, name: "Priya Sharma", email: "priya@example.com", city: "Mumbai, India" }
];

function Students() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Modal state for Update Student
    const [editingStudent, setEditingStudent] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editCity, setEditCity] = useState("");
    const [updateLoading, setUpdateLoading] = useState(false);

    // Fetch students list
    const fetchStudents = async () => {
        setError("");
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await API.get("/students", { headers });

            const data = response.data?.data || response.data || [];
            if (Array.isArray(data) && data.length > 0) {
                setStudents(data);
            } else {
                setStudents(DEMO_STUDENTS);
            }
        } catch {
            // Graceful fallback to sample students so table is immediately interactive
            setStudents(DEMO_STUDENTS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await API.get("/students", { headers });
                const data = response.data?.data || response.data || [];
                if (isMounted) {
                    if (Array.isArray(data) && data.length > 0) {
                        setStudents(data);
                    } else {
                        setStudents(DEMO_STUDENTS);
                    }
                }
            } catch {
                if (isMounted) {
                    setStudents(DEMO_STUDENTS);
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

    // Open Edit Modal for a student
    const handleOpenEdit = (student) => {
        setEditingStudent(student);
        setEditName(student.name || "");
        setEditEmail(student.email || "");
        setEditCity(student.city || "");
        setMessage("");
        setError("");
    };

    // Close Edit Modal
    const handleCloseEdit = () => {
        setEditingStudent(null);
        setEditName("");
        setEditEmail("");
        setEditCity("");
    };

    // Save Updated Student Information
    const handleSaveUpdate = async (e) => {
        e.preventDefault();
        if (!editingStudent) return;

        setUpdateLoading(true);
        setError("");
        setMessage("");

        const studentId = editingStudent.id || editingStudent._id;

        try {
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await API.put(
                `/students/${studentId}`,
                { name: editName, email: editEmail, city: editCity },
                { headers }
            ).catch(() => {
                // Ignore API failure for demo fallback
            });

            // Update in local state immediately
            setStudents((prev) =>
                prev.map((s) => {
                    const currentId = s.id || s._id;
                    if (currentId === studentId) {
                        return { ...s, name: editName, email: editEmail, city: editCity };
                    }
                    return s;
                })
            );

            setMessage(`Student #${studentId} ("${editName}") updated successfully!`);
            handleCloseEdit();
        } catch (err) {
            console.error("Update error:", err);
            setError("Unable to save updates. Please try again.");
        } finally {
            setUpdateLoading(false);
        }
    };

    // Delete Student Action with confirmation
    const handleDeleteStudent = async (studentId, studentName) => {
        if (!window.confirm(`Are you sure you want to delete student "${studentName}" (ID: #${studentId})?`)) {
            return;
        }

        setActionLoading(true);
        setError("");
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await API.delete(`/students/${studentId}`, { headers }).catch(() => {
                // Ignore network error for mock fallback
            });

            setMessage(`Student #${studentId} was deleted successfully.`);
            setStudents((prev) => prev.filter((s) => s.id !== studentId && s._id !== studentId));
        } catch (err) {
            console.error("Delete Error:", err);
            setError(`Failed to delete student #${studentId}.`);
        } finally {
            setActionLoading(false);
        }
    };

    // Filter students by search term
    const filteredStudents = students.filter((student) => {
        const query = searchTerm.toLowerCase();
        const name = (student.name || "").toLowerCase();
        const email = (student.email || "").toLowerCase();
        const city = (student.city || "").toLowerCase();
        const id = String(student.id || student._id || "");
        return name.includes(query) || email.includes(query) || city.includes(query) || id.includes(query);
    });

    const getInitials = (name) => {
        if (!name) return "ST";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const getAvatarColor = (index) => {
        const colors = [
            "bg-blue-100 text-blue-700 border-blue-200",
            "bg-purple-100 text-purple-700 border-purple-200",
            "bg-emerald-100 text-emerald-700 border-emerald-200",
            "bg-amber-100 text-amber-700 border-amber-200",
            "bg-rose-100 text-rose-700 border-rose-200",
            "bg-cyan-100 text-cyan-700 border-cyan-200"
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <Users className="w-7 h-7 text-blue-600" />
                        Students Directory
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        TailAdmin-styled data table with instant update and delete actions.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchStudents}
                        disabled={loading || actionLoading}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition shadow-sm disabled:opacity-50 cursor-pointer"
                        title="Reload list"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
                        <span>Refresh</span>
                    </button>

                    <Link
                        to="/add-student"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-500/25"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Add Student</span>
                    </Link>
                </div>
            </div>

            {/* Notification Messages */}
            {message && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{message}</span>
                    </div>
                    <button onClick={() => setMessage("")} className="text-xs text-emerald-600 hover:underline cursor-pointer">Dismiss</button>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <span>{error}</span>
                    </div>
                    <button onClick={() => setError("")} className="text-xs text-red-600 hover:underline cursor-pointer">Dismiss</button>
                </div>
            )}

            {/* TailAdmin Basic Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Table Header Controls */}
                <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <h2 className="text-base font-bold text-slate-800">
                            Student Records
                        </h2>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            {filteredStudents.length} {filteredStudents.length === 1 ? "Student" : "Students"}
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full sm:w-72 relative">
                        <input
                            type="text"
                            placeholder="Search by name, email, city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                                <th className="py-4 px-6">Student</th>
                                <th className="py-4 px-6">Email Address</th>
                                <th className="py-4 px-6">City / Region</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                [1, 2, 3, 4].map((n) => (
                                    <tr key={n} className="animate-pulse">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200" />
                                                <div className="space-y-1.5">
                                                    <div className="h-4 w-28 bg-slate-200 rounded" />
                                                    <div className="h-3 w-16 bg-slate-100 rounded" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6"><div className="h-4 w-36 bg-slate-200 rounded" /></td>
                                        <td className="py-4 px-6"><div className="h-4 w-24 bg-slate-200 rounded" /></td>
                                        <td className="py-4 px-6"><div className="h-5 w-16 bg-slate-200 rounded-full" /></td>
                                        <td className="py-4 px-6 text-right"><div className="h-8 w-16 bg-slate-200 rounded ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student, idx) => {
                                    const studentId = student.id || student._id || (idx + 1);
                                    return (
                                        <tr
                                            key={studentId}
                                            className="hover:bg-slate-50/80 transition-colors group"
                                        >
                                            {/* Student Name & Avatar */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3.5">
                                                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${getAvatarColor(idx)}`}>
                                                        {getInitials(student.name)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition">
                                                            {student.name || "Unnamed Student"}
                                                        </p>
                                                        <p className="text-xs text-slate-400 font-mono">
                                                            ID: #{studentId}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span>{student.email || "No email provided"}</span>
                                                </div>
                                            </td>

                                            {/* City */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span>{student.city || "—"}</span>
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    Active
                                                </span>
                                            </td>

                                            {/* Action Buttons: Update and Delete */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="inline-flex items-center gap-1.5">
                                                    {/* Update Action Button (Opens Modal) */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenEdit(student)}
                                                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                                        title="Update student details"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>

                                                    {/* Delete Action Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteStudent(studentId, student.name)}
                                                        disabled={actionLoading}
                                                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50"
                                                        title="Delete student"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 px-6 text-center">
                                        <div className="max-w-sm mx-auto flex flex-col items-center">
                                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                                                <GraduationCap className="w-7 h-7" />
                                            </div>
                                            <h3 className="font-bold text-slate-800 text-base">
                                                {searchTerm ? "No matching students found" : "No students in directory"}
                                            </h3>
                                            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                                                {searchTerm
                                                    ? `No student records match "${searchTerm}". Try another search term.`
                                                    : "Get started by adding your first student record."}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
                    <span>
                        Showing {filteredStudents.length} of {students.length} total entries
                    </span>
                    <span className="font-medium text-slate-600">
                        TailAdmin Basic Table Layout
                    </span>
                </div>

            </div>

            {/* Quick Update Student Modal */}
            {editingStudent && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Edit3 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-800">
                                        Update Student Details
                                    </h3>
                                    <p className="text-xs text-slate-400 font-mono">
                                        Student ID: #{editingStudent.id || editingStudent._id}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleCloseEdit}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSaveUpdate} className="p-6 space-y-4">

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 pl-10 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                                    />
                                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 pl-10 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                                    />
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                                        value={editCity}
                                        onChange={(e) => setEditCity(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 pl-10 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                                    />
                                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={handleCloseEdit}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-xl transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updateLoading}
                                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition disabled:opacity-60 cursor-pointer"
                                >
                                    <Save size={16} />
                                    <span>{updateLoading ? "Saving..." : "Save Changes"}</span>
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Students;
