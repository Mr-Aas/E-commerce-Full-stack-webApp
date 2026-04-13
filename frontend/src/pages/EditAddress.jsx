// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate, useParams } from "react-router-dom";

// const EditAddress = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔥 Fetch existing address
//   useEffect(() => {
//     const fetchAddress = async () => {
//       try {
//         const res = await api.get("/address");

//         const current = res.data.find(a => a._id === id);
//         setForm(current);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAddress();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       await api.put(`/address/${id}`, form);
//       navigate("/checkout/address");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading || !form) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

//         <h2 className="text-2xl font-semibold mb-6">
//           Edit Address
//         </h2>

//         {/* FORM */}
//         <div className="grid gap-4">

//           <input
//             name="fullName"
//             value={form.fullName}
//             onChange={handleChange}
//             className="p-3 border rounded"
//             placeholder="Full Name"
//           />

//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             className="p-3 border rounded"
//             placeholder="Phone"
//           />

//           <input
//             name="addressLine1"
//             value={form.addressLine1}
//             onChange={handleChange}
//             className="p-3 border rounded"
//             placeholder="Address Line 1"
//           />

//           <input
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//             className="p-3 border rounded"
//             placeholder="City"
//           />

//           <input
//             name="state"
//             value={form.state}
//             onChange={handleChange}
//             className="p-3 border rounded"
//             placeholder="State"
//           />

//           <input
//             name="postalCode"
//             value={form.postalCode}
//             onChange={handleChange}
//             className="p-3 border rounded"
//             placeholder="Postal Code"
//           />

//         </div>

//         {/* DEFAULT */}
//         <div className="mt-4 flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="isDefault"
//             checked={form.isDefault}
//             onChange={handleChange}
//           />
//           <span>Set as default</span>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-5 py-2 border rounded"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleUpdate}
//             className="px-5 py-2 bg-black text-white rounded"
//           >
//             Update Address
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EditAddress;
import React, { useEffect, useState, useCallback, useMemo } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

// ─── Constants ───────────────────────────────────────────────────────
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh",
];

const ADDRESS_TYPES = [
  { value: "home", label: "Home", icon: "🏠" },
  { value: "work", label: "Work", icon: "🏢" },
  { value: "other", label: "Other", icon: "📍" },
];

// ─── Validation ──────────────────────────────────────────────────────
const VALIDATORS = {
  fullName: (v) => {
    if (!v?.trim()) return "Full name is required";
    if (v.trim().length < 2) return "Name must be at least 2 characters";
    if (v.trim().length > 100) return "Name must be under 100 characters";
    if (!/^[a-zA-Z\s.'-]+$/.test(v.trim())) return "Name contains invalid characters";
    return "";
  },
  phone: (v) => {
    if (!v?.trim()) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, ""))) return "Enter a valid 10-digit Indian mobile number";
    return "";
  },
  alternatePhone: (v) => {
    if (v?.trim() && !/^[6-9]\d{9}$/.test(v.replace(/\s/g, "")))
      return "Enter a valid 10-digit Indian mobile number";
    return "";
  },
  addressLine1: (v) => {
    if (!v?.trim()) return "Address line 1 is required";
    if (v.trim().length < 5) return "Address is too short";
    if (v.trim().length > 200) return "Address must be under 200 characters";
    return "";
  },
  city: (v) => {
    if (!v?.trim()) return "City is required";
    if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return "City contains invalid characters";
    return "";
  },
  state: (v) => (!v?.trim() ? "State is required" : ""),
  postalCode: (v) => {
    if (!v?.trim()) return "Postal code is required";
    if (!/^\d{6}$/.test(v.trim())) return "Enter a valid 6-digit PIN code";
    return "";
  },
};

function validateForm(form) {
  const errors = {};
  Object.keys(VALIDATORS).forEach((field) => {
    const msg = VALIDATORS[field](form[field]);
    if (msg) errors[field] = msg;
  });
  return errors;
}

// ─── Sub-components ──────────────────────────────────────────────────

const SectionHeader = React.memo(({ icon, title, subtitle }) => (
  <div className="mb-5">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h3>
    {subtitle && <p className="text-sm text-gray-500 mt-1 ml-7">{subtitle}</p>}
  </div>
));
SectionHeader.displayName = "SectionHeader";

const FormInput = React.memo(({ label, name, value, onChange, onBlur, error, required, placeholder, maxLength, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete="off"
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      className={`w-full p-3 border rounded-xl text-sm transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1
        ${error
          ? "border-red-400 focus:ring-red-300 bg-red-50"
          : "border-gray-200 focus:ring-black/20 hover:border-gray-300"
        }`}
    />
    {error && (
      <p id={`${name}-error`} role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <span>⚠</span> {error}
      </p>
    )}
  </div>
));
FormInput.displayName = "FormInput";

const StateSelect = React.memo(({ value, onChange, onBlur, error }) => (
  <div>
    <label htmlFor="state" className="block text-sm font-medium text-gray-600 mb-1">
      State <span className="text-red-500">*</span>
    </label>
    <select
      id="state"
      name="state"
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={!!error}
      className={`w-full p-3 border rounded-xl text-sm transition-all duration-200 bg-white
        focus:outline-none focus:ring-2 focus:ring-offset-1
        ${error
          ? "border-red-400 focus:ring-red-300 bg-red-50"
          : "border-gray-200 focus:ring-black/20 hover:border-gray-300"
        }`}
    >
      <option value="">Select State</option>
      {INDIAN_STATES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
    {error && (
      <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <span>⚠</span> {error}
      </p>
    )}
  </div>
));
StateSelect.displayName = "StateSelect";

const AddressTypeSelector = React.memo(({ selected, onChange }) => (
  <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Address type">
    {ADDRESS_TYPES.map(({ value, label, icon }) => {
      const isActive = selected === value;
      return (
        <label
          key={value}
          className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl cursor-pointer
            transition-all duration-200 text-sm font-medium select-none
            ${isActive
              ? "border-black bg-black text-white shadow-md"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
        >
          <input
            type="radio"
            name="addressType"
            value={value}
            checked={isActive}
            onChange={onChange}
            className="sr-only"
          />
          <span className="text-base">{icon}</span>
          {label}
        </label>
      );
    })}
  </div>
));
AddressTypeSelector.displayName = "AddressTypeSelector";

// ─── Loading Skeleton ────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="h-5 w-16 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Error State ─────────────────────────────────────────────────────
const FetchError = ({ onRetry, onGoBack }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center max-w-md shadow-sm">
      <span className="text-5xl mb-4 block">😕</span>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Address not found</h2>
      <p className="text-sm text-gray-500 mb-6">
        We couldn't load this address. It may have been deleted or there was a network issue.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onGoBack}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium
            text-gray-600 hover:bg-gray-50 transition-all"
        >
          Go Back
        </button>
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-black text-white rounded-xl text-sm font-semibold
            hover:bg-gray-800 transition-all"
        >
          Retry
        </button>
      </div>
    </div>
  </div>
);

// ─── Progress Bar ────────────────────────────────────────────────────
const ProgressBar = React.memo(({ form }) => {
  const requiredFields = ["fullName", "phone", "addressLine1", "city", "state", "postalCode"];
  const filled = requiredFields.filter((f) => form[f]?.trim()).length;
  const pct = Math.round((filled / requiredFields.length) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span>Form completion</span>
        <span className="font-medium">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: pct === 100 ? "#16a34a" : pct > 50 ? "#2563eb" : "#9ca3af",
          }}
        />
      </div>
    </div>
  );
});
ProgressBar.displayName = "ProgressBar";

// ─── Main Component ──────────────────────────────────────────────────
const EditAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [originalForm, setOriginalForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [apiError, setApiError] = useState("");

  // Fetch address
  const fetchAddress = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(false);

      const res = await api.get("/address");
      const current = res.data.find((a) => a._id === id);

      if (!current) {
        setFetchError(true);
        return;
      }

      setForm(current);
      setOriginalForm(current);
    } catch (err) {
      console.error(err);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  // Change handler
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));
    setApiError("");

    setTouched((prev) => {
      if (prev[name] && VALIDATORS[name]) {
        const msg = VALIDATORS[name](type === "checkbox" ? String(checked) : value);
        setErrors((prevErr) => ({ ...prevErr, [name]: msg }));
      }
      return { ...prev, [name]: true };
    });
  }, []);

  // Blur handler
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (VALIDATORS[name]) {
      setErrors((prev) => ({ ...prev, [name]: VALIDATORS[name](value) }));
    }
  }, []);

  // Detect changes
  const hasChanges = useMemo(() => {
    if (!form || !originalForm) return false;
    return JSON.stringify(form) !== JSON.stringify(originalForm);
  }, [form, originalForm]);

  // Can submit
  const canSubmit = useMemo(() => {
    if (!form) return false;
    const required = ["fullName", "phone", "addressLine1", "city", "state", "postalCode"];
    return required.every((f) => form[f]?.trim()) && hasChanges && !saving;
  }, [form, hasChanges, saving]);

  // Submit
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      const allTouched = {};
      Object.keys(VALIDATORS).forEach((k) => (allTouched[k] = true));
      setTouched(allTouched);

      const firstErrorField = Object.keys(validationErrors).find((k) => validationErrors[k]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus({ preventScroll: false });
        document.getElementById(firstErrorField)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      setSaving(true);
      setApiError("");

      const sanitized = {
        ...form,
        fullName: form.fullName.trim(),
        phone: form.phone.replace(/\s/g, ""),
        alternatePhone: (form.alternatePhone || "").replace(/\s/g, ""),
        addressLine1: form.addressLine1.trim(),
        addressLine2: (form.addressLine2 || "").trim(),
        landmark: (form.landmark || "").trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
      };

      await api.put(`/address/${id}`, sanitized);
      navigate("/checkout/address");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setApiError(message);
    } finally {
      setSaving(false);
    }
  }, [form, id, navigate]);

  // Revert changes
  const handleRevert = useCallback(() => {
    setForm({ ...originalForm });
    setErrors({});
    setTouched({});
    setApiError("");
  }, [originalForm]);

  // ─── Render States ─────────────────────────────────────────────────
  if (loading) return <LoadingSkeleton />;
  if (fetchError || !form) return <FetchError onRetry={fetchAddress} onGoBack={() => navigate(-1)} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800
            mb-4 transition-colors group"
          aria-label="Go back"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back
        </button>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit Address</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your delivery address details
                </p>
              </div>
              {hasChanges && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Unsaved changes
                </span>
              )}
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">

            <ProgressBar form={form} />

            {/* API Error */}
            {apiError && (
              <div
                role="alert"
                className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
              >
                <span className="text-lg">❌</span>
                <div>
                  <p className="font-medium">Failed to update address</p>
                  <p className="text-red-600">{apiError}</p>
                </div>
              </div>
            )}

            {/* ── Contact Details ── */}
            <section aria-labelledby="contact-heading">
              <SectionHeader icon="👤" title="Contact Details" subtitle="We'll use this to coordinate delivery" />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormInput
                  label="Full Name" name="fullName" value={form.fullName}
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.fullName && errors.fullName}
                  required placeholder="e.g. Rahul Sharma" maxLength={100}
                />
                <FormInput
                  label="Phone Number" name="phone" type="tel" value={form.phone}
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.phone && errors.phone}
                  required placeholder="e.g. 9876543210" maxLength={10}
                />
                <FormInput
                  label="Alternate Phone" name="alternatePhone" type="tel" value={form.alternatePhone}
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.alternatePhone && errors.alternatePhone}
                  placeholder="Optional" maxLength={10}
                />
              </div>
            </section>

            {/* ── Address Details ── */}
            <section aria-labelledby="address-heading">
              <SectionHeader icon="📦" title="Address Details" subtitle="Where should we deliver your order?" />
              <div className="space-y-4">
                <FormInput
                  label="Address Line 1" name="addressLine1" value={form.addressLine1}
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.addressLine1 && errors.addressLine1}
                  required placeholder="House no., Building, Street" maxLength={200}
                />
                <FormInput
                  label="Address Line 2" name="addressLine2" value={form.addressLine2}
                  onChange={handleChange}
                  placeholder="Apartment, Suite, Floor (optional)" maxLength={200}
                />
                <FormInput
                  label="Landmark" name="landmark" value={form.landmark}
                  onChange={handleChange}
                  placeholder="Near temple, opposite park, etc." maxLength={100}
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  <FormInput
                    label="City" name="city" value={form.city}
                    onChange={handleChange} onBlur={handleBlur}
                    error={touched.city && errors.city}
                    required placeholder="e.g. Mumbai" maxLength={50}
                  />
                  <StateSelect
                    value={form.state} onChange={handleChange} onBlur={handleBlur}
                    error={touched.state && errors.state}
                  />
                  <FormInput
                    label="Postal Code" name="postalCode" value={form.postalCode}
                    onChange={handleChange} onBlur={handleBlur}
                    error={touched.postalCode && errors.postalCode}
                    required placeholder="e.g. 400001" maxLength={6}
                  />
                </div>
              </div>
            </section>

            {/* ── Address Type ── */}
            <section>
              <SectionHeader icon="🏷️" title="Address Type" />
              <AddressTypeSelector selected={form.addressType} onChange={handleChange} />
            </section>

            {/* ── Default Checkbox ── */}
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault || false}
                onChange={handleChange}
                className="w-4.5 h-4.5 rounded border-gray-300 text-black focus:ring-black/20
                  cursor-pointer accent-black"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                Set as default delivery address
              </span>
            </label>
          </div>

          {/* ── Actions ── */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
            <button
              type="button"
              onClick={handleRevert}
              disabled={!hasChanges}
              className={`text-sm transition-colors ${
                hasChanges ? "text-gray-500 hover:text-gray-700" : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Revert changes
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-200 rounded-xl text-sm
                  font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-200 flex items-center justify-center gap-2 min-w-[160px]
                  ${canSubmit
                    ? "bg-black text-white hover:bg-gray-800 active:scale-[0.98] shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating…
                  </>
                ) : (
                  "Update Address"
                )}
              </button>
            </div>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Your address is stored securely and only used for deliveries.
        </p>
      </div>
    </div>
  );
};

export default EditAddress;
