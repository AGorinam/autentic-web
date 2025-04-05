import React from 'react';

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <h1 className="text-4xl font-bold mb-8">Product</h1>
      <p className="text-lg mb-6">
        Our product helps Product teams uncover real user needs by turning scattered feedback 
        into actionable insights — with source clips and full context, just a chat away.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2">
            <li>• Centralize feedback from multiple sources</li>
            <li>• AI-powered insights and categorization</li>
            <li>• Quick search across all customer feedback</li>
            <li>• Source clips with full context</li>
          </ul>
        </div>
        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Benefits</h3>
          <ul className="space-y-2">
            <li>• Discover customer needs faster</li>
            <li>• Make data-driven product decisions</li>
            <li>• Prioritize features based on real feedback</li>
            <li>• Improve customer satisfaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 