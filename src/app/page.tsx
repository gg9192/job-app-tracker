export default function LandingPage() {
  return (
    <main className="min-h-screen text-white flex items-center justify-center px-4">
      <section className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight drop-shadow-md">
          Organize Your Job Hunt with Confidence
        </h1>
        <p className="text-lg mb-8 text-white/90 drop-shadow-sm">
          Our job tracker helps you stay on top of every application, interview, and offer: beautifully and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/sign-up"
            className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition"
          >
            Login
          </a>
        </div>
      </section>
    </main>
  );
}
