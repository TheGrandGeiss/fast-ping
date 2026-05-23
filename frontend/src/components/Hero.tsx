import logo from '../assets/pinged.png';

const Hero = () => {
  return (
    <main className='min-h-screen bg-white text-black px-6'>
      {/* NAVBAR */}
      <nav className='flex justify-between items-center max-w-6xl mx-auto py-6'>
        <div className='flex items-center gap-3'>
          <img
            src={logo}
            alt='Pinged Logo'
            width={55}
            className='rounded-xl'
          />
        </div>

        <button className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-2xl px-6 py-3 font-medium text-white shadow-md'>
          Get Extension
        </button>
      </nav>

      {/* HERO */}
      <section className='max-w-6xl mx-auto text-center pt-20 pb-14'>
        <h2 className='text-5xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto'>
          See How Fast Websites Perform On{' '}
          <span className='text-blue-600'>Your Network</span>
        </h2>

        <p className='text-zinc-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed'>
          Pinged analyzes website-specific speed, latency and connection quality
          directly from your browser so you can understand why some websites
          feel fast while others struggle.
        </p>

        <div className='flex justify-center gap-4 mt-10 flex-wrap'>
          <button className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-7 py-4 rounded-2xl font-semibold text-white shadow-md'>
            Get Extension
          </button>

          <button className='border border-zinc-300 hover:border-zinc-400 transition-all duration-300 px-7 py-4 rounded-2xl font-semibold bg-white'>
            Learn More
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className='max-w-6xl mx-auto grid md:grid-cols-3 gap-6 pb-20'>
        {/* CARD 1 */}
        <div className='bg-zinc-50 border border-zinc-200 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300'>
          <div className='w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-2xl'>
            🌐
          </div>

          <h3 className='text-xl font-semibold mb-3'>
            Website-specific Internet Speed
          </h3>

          <p className='text-zinc-600 leading-relaxed'>
            Monitor how your internet performs on individual websites instead of
            relying on generic speed tests.
          </p>
        </div>

        {/* CARD 2 */}
        <div className='bg-zinc-50 border border-zinc-200 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300'>
          <div className='w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-2xl'>
            📊
          </div>

          <h3 className='text-xl font-semibold mb-3'>
            Detailed Performance Metrics
          </h3>

          <p className='text-zinc-600 leading-relaxed'>
            View latency, loading behaviour and connection quality metrics to
            understand what slows websites down.
          </p>
        </div>

        {/* CARD 3 */}
        <div className='bg-zinc-50 border border-zinc-200 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300'>
          <div className='w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-2xl'>
            ⚡
          </div>

          <h3 className='text-xl font-semibold mb-3'>
            Instant One-click Diagnosis
          </h3>

          <p className='text-zinc-600 leading-relaxed'>
            Open the extension on any website and instantly analyze how well it
            performs on your current network.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className='max-w-4xl mx-auto text-center pb-24'>
        <div className='bg-zinc-50 border border-zinc-200 rounded-[2rem] p-10'>
          <h3 className='text-3xl font-bold mb-4'>
            Diagnose Website Performance Instantly
          </h3>

          <p className='text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8'>
            Stop guessing why websites feel slow. Get real-time metrics directly
            from your browser with Pinged.
          </p>

          <button className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-white shadow-md'>
            Get Extension
          </button>
        </div>
      </section>
    </main>
  );
};

export default Hero;
