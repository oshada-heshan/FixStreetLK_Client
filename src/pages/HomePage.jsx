import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";


/* =========================================================
   ISSUE CARD
========================================================= */

function IssueCard({ issue }) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-gray-100">

                {issue.imageUrl ? (
                    <img
                        src={issue.imageUrl}
                        alt={issue.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center text-gray-400">
                        <span className="text-4xl">📷</span>
                        <span className="mt-2 text-sm">
                            No Image
                        </span>
                    </div>
                )}

                {/* Severity */}
                <div className="absolute left-4 top-4">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold shadow-md ${String(issue.severity).toLowerCase() === "critical"
                            ? "bg-red-600 text-white"
                            : String(issue.severity).toLowerCase() === "high"
                                ? "bg-orange-500 text-white"
                                : String(issue.severity).toLowerCase() === "medium"
                                    ? "bg-yellow-400 text-gray-900"
                                    : "bg-green-500 text-white"
                            }`}
                    >
                        {issue.severity}
                    </span>
                </div>

            </div>


            {/* Card Content */}
            <div className="p-5">

                {/* Severity */}
                <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        {issue.severity}
                    </span>
                </div>


                {/* Title */}
                <h3 className="mt-4 line-clamp-1 text-lg font-bold text-gray-900">
                    {issue.name}
                </h3>


                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {issue.description}
                </p>


                {/* Location */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span>
                    <span className="line-clamp-1">
                        {issue.location}
                    </span>
                </div>


                {/* Footer */}
                <div className="mt-5 flex items-center justify-end border-t border-gray-100 pt-4">

                    <Link
                        to={`/reports/${issue.id}`}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                        View Issue
                    </Link>

                </div>

            </div>

        </div>
    );
}


/* =========================================================
   HOME PAGE
========================================================= */

export default function HomePage() {

    const [issues, setIssues] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedSeverity, setSelectedSeverity] = useState("All");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    /* =====================================================
       FETCH REPORTS FROM ASP.NET CORE API
    ====================================================== */

    useEffect(() => {

        const fetchReports = async () => {

            try {

                setLoading(true);
                setError("");

                /*
                 * Backend endpoint:
                 *
                 * GET https://localhost:7115/api/reports
                 *
                 * Controller:
                 * ReportsController
                 *
                 * [Route("api/[controller]")]
                 */

                const response = await api.get("/reports");

                console.log("Reports received from API:", response.data);

                setIssues(response.data);

            } catch (error) {

                console.error("Failed to fetch reports:", error);

                if (error.response) {

                    console.error(
                        "Server response:",
                        error.response.data
                    );

                    setError(
                        `Server error: ${error.response.status}`
                    );

                } else if (error.request) {

                    setError(
                        "Cannot connect to the StreetFix API. Make sure the ASP.NET Core backend is running."
                    );

                } else {

                    setError(
                        "Unable to load reported issues. Please try again."
                    );

                }

            } finally {

                setLoading(false);

            }

        };

        fetchReports();

    }, []);


    /* =====================================================
       SEVERITY FILTERS
    ====================================================== */

    const severities = [
        "All",
        "Low",
        "Medium",
        "High",
        "Critical",
    ];


    /* =====================================================
       FILTER REPORTS
    ====================================================== */

    const filteredIssues = issues.filter((issue) => {

        /*
         * Handle both string and numeric enum values.
         *
         * Ideally your backend should return:
         *
         * "Low"
         * "Medium"
         * "High"
         * "Critical"
         */

        const severity = String(issue.severity);


        const matchesSeverity =
            selectedSeverity === "All" ||
            severity.toLowerCase() ===
            selectedSeverity.toLowerCase();


        const searchText = search.toLowerCase().trim();


        const matchesSearch =
            !searchText ||
            issue.name?.toLowerCase().includes(searchText) ||
            issue.description?.toLowerCase().includes(searchText) ||
            issue.location?.toLowerCase().includes(searchText);


        return matchesSeverity && matchesSearch;

    });


    /* =====================================================
       CLEAR FILTERS
    ====================================================== */

    const clearFilters = () => {

        setSearch("");

        setSelectedSeverity("All");

    };


    /* =====================================================
       RETRY FETCH
    ====================================================== */

    const retryFetch = () => {

        window.location.reload();

    };


    return (

        <div className="min-h-screen bg-gray-50">


            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">


                    {/* Logo */}

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                            📍
                        </div>

                        <div>

                            <h1 className="text-xl font-semibold tracking-tight text-gray-900">

                                Street
                                <span className="text-blue-600">
                                    Fix
                                </span>

                            </h1>

                        </div>

                    </Link>


                    {/* Navigation */}

                    <nav className="hidden items-center gap-8 md:flex">

                        <Link
                            to="/"
                            className="text-sm font-semibold text-blue-600"
                        >
                            Home
                        </Link>


                        <a
                            href="#issues"
                            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                            Issues
                        </a>


                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                            How It Works
                        </a>


                        <a
                            href="#about"
                            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                            About
                        </a>

                    </nav>


                    {/* Right Side */}


                </div>

            </header>


            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="border-b border-gray-200 bg-white">

                <div className="mx-auto max-w-7xl px-6 py-20">

                    <div className="mx-auto max-w-3xl text-center">


                        {/* Heading */}

                        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">

                            See it.

                            <span className="text-blue-600">
                                {" "}Report it.
                            </span>

                            <br />

                            Fix it.

                        </h2>


                        {/* Description */}

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">

                            StreetFix connects citizens with local authorities
                            to report, track, and resolve problems in their
                            communities.

                        </p>


                        {/* Search */}

                        <div className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row">

                            <div className="relative flex-1">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                                    🔍
                                </span>


                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search issues or locations..."
                                    className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>


                            <button
                                type="button"
                                onClick={() => {
                                    document
                                        .getElementById("issues")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }}
                                className="h-12 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Search
                            </button>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                ISSUES
            ====================================================== */}

            <main
                id="issues"
                className="mx-auto max-w-7xl px-6 py-14"
            >


                {/* Heading */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Community
                        </p>


                        <h2 className="mt-1 text-3xl font-bold text-gray-900">
                            Reported Issues
                        </h2>


                        <p className="mt-2 text-sm text-gray-500">
                            Problems reported by people in your community.
                        </p>

                    </div>


                    <Link
                        to="/report"
                        className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >

                        <span className="text-lg">
                            +
                        </span>

                        Report an Issue

                    </Link>

                </div>


                {/* =====================================================
                    FILTERS
                ====================================================== */}

                <div className="mt-8 flex gap-2 overflow-x-auto pb-2">

                    {severities.map((severity) => {

                        const active =
                            selectedSeverity === severity;


                        return (

                            <button
                                key={severity}
                                type="button"
                                onClick={() =>
                                    setSelectedSeverity(severity)
                                }
                                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${active
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "border border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600"
                                    }`}
                            >

                                {severity}

                            </button>

                        );

                    })}

                </div>


                {/* =====================================================
                    RESULTS COUNT
                ====================================================== */}

                {!loading && !error && (

                    <div className="mt-8 flex items-center justify-between">

                        <p className="text-sm text-gray-500">

                            Showing{" "}

                            <span className="font-semibold text-gray-900">
                                {filteredIssues.length}
                            </span>

                            {" "}issues

                        </p>


                        <span className="text-sm text-gray-400">
                            Latest reports
                        </span>

                    </div>

                )}


                {/* =====================================================
                    LOADING
                ====================================================== */}

                {loading && (

                    <div className="mt-12 flex flex-col items-center justify-center py-20">

                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

                        <p className="mt-4 text-sm text-gray-500">
                            Loading reported issues...
                        </p>

                    </div>

                )}


                {/* =====================================================
                    ERROR
                ====================================================== */}

                {!loading && error && (

                    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 py-16 text-center">

                        <div className="text-4xl">
                            ⚠️
                        </div>


                        <h3 className="mt-4 text-lg font-semibold text-red-700">
                            Something went wrong
                        </h3>


                        <p className="mx-auto mt-2 max-w-lg px-6 text-sm text-red-600">
                            {error}
                        </p>


                        <button
                            type="button"
                            onClick={retryFetch}
                            className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* =====================================================
                    ISSUE CARDS
                ====================================================== */}

                {!loading && !error && (

                    filteredIssues.length > 0 ? (

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {filteredIssues.map((issue) => (

                                <IssueCard
                                    key={issue.id}
                                    issue={issue}
                                />

                            ))}

                        </div>

                    ) : (

                        /* Empty State */

                        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

                            <div className="text-5xl">
                                🔍
                            </div>


                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                No issues found
                            </h3>


                            <p className="mx-auto mt-2 max-w-md px-6 text-sm text-gray-500">
                                No reported issues match your current
                                search or severity filter.
                            </p>


                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Clear Filters
                            </button>

                        </div>

                    )

                )}

            </main>


            {/* =====================================================
                HOW IT WORKS
            ====================================================== */}

            <section
                id="how-it-works"
                className="border-t border-gray-200 bg-white"
            >

                <div className="mx-auto max-w-7xl px-6 py-16">


                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Simple Process
                        </p>


                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            How StreetFix Works
                        </h2>


                        <p className="mt-3 text-gray-500">
                            Report a problem in just a few simple steps.
                        </p>

                    </div>


                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">


                        {/* Step 1 */}

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                                📸
                            </div>


                            <h3 className="mt-5 text-lg font-bold text-gray-900">
                                1. Report
                            </h3>


                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Take a photo, describe the problem, and submit
                                its location.
                            </p>

                        </div>


                        {/* Step 2 */}

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                                🔎
                            </div>


                            <h3 className="mt-5 text-lg font-bold text-gray-900">
                                2. Track
                            </h3>


                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Follow the progress of your reported issue and
                                receive updates.
                            </p>

                        </div>


                        {/* Step 3 */}

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                                ✅
                            </div>


                            <h3 className="mt-5 text-lg font-bold text-gray-900">
                                3. Get It Fixed
                            </h3>


                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Local authorities take action and update the
                                issue once it is resolved.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer
                id="about"
                className="border-t border-gray-200 bg-gray-900 text-white"
            >

                <div className="mx-auto max-w-7xl px-6 py-10">

                    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">


                        {/* Brand */}

                        <div>

                            <h2 className="text-xl font-bold">

                                Street
                                <span className="text-blue-400">
                                    Fix
                                </span>

                            </h2>


                            <p className="mt-2 max-w-md text-sm text-gray-400">
                                Building better communities through citizen
                                participation and smarter issue management.
                            </p>

                        </div>


                        {/* Links */}

                        <div className="flex gap-6 text-sm text-gray-400">

                            <Link
                                to="/"
                                className="hover:text-white"
                            >
                                Home
                            </Link>


                            <a
                                href="#issues"
                                className="hover:text-white"
                            >
                                Issues
                            </a>


                            <a
                                href="#how-it-works"
                                className="hover:text-white"
                            >
                                How It Works
                            </a>

                        </div>

                    </div>


                    {/* Copyright */}

                    <div className="mt-8 border-t border-gray-800 pt-6 text-sm text-gray-500">

                        © 2026 StreetFix. All rights reserved.

                    </div>

                </div>

            </footer>

        </div>

    );
}