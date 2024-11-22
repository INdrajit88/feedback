import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Props {
  onSubmit: (feedback: { content: string }) => void;
}

export default function FeedbackForm({ onSubmit }: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({ content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Share Your Thoughts</h2>

      <div className="mb-6">
        <textarea
          placeholder="Share your feedback anonymously..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
      >
        <Send size={20} />
        <span>Submit Feedback</span>
      </button>
    </form>
  );
}