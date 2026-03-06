import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import apiPath from "../../constants/apiPath";
import { usePostRequest } from "../../hooks/useReduxRequest";
import { Severty, ShowToast } from "../../helper/toast";

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ContactUs = () => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const { post, isLoading } = usePostRequest();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!emailRegex.test(form.email.trim())) nextErrors.email = "Please enter a valid email";
    if (!form.message.trim()) nextErrors.message = "Message is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await post({
        url: apiPath.contactEnquiry,
        method: "POST",
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        },
      });

      if (response?.status) {
        ShowToast(response?.message || "Enquiry submitted successfully", Severty.SUCCESS);
        setForm(defaultForm);
        setErrors({});
      } else {
        ShowToast(response?.message || "Unable to submit enquiry", Severty.ERROR);
      }
    } catch (error) {
      ShowToast(error?.data?.message || "Unable to submit enquiry", Severty.ERROR);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Black Diary</title>
        <meta name="description" content="Reach out to Black Diary for support, feedback, or collaboration through our contact form." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-900 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
              <p className="text-gray-600">Send your enquiry and our team will get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
                  placeholder="Enter your name"
                />
                {errors.name ? <p className="text-red-600 text-xs mt-1">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
                  placeholder="Enter your email"
                />
                {errors.email ? <p className="text-red-600 text-xs mt-1">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
                  placeholder="Enter phone number (optional)"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
                  placeholder="Write your message"
                />
                {errors.message ? <p className="text-red-600 text-xs mt-1">{errors.message}</p> : null}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default ContactUs;
