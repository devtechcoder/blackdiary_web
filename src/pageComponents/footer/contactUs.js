"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PublicLayout from "../../components/layout/publicLayout";
import apiPath from "../../constants/apiPath";
import { usePostRequest } from "../../hooks/useReduxRequest";
import { Severty, ShowToast } from "../../helper/toast";

const defaultForm = {
  name: "",
  email: "",
  message: "",
};

const ContactUs = () => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({
    mobile_number: "",
    country_code: "",
  });
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

  const handlePhoneChange = (value, data) => {
    setPhoneNumber({
      country_code: data?.dialCode || "",
      mobile_number: value ? value.slice(data?.dialCode?.length || 0) : "",
    });
    setErrors((prev) => ({
      ...prev,
      phone: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = phoneNumber.mobile_number.trim();

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!emailRegex.test(form.email.trim())) nextErrors.email = "Please enter a valid email";
    if (phoneDigits && !/^\d{8,12}$/.test(phoneDigits)) nextErrors.phone = "Please enter a valid phone number";
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
          phone: phoneNumber.mobile_number ? `+${phoneNumber.country_code}-${phoneNumber.mobile_number}` : null,
          message: form.message.trim(),
        },
      });

      if (response?.status) {
        ShowToast(response?.message || "Enquiry submitted successfully", Severty.SUCCESS);
        setForm(defaultForm);
        setPhoneNumber({
          mobile_number: "",
          country_code: "",
        });
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
      <PublicLayout contentClassName="p-0 text-white bg-[#0d0d0d] flex flex-col flex-1 overflow-x-hidden" containerClassName="flex flex-col flex-1 w-full max-w-none">
        <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#1a120b_0%,#0b0806_42%,#050302_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,173,66,0.14),transparent_26%),radial-gradient(circle_at_10%_40%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_90%_38%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,175,71,0.1),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,188,84,0.75)_0.7px,transparent_0.7px)] [background-size:20px_20px]" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
            <div className="max-w-3xl text-center">
              <h1 className="poetic-heading text-3xl font-semibold text-[#F1C56A] sm:text-4xl lg:text-5xl">Contact Us</h1>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#CFC3B0] sm:text-[15px]">Send your enquiry and our team will get back to you.</p>
            </div>

            <div className="mt-10 grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <aside className="rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-6 text-[#D0D0D0] shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
                <div className="max-w-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F1C56A]">Reach out</p>
                  <h2 className="poetic-heading mt-3 text-2xl text-[#F6E7C8] sm:text-3xl">We'd love to hear from you</h2>
                  <p className="mt-4 text-sm leading-7 text-[#CFC3B0] sm:text-[15px]">
                    Share your feedback, partnership ideas, support requests, or anything else you want us to know.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-[24px] border border-[rgba(212,175,55,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                    <p className="text-sm font-semibold text-[#F6E7C8]">Response time</p>
                    <p className="mt-1 text-sm leading-6 text-[#CFC3B0]">We usually reply within 24 to 48 hours on working days.</p>
                  </div>
                  <div className="rounded-[24px] border border-[rgba(212,175,55,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                    <p className="text-sm font-semibold text-[#F6E7C8]">Best for</p>
                    <p className="mt-1 text-sm leading-6 text-[#CFC3B0]">General enquiries, account help, content ideas, and collaborations.</p>
                  </div>
                </div>
              </aside>

              <form onSubmit={handleSubmit} className="contact-us-form rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
                <div className="grid gap-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#F6E7C8]">
                      Name <span className="text-[#FF8A8A]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleInputChange}
                      className="w-full rounded-[18px] border border-[rgba(212,175,55,0.22)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[#F3EBDD] outline-none transition-all duration-300 placeholder:text-[#8E8E8E] focus:border-[rgba(212,175,55,0.55)] focus:bg-[rgba(255,255,255,0.06)]"
                      placeholder="Enter your name"
                    />
                    {errors.name ? <p className="mt-1 text-xs text-[#FF8A8A]">{errors.name}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#F6E7C8]">
                      Email <span className="text-[#FF8A8A]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleInputChange}
                      className="w-full rounded-[18px] border border-[rgba(212,175,55,0.22)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[#F3EBDD] outline-none transition-all duration-300 placeholder:text-[#8E8E8E] focus:border-[rgba(212,175,55,0.55)] focus:bg-[rgba(255,255,255,0.06)]"
                      placeholder="Enter your email"
                    />
                    {errors.email ? <p className="mt-1 text-xs text-[#FF8A8A]">{errors.email}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#F6E7C8]">
                      Phone Number
                    </label>
                    <PhoneInput
                      country="in"
                      preferredCountries={["in"]}
                      value={phoneNumber.country_code || phoneNumber.mobile_number ? `${phoneNumber.country_code}${phoneNumber.mobile_number}` : ""}
                      onChange={handlePhoneChange}
                      placeholder="Enter phone number (optional)"
                      inputProps={{
                        name: "phone",
                        id: "phone",
                        autoComplete: "tel",
                      }}
                      className="contact-us-phone"
                    />
                    {errors.phone ? <p className="mt-1 text-xs text-[#FF8A8A]">{errors.phone}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#F6E7C8]">
                      Message <span className="text-[#FF8A8A]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleInputChange}
                      className="w-full rounded-[18px] border border-[rgba(212,175,55,0.22)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[#F3EBDD] outline-none transition-all duration-300 placeholder:text-[#8E8E8E] focus:border-[rgba(212,175,55,0.55)] focus:bg-[rgba(255,255,255,0.06)]"
                      placeholder="Write your message"
                    />
                    {errors.message ? <p className="mt-1 text-xs text-[#FF8A8A]">{errors.message}</p> : null}
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#090909] shadow-[0_0_20px_rgba(212,175,55,0.32)] transition-all duration-300 hover:bg-[#E1C04A] hover:shadow-[0_0_26px_rgba(212,175,55,0.42)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default ContactUs;
