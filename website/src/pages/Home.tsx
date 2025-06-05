import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";
import TestimonialCard from "../components/TestimonialCard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans bg-gray-500 text-body">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary text-white text-center py-20 px-4">
        <motion.h1
          className="text-5xl font-bold leading-tight drop-shadow-sm"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Capture moments. <br /> Keep bonds alive.
        </motion.h1>
        <motion.p
          className="mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A memory vault for your relationships
        </motion.p>
        <motion.a
          href="#"
          className="mt-8 inline-block bg-cta text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-opacity-80 transition"
          whileHover={{ scale: 1.05 }}
        >
          📱 Download on Play Store
        </motion.a>

        {/* Decorative blob */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-accent opacity-20 rounded-full blur-3xl animate-pulse" />
      </section>

      {/* Divider */}
      <div className="h-4 bg-accent/20" />

      {/* Features */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-center text-header mb-6">
          🌟 Features to Cherish
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["People Vault", "Store memories of those who matter most.", "🧑‍🤝‍🧑"],
            [
              "Memory Collection",
              "Organize thoughts, photos, and videos.",
              "🗂️",
            ],
            ["Shared Memories", "Invite loved ones to contribute.", "🤝"],
            ["Memory Timeline", "Visualize your emotional journey.", "🕰️"],
            [
              "Global Discovery",
              "Explore how others cherish connections.",
              "🌍",
            ],
          ].map(([title, desc, icon]) => (
            <FeatureCard
              key={title}
              title={`${icon} ${title}`}
              description={desc as string}
            />
          ))}
        </div>
      </section>

      {/* Screenshot Carousel */}
      <section className="p-8 bg-secondary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">📸 Screenshots</h2>
        <p className="mb-6">Peek into the experience</p>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={`/assets/screenshot${i}.png`}
              className="h-64 w-auto rounded-xl shadow snap-start transition-transform hover:scale-105"
              alt={`Screenshot ${i}`}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-4 bg-accent/20" />

      {/* Testimonials */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-header text-center mb-4">
          💬 What our users say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <TestimonialCard
            name="Aarav"
            quote="It brought me closer to my family again."
            avatar="/assets/avatar1.png"
          />
          <TestimonialCard
            name="Zoya"
            quote="A beautiful way to revisit emotions."
            avatar="/assets/avatar2.png"
          />
          <TestimonialCard
            name="Vihaan"
            quote="Helps me never forget what matters."
            avatar="/assets/avatar3.png"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
