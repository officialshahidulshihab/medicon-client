import Link from "next/link";



const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-6">

      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative text-center max-w-lg mx-auto">

       
        <div className="flex justify-center mb-8">
          <div className="relative">
          
            <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        
        <p className="text-8xl font-bold text-white/5 select-none leading-none mb-2"
          style={{
            fontSize: "clamp(5rem, 15vw, 9rem)",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </p>

       
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 -mt-4">
          Page Not Found
        </h1>

    
        <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved.
          <br className="hidden sm:block" />
          Let's get you back on track.
        </p>

       
        <div className="flex justify-center mb-10">
          <svg
            viewBox="0 0 300 50"
            className="w-64 h-10 text-cyan-500/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="0,25 40,25 55,25 65,5 75,45 85,10 95,40 105,25 145,25 160,25 175,25 185,5 195,45 205,10 215,40 225,25 300,25" />
          </svg>
        </div>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/doctors"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors"
          >
            Browse Doctors
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;