"use client";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaStethoscope } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

const SignInPage = () => {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    if (data) {
      toast.success("SignIn Successfully");
      if (data?.user?.role === "doctor") {
        router.push("/dashboard/doctor");
      } else {
        router.push("/dashboard/patient");
      }
    }
    if (error) {
      toast.error(error?.message);
    }

    
  };
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
         
          <div
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white text-center"
            style={{ background: "#0b1e33" }}
          >
            Sign In
          </div>
        
          <a
            href="/signup"
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-[#3e6a88] text-center hover:text-white transition-colors"
          >
            Create Account
          </a>
        </div>

        

      
        <form onSubmit={handleSubmit}>
       
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
              className="w-full rounded-full text-sm text-white placeholder-[#2e5570] px-5 py-3 outline-none transition-colors"
              style={{
                background: "#091628",
                border: "1px solid #1a3350",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#00b4d8")}
              onBlur={(e) => (e.target.style.borderColor = "#1a3350")}
            />
          </div>

         
          <div className="mb-2">
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
                className="w-full rounded-full text-sm text-white placeholder-[#2e5570] px-5 py-3 pr-12 outline-none transition-colors"
                style={{
                  background: "#091628",
                  border: "1px solid #1a3350",
                }}
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

          
          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className="text-[#00b4d8] text-xs hover:underline"
            >
              Forgot password?
            </a>
          </div>

         
          <button
            type="submit"
            className="w-full py-3.5 rounded-full text-white font-bold text-sm tracking-wide transition-opacity hover:opacity-90 active:opacity-80"
            style={{
              background: "linear-gradient(90deg, #00b4d8 0%, #0096c7 100%)",
              boxShadow: "0 4px 18px rgba(0,180,216,0.35)",
            }}
          >
            Sign In
          </button>
        </form>

       
        <p className="text-center text-[#3e6a88] text-xs mt-5">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#00b4d8] hover:underline font-medium"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
