import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Website Pages
import Home from "../front/pages/Home";
import Login from "../front/pages/Login";
import Register from "../front/pages/Register";

// Route Security Guard
import ProtectedRoute from "./ProtectedRoute";

// Admin Layout Shell
import AdminLayout from "../admin/layouts/AdminLayout";

// Admin Pages
import Dashboard from "../admin/pages/Dashboard";
import Student from "../admin/pages/Student";
import AddStudent from "../admin/pages/AddStudent";
import UpdateStudent from "../admin/pages/UpdateStudent";
import DeleteStudent from "../admin/pages/DeleteStudent";

/**
 * AppRoutes Component
 * Centralized routing definition for public portal and protected admin suite.
 */
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Admin Routes (Accessible Only After Login) */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Dashboard />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Student />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-student"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <AddStudent />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/update-student"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <UpdateStudent />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/delete-student"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <DeleteStudent />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Fallback to Public Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
