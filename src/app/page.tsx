"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import { submitWaitlist } from "./actions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tickerImages = ["/image1.jpeg", "/image2.jpeg", "/image3.jpeg"];
  const products = ["Rice", "Beans", "Yam", "Maize", "Vegetables", "Plantain", "Garri", "Tomatoes & Peppers", "Poultry"];
  const frequencies = ["Weekly", "Monthly", "Occasionally"];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await submitWaitlist(formData);

    setIsSubmitting(false);
    if (result?.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(result?.error || "Something went wrong.");
    }
  }

  return (
    <div className={`${poppins.className} min-h-screen flex flex-col bg-white text-manna-dark antialiased`}>
      
      {/* Pinned White Header (Stuck directly to top, zero margin/padding space) */}
      <header className="w-full overflow-hidden bg-white select-none pointer-events-none block mt-0 pt-0 lines-none">
        <div className="w-[200%] flex whitespace-nowrap animate-marquee">
          {[1, 2].map((set) => (
            <div key={set} className="w-1/2 flex shrink-0 items-start">
              {tickerImages.map((imgSrc, index) => (
                <img 
                  key={index}
                  src={imgSrc} 
                  alt="Manna Agritech continuous horizontal banner" 
                  className="h-11 sm:h-20 w-auto object-contain shrink-0" 
                />
              ))}
            </div>
          ))}
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-grow flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          
          {/* Header Section */}
          <div className="mb-10 text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Join the waitlist
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed font-normal">
              True wealth is health. We handle the market runs so you can focus on building your legacy.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {errorMessage && (
              <div className="text-xs font-medium text-red-600 bg-red-50 p-3 rounded-lg">
                {errorMessage}
              </div>
            )}

            <div className="relative">
              <label htmlFor="name" className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                Full Name <span className="text-manna-green">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-0 py-1.5 border-b border-gray-200 focus:outline-none focus:border-manna-green transition-colors text-sm text-gray-800 placeholder-gray-300 bg-transparent"
                placeholder="Your answer"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="email" className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                Email Address <span className="text-manna-green">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-0 py-1.5 border-b border-gray-200 focus:outline-none focus:border-manna-green transition-colors text-sm text-gray-800 placeholder-gray-300 bg-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div className="relative">
              <label htmlFor="phone" className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                Phone Number <span className="text-manna-green">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-0 py-1.5 border-b border-gray-200 focus:outline-none focus:border-manna-green transition-colors text-sm text-gray-800 placeholder-gray-300 bg-transparent"
                placeholder="e.g., +234..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                What farm product are you looking to buy? <span className="text-manna-green">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                  <label key={product} className="cursor-pointer select-none">
                    <input type="radio" name="product" value={product} required className="peer p-0 sr-only" />
                    <span className="inline-block px-3.5 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 bg-white transition-all duration-150 peer-checked:border-manna-green peer-checked:bg-manna-green peer-checked:text-white active:scale-95">
                      {product}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                How often do you restock your groceries? <span className="text-manna-green">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {frequencies.map((freq) => (
                  <label key={freq} className="cursor-pointer select-none">
                    <input type="radio" name="frequency" value={freq} required className="peer p-0 sr-only" />
                    <span className="inline-block px-4 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 bg-white transition-all duration-150 peer-checked:border-manna-green peer-checked:bg-manna-green peer-checked:text-white active:scale-95">
                      {freq}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-manna-green hover:bg-manna-dark text-white font-medium py-3 rounded-lg transition-colors text-sm disabled:opacity-50 active:scale-[0.99]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Premium Mobile-First Footer */}
      <footer className="w-full bg-manna-dark px-6 py-12 text-center text-white flex flex-col items-center mt-auto">
        
        <div className="max-w-xs mb-6">
          <h3 className="text-xs font-bold tracking-widest mb-2 text-manna-lime uppercase">
            The Manna Standard
          </h3>
          <p className="font-sans text-xs text-gray-400 leading-relaxed font-normal antialiased">
            Skip the traffic, the heat, and the rowdy market lines. Manna delivers farm-fresh produce straight to your doorstep. We take the stress out of your schedule.
          </p>
        </div>

        {/* Minimalist Stroke Icons */}
        <div className="flex justify-center gap-6">
          {/* Facebook Stroke Icon */}
          <a href="https://www.facebook.com/share/17CabrbNNm/" className="text-gray-400 hover:text-manna-lime transition-colors" aria-label="Facebook">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h5v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          
          {/* Instagram Stroke Icon */}
          <a href="https://www.instagram.com/manna_hub?igsh=MWxqNW92dTg2YmM3bA==" className="text-gray-400 hover:text-manna-lime transition-colors" aria-label="Instagram">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Fully Centered Success Sheet Container */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 transition-opacity duration-300">
          {/* Sheet Body (Centered on all screen form factors) */}
          <div className="bg-white w-full max-w-xs rounded-2xl p-6 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Custom Brand Logo Injection */}
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center overflow-hidden rounded-full border border-gray-100">
              <img 
                src="/logo.jpg" 
                alt="Manna Logo" 
                className="w-full h-full object-contain "
              />
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-1.5">You&apos;re on the list!</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              Thank you for connecting with Manna. Don&apos;t miss out on real-time community drops, make sure to join our social media accounts at the bottom of this page!
            </p>

            {/* Action button modified to redirect user directly to WhatsApp channel */}
            <button
              onClick={() => {
                setIsSuccess(false);
                window.open("https://whatsapp.com/channel/0029Vb8eWExHgZWlGKG5SD0H", "_blank", "noopener,noreferrer");
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg text-xs transition-colors"
            >
              Join WhatsApp Community
            </button>
          </div>
        </div>
      )}
    </div>
  );
}