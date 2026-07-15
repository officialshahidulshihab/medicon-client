import Image from "next/image";
import Link from "next/link";


const VALUES = [
  {
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Trust & Verification",
    desc: "Every doctor on our platform is manually verified with their credentials, licenses, and hospital affiliations confirmed.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Patient First",
    desc: "All product decisions start with one question: does this make it easier for a patient to get the care they need?",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
    title: "Clinical Excellence",
    desc: "We partner only with doctors who maintain high patient satisfaction scores and have demonstrated clinical expertise.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Community Health",
    desc: "Beyond appointments, we invest in health literacy through our blog and free community health events across Bangladesh.",
  },
];


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">

      
      <section className="py-24 px-6 text-center">
        <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Our Mission
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight mb-6">
          Making Healthcare Accessible
          <br /> for Every Bangladeshi
        </h1>
        <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
          MediCon was founded with a singular mission: to remove the barriers
          between patients and specialist doctors across Bangladesh. We believe
          quality healthcare should be just a few clicks away, regardless of where
          you live.
        </p>
      </section>

      
      <div className="w-full h-px bg-white/5" />

      
      <section className="py-20 px-6">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          Founded by
        </h2>

        <div className="flex justify-center">
          <div
            className="flex flex-col items-center gap-4 bg-[#0d1526] border border-white/10 rounded-2xl p-8 w-64 hover:border-cyan-500/30 transition-colors"
          >
           
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-500/30 relative">
              <Image
                src="https://i.ibb.co/pryzZXzW/photo-2026-07-15-16-04-41.jpg"
                alt="Shahidul Shihab"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

         
            <div className="text-center">
              <p className="text-white font-semibold text-base">Shahidul Shihab</p>
              <p className="text-cyan-400 text-sm mt-0.5">Founder & Developer</p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="py-20 px-6">
        <h2 className="text-2xl font-bold text-white text-center mb-10">
          Our Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-[#0d1526] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      <div className="w-full h-px bg-white/5" />

      
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-[#0d1526] border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Join Bangladesh's Healthcare Revolution
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Whether you're a patient finding a doctor or a specialist looking to
            grow your practice, MedConnect BD is for you.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/doctors"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold transition-colors"
            >
              Find a Doctor
            </Link>
            <a
              href="/signup"
              className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-sm font-medium transition-colors"
            >
              Register as Doctor
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;