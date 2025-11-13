import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const HeroForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // Step state

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name !== "phoneNumber" && !value.trim()) {
      error = `${name.replace(/([A-Z])/g, " $1")} is required`;
    }

    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Please enter a valid email address";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    Object.entries(formData).forEach(([key, value]) =>
      validateField(key, value)
    );
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please fix form errors before submitting.");
      return;
    }

    setIsLoading(true);

    // console.log("formdata", formData);

    const { email, fullName, phoneNumber, country } = formData;

    const payload = {
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      country: country,
    };

    try {
      const response = await fetch(
        "https://ulocoreapi.runasp.net/api/WaitLists/joinWaitList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
    //   console.log("Form submitted:", data);

      setIsLoading(false);
      setShowConfetti(true);
      setStep(2); // move to success step

      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
      return data;
    } catch (error) {
      setIsLoading(false);
      console.error(error.response);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative">
      {/* 🎉 Full-screen Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}

      {step === 1 ? (
        // Step 1: Form
        <form onSubmit={handleSubmit} className="my-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#8B5E3C] mb-4">
            Join the Waitlist!
          </h2>

          {["fullName", "email", "phoneNumber", "country"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 capitalize mb-1">
                {field.replace(/([A-Z])/g, " $1")}
                {field !== "phoneNumber" && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required={field !== "phoneNumber"}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition-all duration-200 ${
                  errors[field as keyof typeof errors]
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-[#8B5E3C]`}
              />

              {errors[field as keyof typeof errors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof typeof errors]}
                </p>
              )}
            </div>
          ))}

          <div className="pt-5">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 text-[17px] rounded-lg text-white transition ${
                isLoading
                  ? "bg-[#8B5E3C]/70 cursor-not-allowed"
                  : "bg-[#8B5E3C] hover:bg-[#75492E]"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        // Step 2: Success Message
        <div className="flex flex-col items-center justify-center mt-[2rem] text-center p-4">
          <h2 className="text-3xl text-center font-bold text-[#8B5E3C] mb-4">
            Form Submitted
            <br /> Successfully!
          </h2>
          <p className="text-gray-700">
            Thank you, {formData.fullName}. We will get back to you shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default HeroForm;
