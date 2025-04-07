import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <h1 className="text-4xl font-bold mb-8">About autentic.ai</h1>
      <p className="text-lg mb-6">
        We help product teams transform complex customer feedback into actionable insights,
        so you can build what your customers actually need.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p>
            Our mission is to bridge the gap between customer feedback and product development.
            We believe that understanding the voice of your customers is the key to building
            successful products that truly resonate with users.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Our Story</h3>
          <p>
            autentic.ai was founded by product leaders who experienced firsthand the
            challenge of making sense of scattered feedback. We built the tool we
            always wished we had - a centralized platform that uses AI to
            transform raw feedback into clear, actionable insights.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-white/5 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li className="p-4">
            <h4 className="font-medium mb-2">Customer Obsession</h4>
            <p className="text-sm">We practice what we preach by centering everything around customer needs.</p>
          </li>
          <li className="p-4">
            <h4 className="font-medium mb-2">Actionable Insights</h4>
            <p className="text-sm">We transform data into clear direction, not just analytics.</p>
          </li>
          <li className="p-4">
            <h4 className="font-medium mb-2">Continuous Improvement</h4>
            <p className="text-sm">We&apos;re constantly evolving our platform based on user feedback.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
