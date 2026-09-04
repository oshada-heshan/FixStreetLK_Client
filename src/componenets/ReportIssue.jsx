import { useState } from "react";

export default function ReportIssue() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        severity: "Medium",
        location: "",
        imageUrl: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove error when user starts fixing the field
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Preview image
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // For now we store the local preview URL.
        // Later replace this with your Supabase/cloud upload URL.
        setFormData((prev) => ({
            ...prev,
            imageUrl: previewUrl,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Please enter an issue title.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Please describe the issue.";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Please enter the location.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        console.log("Report submitted:", formData);

        // Later:
        // await api.post("/Report", formData);

        alert("Issue reported successfully!");

        setFormData({
            name: "",
            description: "",
            severity: "Medium",
            location: "",
            imageUrl: "",
        });

        setImagePreview(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">

            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        StreetFix
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Report an Issue
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Help improve your community by reporting a problem in your area.
                    </p>
                </div>


                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >

                    {/* Issue Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-900"
                        >
                            Issue Title
                        </label>

                        <p className="mt-1 text-xs text-gray-500">
                            Give your issue a short and descriptive title.
                        </p>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Large pothole on Main Street"
                            className={`mt-3 h-12 w-full rounded-xl border px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-blue-100 ${errors.name
                                ? "border-red-400 focus:border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        {errors.name && (
                            <p className="mt-2 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>


                    {/* Description */}
                    <div className="mt-6">
                        <label
                            htmlFor="description"
                            className="block text-sm font-semibold text-gray-900"
                        >
                            Description
                        </label>

                        <p className="mt-1 text-xs text-gray-500">
                            Explain what happened and why it needs attention.
                        </p>

                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the problem..."
                            className={`mt-3 w-full resize-none rounded-xl border px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-blue-100 ${errors.description
                                ? "border-red-400 focus:border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        {errors.description && (
                            <p className="mt-2 text-xs text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>


                    {/* Severity + Location */}
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {/* Severity */}
                        <div>
                            <label
                                htmlFor="severity"
                                className="block text-sm font-semibold text-gray-900"
                            >
                                Severity
                            </label>

                            <p className="mt-1 text-xs text-gray-500">
                                How serious is this issue?
                            </p>

                            <select
                                id="severity"
                                name="severity"
                                value={formData.severity}
                                onChange={handleChange}
                                className="mt-3 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>


                        {/* Location */}
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-semibold text-gray-900"
                            >
                                Location
                            </label>

                            <p className="mt-1 text-xs text-gray-500">
                                Where is the issue located?
                            </p>

                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                    📍
                                </span>

                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Kandy City"
                                    className={`mt-3 h-12 w-full rounded-xl border pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-blue-100 ${errors.location
                                        ? "border-red-400 focus:border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                        }`}
                                />
                            </div>

                            {errors.location && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors.location}
                                </p>
                            )}
                        </div>

                    </div>


                    {/* Image Upload */}
                    <div className="mt-6">

                        <label className="block text-sm font-semibold text-gray-900">
                            Photo
                        </label>

                        <p className="mt-1 text-xs text-gray-500">
                            Upload a photo showing the problem.
                        </p>

                        <label
                            htmlFor="image"
                            className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50"
                        >

                            {imagePreview ? (
                                <div className="w-full">

                                    <img
                                        src={imagePreview}
                                        alt="Issue preview"
                                        className="mx-auto max-h-64 rounded-xl object-cover"
                                    />

                                    <p className="mt-4 text-sm font-medium text-blue-600">
                                        Click to change photo
                                    </p>

                                </div>
                            ) : (
                                <>
                                    <div className="text-4xl">
                                        📸
                                    </div>

                                    <p className="mt-3 text-sm font-semibold text-gray-700">
                                        Upload a photo
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        PNG, JPG or JPEG
                                    </p>
                                </>
                            )}

                        </label>

                        <input
                            id="image"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleImageChange}
                            className="hidden"
                        />

                    </div>


                    {/* Submit */}
                    <div className="mt-8 border-t border-gray-100 pt-6">

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                            Submit Issue
                        </button>

                        <p className="mt-3 text-center text-xs text-gray-400">
                            By submitting this report, you help local authorities
                            identify and resolve community problems.
                        </p>

                    </div>

                </form>

            </div>

        </div>
    );
}