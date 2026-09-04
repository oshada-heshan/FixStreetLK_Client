import { useState } from "react";
import { AlertCircle, CheckCircle2, ImagePlus, MapPin, Upload, X } from "lucide-react";

export default function ReportModal({ onClose }) {
    const [formData, setFormData] = useState({ name: "", description: "", location: "", severity: "" });
    const [files, setFiles] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    function handleChange(event) {
        const value = event.target.name === "severity" && event.target.value !== ""
            ? Number(event.target.value)
            : event.target.value;

        setFormData((current) => ({ ...current, [event.target.name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch("http://localhost:5186/api/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    severity: formData.severity,
                    location: formData.location,
                    imageUrl: "",
                }),
            });

            if (!response.ok) {
                throw new Error("The report could not be submitted.");
            }

            setSubmitted(true);
        } catch (error) {
            setSubmitError(error.message || "The report could not be submitted.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="report-title">
            <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Community report</p>
                        <h2 id="report-title" className="mt-1 text-2xl font-bold text-gray-900">Report an issue</h2>
                        <p className="mt-1 text-sm text-gray-500">Help your local team understand what needs attention.</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close report form" className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"><X size={20} /></button>
                </div>

                {submitted ? (
                    <div className="px-6 py-16 text-center sm:px-8">
                        <CheckCircle2 className="mx-auto text-emerald-500" size={52} strokeWidth={1.6} />
                        <h3 className="mt-5 text-xl font-bold text-gray-900">Thanks for reporting this</h3>
                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">Your report has been added for review by the local community team.</p>
                        <button type="button" onClick={onClose} className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Done</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">
                        <div>
                            <label htmlFor="reporter-name" className="mb-2 block text-sm font-semibold text-gray-800">Name who reports</label>
                            <input id="reporter-name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                        </div>
                        <div>
                            <label htmlFor="report-description" className="mb-2 block text-sm font-semibold text-gray-800">Description</label>
                            <textarea id="report-description" name="description" value={formData.description} onChange={handleChange} required rows="4" placeholder="Tell us what happened and why it needs attention" className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                        </div>
                        <div>
                            <label htmlFor="report-location" className="mb-2 block text-sm font-semibold text-gray-800">Where is the issue?</label>
                            <div className="relative">
                                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input id="report-location" name="location" value={formData.location} onChange={handleChange} required placeholder="Place, street, or nearby landmark" className="h-12 w-full rounded-xl border border-gray-200 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="report-severity" className="mb-2 block text-sm font-semibold text-gray-800">Severity</label>
                            <select id="report-severity" name="severity" value={formData.severity} onChange={handleChange} required className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                                <option value="" disabled>Select severity</option>
                                <option value="0">Low</option>
                                <option value="1">Medium</option>
                                <option value="2">High</option>
                            </select>
                        </div>
                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <label htmlFor="report-files" className="block text-sm font-semibold text-gray-800">Add pictures or videos</label>
                                <span className="text-xs text-gray-400">Up to 5 files</span>
                            </div>
                            <label htmlFor="report-files" className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600"><ImagePlus size={22} /></div>
                                <span className="mt-3 text-sm font-semibold text-gray-700">Choose files to upload</span>
                                <span className="mt-1 text-xs text-gray-400">JPG, PNG, MP4, or MOV</span>
                                <input id="report-files" type="file" accept="image/*,video/*" multiple onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, 5))} className="sr-only" />
                            </label>
                            {files.length > 0 && <p className="mt-2 text-xs text-gray-500">{files.length} file{files.length === 1 ? "" : "s"} selected: {files.map((file) => file.name).join(", ")}</p>}
                        </div>
                        <div className="flex items-start gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-800"><AlertCircle size={16} className="mt-0.5 shrink-0" /><span>Please avoid including personal or sensitive information in uploaded media.</span></div>
                        {submitError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                            <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"><Upload size={17} /> {isSubmitting ? "Submitting..." : "Submit report"}</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
