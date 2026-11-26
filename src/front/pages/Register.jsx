import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Lock,
    Eye,
    EyeOff,
    UserPlus,
    ArrowRight,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";

import API from "../../services/api";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!agreeTerms) {
            setError("Please accept the Terms of Service.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await API.post("/auth/register", {
                username,
                password
            });

            setSuccessMessage(
                response.data?.message || "Account created successfully!"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Registration failed. Username might already exist."
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-14">
                {/* Heading */}
                <div className="mb-8">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                        <UserPlus size={24} />
                    </div>

                    <p className="text-xs font-bold tracking-widest text-blue-600 mb-2">
                        GET STARTED
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900">
                        Create an Account
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                        Enter your details to create your administrator account.
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Success */}
                {successMessage && (
                    <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-0">

                    {/* Username */}
                    <div className="pb-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Username <span className="text-red-500">*</span>
                        </label>

                        <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition">
                            <User size={19} className="text-slate-400 shrink-0" />

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                                className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="pb-5">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>

                        <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition">
                            <Lock size={19} className="text-slate-400 shrink-0" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-slate-400 hover:text-blue-600 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="pb-5">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>

                        <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition">
                            <Lock size={19} className="text-slate-400 shrink-0" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="pb-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="w-4 h-4 mt-1 accent-blue-600"
                            />

                            <span className="text-xs text-slate-500 leading-6">
                                I agree to the Terms of Service and Privacy Policy.
                            </span>
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 transition disabled:opacity-60 cursor-pointer"
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                        {!isLoading && <ArrowRight size={18} />}
                    </button>

                </form>

                {/* Login Link */}
                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Security */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={15} />
                    Protected with JWT Authentication
                </div>

            </div>
        </div>
    );
}

export default Register;