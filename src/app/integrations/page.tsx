import React from 'react';

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <h1 className="text-4xl font-bold mb-8">Integrations</h1>
      <p className="text-lg mb-6">
        Connect autentic.ai with your existing tools to centralize feedback from multiple sources
        and get deeper insights from all your customer touchpoints.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2">
            <li>• Zendesk</li>
            <li>• Intercom</li>
            <li>• Help Scout</li>
            <li>• Front</li>
          </ul>
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Product Tools</h3>
          <ul className="space-y-2">
            <li>• Productboard</li>
            <li>• Linear</li>
            <li>• Jira</li>
            <li>• Asana</li>
          </ul>
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">User Research</h3>
          <ul className="space-y-2">
            <li>• UserTesting</li>
            <li>• Dovetail</li>
            <li>• Maze</li>
            <li>• Lookback</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 bg-white/5 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Custom Integrations</h2>
        <p>
          Need a custom integration? Contact our team to discuss how we can connect 
          with your specific tools and workflows.
        </p>
      </div>
    </div>
  );
} 