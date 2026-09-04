import { useState } from "react";

const issues = [
    {
        id: 1,
        title: "Large Pothole on Main Road",
        description:
            "A large pothole has appeared near the main junction and is becoming dangerous for vehicles and pedestrians.",
        category: "Road",
        location: "Kandy, Sri Lanka",
        status: "Open",
        date: "2 hours ago",
        confirmations: 24,
        image:
            "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 2,
        title: "Broken Street Light",
        description:
            "The street light has not been working for several days, making the road difficult to use at night.",
        category: "Streetlight",
        location: "Peradeniya",
        status: "In Progress",
        date: "5 hours ago",
        confirmations: 12,
        image:
            "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 3,
        title: "Garbage Accumulation",
        description:
            "Garbage has been accumulating near the public park for the past few days.",
        category: "Garbage",
        location: "Katugastota",
        status: "Resolved",
        date: "1 day ago",
        confirmations: 31,
        image:
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 4,
        title: "Damaged Sidewalk",
        description:
            "The sidewalk is badly damaged and pedestrians are forced to walk on the road.",
        category: "Road",
        location: "Kandy City",
        status: "Open",
        date: "2 days ago",
        confirmations: 18,
        image:
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 5,
        title: "Water Leakage",
        description:
            "Water is continuously leaking from a damaged pipe beside the road.",
        category: "Water",
        location: "Ampitiya",
        status: "In Progress",
        date: "3 days ago",
        confirmations: 9,
        image:
            "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 6,
        title: "Blocked Drainage",
        description:
            "The drainage system is blocked and water is collecting on the side of the road.",
        category: "Drainage",
        location: "Gatambe",
        status: "Open",
        date: "4 days ago",
        confirmations: 15,
        image:
            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80",
    },
];

const categories = [
    "All",
    "Road",
    "Streetlight",
    "Garbage",
    "Water",
    "Drainage",
];

function StatusBadge({ status }) {
    if (status === "Resolved") {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                ✓ Resolved
            </span>
        );
    }

    if (status === "In Progress") {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                ◷ In Progress
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            ! Open
        </span>
    );
}

function IssueCard({ issue }) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                    src={issue.image}
                    alt={issue.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Status */}
                <div className="absolute left-4 top-4">
                    <StatusBadge status={issue.status} />
                </div>

                {/* Favorite */}
                <button
                    type="button"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-100"
                >
                    ♡
                </button>
            </div>

            {/* Card Content */}
            <div className="p-5">

                {/* Category + Date */}
                <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        {issue.category}
                    </span>

                    <span className="text-xs text-gray-400">
                        {issue.date}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 line-clamp-1 text-lg font-bold text-gray-900">
                    {issue.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {issue.description}
                </p>

                {/* Location */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span>
                    <span>{issue.location}</span>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                    <span className="text-sm text-gray-500">
                        👍 {issue.confirmations} confirmed
                    </span>

                    <button
                        type="button"
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                        View Issue
                    </button>

                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");

    // Filter issues
    const filteredIssues = issues.filter((issue) => {
        const matchesCategory =
            selectedCategory === "All" ||
            issue.category === selectedCategory;

        const searchText = search.toLowerCase();

        const matchesSearch =
            issue.title.toLowerCase().includes(searchText) ||
            issue.description.toLowerCase().includes(searchText) ||
            issue.location.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">

            {/* =====================================================
          NAVBAR
      ====================================================== */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                            📍
                        </div>

                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                Street<span className="text-blue-600">Fix</span>
                            </h1>
                        </div>

                    </a>


                    {/* Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">

                        <a
                            href="#"
                            className="text-sm font-semibold text-blue-600"
                        >
                            Home
                        </a>

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


                    {/* Right side */}
                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            className="hidden rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-red-500 sm:block"
                        >
                            ♡
                        </button>

                    </div>

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
                            <span className="text-blue-600"> Report it.</span>
                            <br />
                            Fix it.
                        </h2>


                        {/* Description */}
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                            StreetFix connects citizens with local authorities to
                            report, track, and resolve problems in their communities.
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
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search issues or locations..."
                                    className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                            <button
                                type="button"
                                className="h-12 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Search
                            </button>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
          ISSUES SECTION
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


                    <button
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        <span className="text-lg">+</span>
                        Report an Issue
                    </button>

                </div>


                {/* =====================================================
            CATEGORY FILTERS
        ====================================================== */}
                <div className="mt-8 flex gap-2 overflow-x-auto pb-2">

                    {categories.map((category) => {

                        const active = selectedCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setSelectedCategory(category)}
                                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${active
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "border border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}

                </div>


                {/* =====================================================
            RESULTS COUNT
        ====================================================== */}
                <div className="mt-8 flex items-center justify-between">

                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-900">
                            {filteredIssues.length}
                        </span>{" "}
                        issues
                    </p>

                    <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500">
                        <option>Most Recent</option>
                        <option>Most Confirmed</option>
                        <option>Recently Resolved</option>
                    </select>

                </div>


                {/* =====================================================
            ISSUE CARDS
        ====================================================== */}
                {filteredIssues.length > 0 ? (

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredIssues.map((issue) => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                            />
                        ))}

                    </div>

                ) : (

                    /* Empty state */
                    <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

                        <div className="text-5xl">
                            🔍
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            No issues found
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Try searching for something else or choose another category.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("All");
                            }}
                            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Clear Filters
                        </button>

                    </div>

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
                                Take a photo, describe the problem, and submit its location.
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
                                Follow the progress of your reported issue and receive updates.
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
                                Local authorities take action and update the issue once it is resolved.
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

                        <div>

                            <h2 className="text-xl font-bold">
                                Street<span className="text-blue-400">Fix</span>
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-gray-400">
                                Building better communities through citizen participation
                                and smarter issue management.
                            </p>

                        </div>


                        <div className="flex gap-6 text-sm text-gray-400">

                            <a href="#" className="hover:text-white">
                                Home
                            </a>

                            <a href="#issues" className="hover:text-white">
                                Issues
                            </a>

                            <a href="#how-it-works" className="hover:text-white">
                                How It Works
                            </a>

                        </div>

                    </div>


                    <div className="mt-8 border-t border-gray-800 pt-6 text-sm text-gray-500">
                        © 2026 StreetFix. All rights reserved.
                    </div>

                </div>

            </footer>

        </div>
    );
}