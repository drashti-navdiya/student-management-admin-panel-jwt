import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";
import API from "../../services/api";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        try {
            const response = await API.post("/auth/login", {
                username,
                password
            });

            // Store JWT token
            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
            }

            setSuccessMessage("Login successful! Redirecting to dashboard...");

            setTimeout(() => {
                navigate("/dashboard");
            }, 800);

        } catch (err) {
            console.error("Login Error:", err);
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Invalid credentials. Please verify and try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

            {/* Centered White Card (Single Column) */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12">

                {/* Back to Home Link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={14} />
                    <span>Back to Public Website</span>
                </Link>

                {/* Heading */}
                <div className="mb-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                        <LogIn size={24} />
                    </div>

                    <p className="text-xs font-bold tracking-widest text-blue-600 mb-2 uppercase">
                        WELCOME BACK
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900">
                        Login
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                        Enter your credentials to access your administrator account.
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

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Username */}
                    <div className="pb-3">
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
                    <div className="pb-3">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition">
                            <Lock size={19} className="text-slate-400 shrink-0" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
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

                    {/* Options Row */}
                    <div className="flex items-center justify-between text-sm pt-1">
                        <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 accent-blue-600"
                            />
                            <span className="text-xs font-medium text-slate-600">Remember me</span>
                        </label>
                        <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 transition disabled:opacity-60 cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <>
                                <span>Login</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                </form>

                {/* Sign Up Redirect */}
                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-500">
                        Don't have an account yet?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={15} />
                    Protected with JWT Authentication
                </div>

            </div>
        </div>
    );
}

export default Login;
