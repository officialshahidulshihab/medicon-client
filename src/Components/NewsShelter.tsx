"use client";
 
import { useState } from "react";
import { MdEmail, MdCheckCircle } from "react-icons/md";
const NewsShelter = () => {
     const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
 
  const handleSubscribe = () => {
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setShowPopup(true);
    setEmail("");
  };
    return (
        <section
      className="relative py-24 flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundColor: "#060d18" }}
    >
     
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: "#0d1b2e", border: "1px solid #1a3050" }}
      >
        <MdEmail size={28} style={{ color: "#3b9eff" }} />
      </div>
 
      
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "#ffffff" }}
      >
        Health Tips in Your Inbox
      </h2>
 
      
      <p
        className="text-base max-w-lg mb-8"
        style={{ color: "#4e7a9f", lineHeight: "1.7" }}
      >
        Get weekly health advice from Bangladesh&apos;s top specialists,
        appointment reminders, and platform updates.
      </p>
 
     
      <div className="flex items-center gap-0 w-full max-w-md">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          className="flex-1 px-5 py-3.5 text-sm outline-none rounded-l-full"
          style={{
            backgroundColor: "#0d1b2e",
            border: "1px solid #1a3050",
            borderRight: "none",
            color: "#ffffff",
          }}
        />
        <button
          onClick={handleSubscribe}
          className="px-6 py-3.5 text-sm font-bold rounded-r-full cursor-pointer transition-opacity hover:opacity-90 active:opacity-75"
          style={{ backgroundColor: "#3b9eff", color: "#ffffff" }}
        >
          Subscribe Now
        </button>
      </div>
 
    
      {error && (
        <p className="mt-3 text-xs" style={{ color: "#f87171" }}>
          {error}
        </p>
      )}
 
     
      <p className="mt-4 text-xs" style={{ color: "#2a4a6e" }}>
        No spam. Unsubscribe at any time. We respect your privacy.
      </p>
 
      
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative flex flex-col items-center text-center rounded-2xl p-8 max-w-sm w-full"
            style={{
              backgroundColor: "#0d1b2e",
              border: "1px solid #1a3050",
              boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
         
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: "#0a2540" }}
            >
              <MdCheckCircle size={36} style={{ color: "#3b9eff" }} />
            </div>
 
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "#ffffff" }}
            >
              You&apos;re subscribed!
            </h3>
            <p className="text-sm mb-6" style={{ color: "#4e7a9f" }}>
              Welcome aboard. You&apos;ll start receiving weekly health tips
              from Bangladesh&apos;s top specialists straight to your inbox.
            </p>
 
            <button
              onClick={() => setShowPopup(false)}
              className="px-8 py-2.5 text-sm font-bold rounded-full cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#3b9eff", color: "#ffffff" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
    );
};

export default NewsShelter;