"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBell, FaRegWindowClose, FaStethoscope } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { PiSignOutLight } from "react-icons/pi";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Find Doctors", href: "/doctors" },
    { label: "About Us", href: "/about" },
  ];
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  if (pathname?.startsWith("/signin")) return null;
  if (pathname?.startsWith("/signup")) return null;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role;
  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/signin");
        },
        onError: () => {
         
          router.push("/signin");
        },
      },
    });
  };
  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(6, 14, 28, 0.92)",
        borderBottom: "1px solid rgba(30, 58, 95, 0.35)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00b4d8, #0077a8)",
                boxShadow: "0 0 14px rgba(0,180,216,0.4)",
              }}
            >
              <FaStethoscope />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Medi<span style={{ color: "#00b4d8" }}>Con</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(link.href) ? "#00d4f5" : "#7aafc9",
                  background: isActive(link.href)
                    ? "rgba(0,180,216,0.12)"
                    : "transparent",
                  border: isActive(link.href)
                    ? "1px solid rgba(0,180,216,0.25)"
                    : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {!userRole && (
              <>
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-medium transition-colors"
                  style={{ color: "#7aafc9" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) => (e.target.style.color = "#7aafc9")}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(90deg, #00b4d8, #0096c7)",
                    boxShadow: "0 2px 14px rgba(0,180,216,0.35)",
                  }}
                >
                  Get Started
                </Link>
              </>
            )}

            {userRole === "patient" && (
              <>
                <Link
                  href="/dashboard/patient"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: "rgba(0,180,216,0.12)",
                    border: "1px solid rgba(0,180,216,0.3)",
                    color: "#00d4f5",
                  }}
                >
                  <MdDashboard />
                  Dashboard
                </Link>

                <button
                  className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ color: "#7aafc9" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#00d4f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7aafc9")
                  }
                >
                  <FaBell />

                  <span
                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                    style={{ background: "#00b4d8" }}
                  />
                </button>

                <button
                  onClick={onSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: "#7aafc9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7aafc9")
                  }
                >
                  <PiSignOutLight />
                  Sign Out
                </button>
              </>
            )}

            {userRole === "doctor" && (
              <>
                <Link
                  href="/dashboard/doctor"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: "rgba(0,180,216,0.12)",
                    border: "1px solid rgba(0,180,216,0.3)",
                    color: "#00d4f5",
                  }}
                >
                  <MdDashboard />
                  Dashboard
                </Link>

                <Link
                  href="/dashboard/doctor/add-listing"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: "#7aafc9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7aafc9")
                  }
                >
                  <HiPlus />
                  Add Listing
                </Link>

                <button
                  className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ color: "#7aafc9" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#00d4f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7aafc9")
                  }
                >
                  <FaBell />
                  <span
                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                    style={{ background: "#00b4d8" }}
                  />
                </button>

                <button
                  onClick={onSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: "#7aafc9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7aafc9")
                  }
                >
                  <PiSignOutLight />
                  Sign Out
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "#7aafc9" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaRegWindowClose /> : <IoMdMenu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-5 pt-2 flex flex-col gap-1"
          style={{ borderTop: "1px solid rgba(30,58,95,0.4)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                color: isActive(link.href) ? "#00d4f5" : "#7aafc9",
                background: isActive(link.href)
                  ? "rgba(0,180,216,0.1)"
                  : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="my-2"
            style={{ borderTop: "1px solid rgba(30,58,95,0.4)" }}
          />

          {!userRole && (
            <div className="flex flex-col gap-2">
              <Link
                href="/signin"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-center transition-colors"
                style={{ color: "#7aafc9" }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-full text-sm font-bold text-white text-center"
                style={{
                  background: "linear-gradient(90deg, #00b4d8, #0096c7)",
                  boxShadow: "0 2px 14px rgba(0,180,216,0.3)",
                }}
              >
                Get Started
              </Link>
            </div>
          )}

          {userRole === "patient" && (
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard/patient"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(0,180,216,0.1)",
                  color: "#00d4f5",
                }}
              >
                <MdDashboard />
                Dashboard
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ color: "#7aafc9" }}
              >
                <FaBell />
                Notifications
              </button>
              <button
                onClick={() => {
                  onSignOut();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ color: "#7aafc9" }}
              >
                <PiSignOutLight />
                Sign Out
              </button>
            </div>
          )}

          {userRole === "doctor" && (
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard/doctor"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(0,180,216,0.1)",
                  color: "#00d4f5",
                }}
              >
                <MdDashboard />
                Dashboard
              </Link>
              <Link
                href="/dashboard/doctor/add-listing"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ color: "#7aafc9" }}
              >
                <HiPlus />
                Add Listing
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ color: "#7aafc9" }}
              >
                <FaBell />
                Notifications
              </button>
              <button
                onClick={() => {
                  onSignOut();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ color: "#7aafc9" }}
              >
                <PiSignOutLight />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
