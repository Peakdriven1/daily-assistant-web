'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const features = [
    { icon: '⬇️', label: 'Download Video', href: '/download' },
    { icon: '📄', label: 'Organize Files', href: '/organize' },
    { icon: '🔥', label: 'Viral Trends', href: '/trends' },
    { icon: '☺️', label: "I'm Bored", href: '/bored' },
    { icon: '⬆️', label: 'Schedule Post', href: '/schedule' },
    { icon: '💪', label: 'Gym Tracker', href: '/gym' },
    { icon: '☀️', label: 'Morning Boost', href: '/boost' },
  ];

  return (
    <main className="min-h-screen bg-[#DFD7C3] text-[#3F3329] p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2 mt-8">Daily Assistant</h1>
      <p className="text-center text-sm mb-10">
        Your all-in-one power tool to organize, create, and thrive — all in one place.
      </p>

      <div className="grid gap-4 w-full max-w-2xl">
        {features.map((feature) => (
          <button
            key={feature.label}
            onClick={() => router.push(feature.href)}
            className="flex items-center justify-start gap-3 bg-[#664D39] text-white py-4 px-6 rounded-2xl shadow-lg hover:bg-[#4D392C] transition-all"
          >
            <span className="text-lg">{feature.icon}</span>
            <span className="text-sm font-medium">{feature.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
