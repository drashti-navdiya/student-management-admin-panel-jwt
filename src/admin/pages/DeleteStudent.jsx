import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, AlertTriangle, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import API from "../../services/api";

function DeleteStudent() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!id) return;
        if (!window.confirm(`Are you certain you wish to delete student record #${id}? This action cannot be reversed.`)) {
            return;
        }

        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await API.delete(`/students/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage(response.data?.message || `Student #${id} removed successfully.`);
            setId("");

            setTimeout(() => {
                navigate("/students");
            }, 1000);

        } catch (err) {
            console.error("Delete Error:", err);
            setError(
                err.response?.data?.message || `Unable to delete student #${id}.`
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <Trash2 className="w-6 h-6 text-red-600" />
                        Delete Student
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Permanently remove a student record from the system.
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

            {/* Danger Warning Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-amber-800">Caution</p>
                    <p className="mt-0.5 text-xs text-amber-700 leading-relaxed">
                        Deleting a student record will delete their contact, course, and enrollment records permanently.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <form onSubmit={handleDelete} className="space-y-5">
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Student ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Student ID (e.g. 1)"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            min="1"
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                        />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                        <Link
                            to="/students"
                            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-xl transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading || !id}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-500/20 transition disabled:opacity-50 cursor-pointer"
                        >
                            {isLoading ? "Deleting..." : "Delete Student"}
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default DeleteStudent;
