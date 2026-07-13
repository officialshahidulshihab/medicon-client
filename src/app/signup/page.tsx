"use client";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaStethoscope } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import {
  IoIosEye,
  IoMdCheckmarkCircleOutline,
  IoMdEyeOff,
} from "react-icons/io";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

const SignUpPage = () => {
  const [role, setRole] = useState("patient");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router=useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: fullName,
      role,
    });
     if(data){
          toast.success("SignUp Successfully! Please SignIn")
          router.push('/signin')
        }
        if(error){
          toast.error(error?.message)
        }
    console.log(data, error);
  };

  const inputStyle = {
    background: "#091628",
    border: "1px solid #1a3350",
  };

  const inputClass =
    "w-full rounded-full text-sm text-white placeholder-[#2e5570] px-5 py-3 outline-none transition-colors";
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #0e2235 0%, #07111e 55%, #040a14 100%)",
      }}
    >
      <div className="flex flex-col items-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{
            background: "linear-gradient(135deg, #00b4d8 0%, #0077a8 100%)",
            boxShadow: "0 0 24px rgba(0,180,216,0.45)",
          }}
        >
          <FaStethoscope />
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tight">
          MediCon
        </h1>
        <p className="text-[#4fa3c0] text-sm mt-1">
          Bangladesh's most trusted health platform
        </p>
      </div>

      <div
        className="w-full max-w-[440px] rounded-2xl p-6"
        style={{
          background: "rgba(9, 20, 38, 0.92)",
          border: "1px solid rgba(30, 58, 95, 0.55)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="flex rounded-full p-1 mb-6"
          style={{ background: "#061020", border: "1px solid #1a3350" }}
        >
          <a
            href="/signin"
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-[#3e6a88] text-center hover:text-white transition-colors"
          >
            Sign In
          </a>

          <div
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white text-center"
            style={{ background: "#0b1e33" }}
          >
            Create Account
          </div>
        </div>

        <p className="text-[#3e6a88] text-[11px] font-bold uppercase tracking-widest mb-3">
          I Am Joining As
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className="relative flex flex-col items-center gap-2 rounded-2xl py-6 px-3 transition-all duration-200 text-left"
            style={{
              background: role === "patient" ? "#091e30" : "#061020",
              border: `1px solid ${role === "patient" ? "#00b4d8" : "#1a3350"}`,
            }}
          >
            {role === "patient" && (
              <span className="absolute top-2 right-2">
                <IoMdCheckmarkCircleOutline />
              </span>
            )}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: role === "patient" ? "#0e2a3c" : "#0b1e2e",
              }}
            >
              <CiUser
                color={role === "patient" ? "#00b4d8" : "#3a6080"}
                size={22}
              />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: role === "patient" ? "#00d4f5" : "#c8dae8" }}
            >
              I am a Patient
            </span>
            <span className="text-[#3e6a88] text-xs text-center leading-tight">
              Find &amp; book doctors
            </span>
          </button>

         
          <button
            type="button"
            onClick={() => setRole("doctor")}
            className="relative flex flex-col items-center gap-2 rounded-2xl py-6 px-3 transition-all duration-200 text-left"
            style={{
              background: role === "doctor" ? "#091e30" : "#061020",
              border: `1px solid ${role === "doctor" ? "#00b4d8" : "#1a3350"}`,
            }}
          >
            {role === "doctor" && (
              <span className="absolute top-2 right-2">
                <IoMdCheckmarkCircleOutline />
              </span>
            )}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: role === "doctor" ? "#0e2a3c" : "#0b1e2e",
              }}
            >
              <FaUserDoctor
                color={role === "doctor" ? "#00b4d8" : "#3a6080"}
                size={22}
              />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: role === "doctor" ? "#00d4f5" : "#c8dae8" }}
            >
              I am a Doctor
            </span>
            <span className="text-[#3e6a88] text-xs text-center leading-tight">
              List &amp; manage practice
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputClass}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00b4d8")}
              onBlur={(e) => (e.target.style.borderColor = "#1a3350")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00b4d8")}
              onBlur={(e) => (e.target.style.borderColor = "#1a3350")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${inputClass} pr-12`}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#00b4d8")}
                onBlur={(e) => (e.target.style.borderColor = "#1a3350")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3a6080] hover:text-[#00b4d8] transition-colors"
              >
                {showPassword ? <IoMdEyeOff /> : <IoIosEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full text-white font-bold text-sm tracking-wide transition-opacity hover:opacity-90 active:opacity-80"
            style={{
              background: "linear-gradient(90deg, #00b4d8 0%, #0096c7 100%)",
              boxShadow: "0 4px 18px rgba(0,180,216,0.35)",
            }}
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-[#3e6a88] text-xs mt-5">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-[#00b4d8] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-[#00b4d8] hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <p className="text-center text-[#3e6a88] text-xs mt-3">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-[#00b4d8] hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
