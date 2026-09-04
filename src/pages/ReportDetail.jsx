import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

export default function ReportDetail() {
    const { id } = useParams();
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await api.get(`/reports/${id}`);
                setIssue(response.data);
            } catch (err) {
                console.error("Failed to fetch report:", err);
                if (err.response && err.response.status === 404) {
                    setError("Issue not found.");
                } else {
                    setError("Unable to load the issue details. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                    <p className="mt-4 text-sm text-gray-500 font-medium">Loading issue details...</p>
                </div>
            </div>
        );
    }

    if (error || !issue) {
        return (
            <div className="min-h-screen bg-gray-50 px-6 py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900">{error || "Something went wrong"}</h2>
                    <Link to="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header / Navbar (Simplified for detail view) */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
                    <Link to="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
                        <span>←</span> Back to Issues
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-6 py-12">
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-200">
                    {/* Image Section */}
                    <div className="relative h-72 sm:h-96 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {issue.imageUrl ? (
                            <img
                                src={issue.imageUrl}
                                alt={issue.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                                <span className="text-6xl mb-3">📷</span>
                                <span className="text-sm font-medium">No Image Provided</span>
                            </div>
                        )}
                        
                        {/* Badges Overlay */}
                        <div className="absolute top-6 left-6 flex gap-3">
                            <span
                                className={`rounded-full px-4 py-1.5 text-sm font-bold shadow-lg backdrop-blur-md ${
                                    String(issue.severity).toLowerCase() === "critical"
                                        ? "bg-red-600/90 text-white"
                                        : String(issue.severity).toLowerCase() === "high"
                                        ? "bg-orange-500/90 text-white"
                                        : String(issue.severity).toLowerCase() === "medium"
                                        ? "bg-yellow-400/90 text-gray-900"
                                        : "bg-green-500/90 text-white"
                                }`}
                            >
                                {issue.severity} Severity
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 sm:p-12">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                                    {issue.name}
                                </h1>
                                <div className="mt-4 flex items-center gap-2 text-gray-500 font-medium">
                                    <span className="text-xl">📍</span>
                                    <span className="text-lg">{issue.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-gray-100">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                                Description
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                                {issue.description}
                            </p>
                        </div>
                        
                        {/* Actions Section */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 rounded-xl bg-blue-50 text-blue-700 px-6 py-4 text-sm font-semibold transition hover:bg-blue-100 flex items-center justify-center gap-2">
                                <span className="text-lg">👍</span> Confirm Issue
                            </button>
                            <button className="flex-1 rounded-xl border border-gray-200 bg-white text-gray-700 px-6 py-4 text-sm font-semibold transition hover:bg-gray-50 flex items-center justify-center gap-2">
                                <span className="text-lg">🔗</span> Share
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
