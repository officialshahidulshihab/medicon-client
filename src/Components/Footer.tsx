"use client"    
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaStethoscope } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
    const pathname = usePathname();
      if (pathname?.startsWith("/dashboard")) return null;
      if (pathname?.startsWith("/signin")) return null;
      if (pathname?.startsWith("/signup")) return null;
    return (
        <footer style={{ backgroundColor: "#060d18", borderTop: "1px solid #1a3050" }}>
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
 
        
        <div>
          
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#3b9eff" }}
            >
              <FaStethoscope size={18} color="#ffffff" />
            </div>
            <span className="text-lg font-bold" style={{ color: "#ffffff" }}>
              Medi<span style={{ color: "#3b9eff" }}>Con</span>
            </span>
          </div>
 
         
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#4e7a9f" }}>
            Bangladesh&apos;s most trusted platform for finding and booking
            specialist doctors across all 8 divisions.
          </p>
 
          
          <div className="flex items-center gap-3">
            {[
              { icon: <FaFacebookF size={14} />, label: "Facebook" },
              { icon: <FaTwitter size={14} />,   label: "Twitter"  },
              { icon: <FaLinkedinIn size={14} />, label: "LinkedIn" },
              { icon: <FaYoutube size={14} />,    label: "YouTube"  },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:border-[#3b9eff]"
                style={{
                  backgroundColor: "#0d1b2e",
                  border: "1px solid #1a3050",
                  color: "#4e7a9f",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
 
       
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-[0.15em] mb-6"
            style={{ color: "#ffffff" }}
          >
            Quick Links
          </h4>
          <ul className="flex flex-col gap-4">
            {["Find Doctors", "About Us", "Health Blog", "For Doctors"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#3b9eff" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
 
        
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-[0.15em] mb-6"
            style={{ color: "#ffffff" }}
          >
            Specialties
          </h4>
          <ul className="flex flex-col gap-4">
            {["Cardiology", "Neurology", "Pediatrics", "Gynecology", "Dermatology"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#3b9eff" }}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
 
        
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-[0.15em] mb-6"
            style={{ color: "#ffffff" }}
          >
            Contact
          </h4>
          <ul className="flex flex-col gap-5">
            <li className="flex items-start gap-3">
              <MdLocationOn size={18} style={{ color: "#3b9eff", marginTop: "2px", flexShrink: 0 }} />
              <span className="text-sm leading-relaxed" style={{ color: "#4e7a9f" }}>
                House 42, Road 11, Banani, Dhaka 1213, Bangladesh
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MdPhone size={18} style={{ color: "#3b9eff", flexShrink: 0 }} />
              <span className="text-sm" style={{ color: "#4e7a9f" }}>
                +880 1700-000000
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MdEmail size={18} style={{ color: "#3b9eff", flexShrink: 0 }} />
              <span className="text-sm" style={{ color: "#4e7a9f" }}>
                hello@MediCon.com
              </span>
            </li>
          </ul>
        </div>
      </div>
 
      
      <div style={{ borderTop: "1px solid #1a3050" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#2a4a6e" }}>
            © 2026 MediCon. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "#2a4a6e" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;