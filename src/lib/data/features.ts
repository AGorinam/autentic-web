import { Features } from '../types/features';

export const features = [
  {
    id: 'integrations',
    title: 'Connect Your Feedback Sources',
    subtitle: 'Import customer feedback from multiple channels into one unified workspace. Easily connect with Intercom, Zendesk, customer interviews, and more.',
    keyPoints: [
      'Seamless integration with popular platforms',
      'Automatic feedback synchronization',
      'Centralized feedback management'
    ],
    media: {
      desktop: '/images/features/integrations-dashboard.png',
      mobile: '/images/features/integrations-dashboard.png'
    }
  },
  {
    id: 'chat',
    title: 'Ask Questions, Get Insights',
    subtitle: 'Chat with your customer feedback in natural language. Ask specific questions and get instant insights backed by real user quotes and source contexts.',
    keyPoints: [
      'Natural language interactions',
      'Real-time feedback analysis',
      'Context-aware responses'
    ],
    media: {
      desktop: '/images/features/chat-interface.png',
      mobile: '/images/features/chat-interface.png'
    }
  },
  {
    id: 'insights',
    title: 'Discover What Users Really Want',
    subtitle: 'Uncover patterns, track sentiment over time, and identify the most requested features with AI-powered analytics that go beyond basic categorization.',
    keyPoints: [
      'Advanced pattern recognition',
      'Sentiment tracking over time',
      'Feature request prioritization'
    ],
    media: {
      desktop: '/images/features/insights-dashboard.png',
      mobile: '/images/features/insights-dashboard.png'
    }
  },
  {
    id: 'share',
    title: 'Share with your team',
    subtitle: 'Share with your team the product opportunities and stay focused on what matters most.',
    keyPoints: [
      'Share clips with your team',
      'Share the entire transcript',
      'Centralized feedback management'
    ],
    media: {
      desktop: '/images/features/integrations-dashboard.png',
      mobile: '/images/features/integrations-dashboard.png'
    }
  }
] as const; 