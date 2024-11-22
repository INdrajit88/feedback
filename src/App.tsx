import React, { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import type { Feedback } from './types';
import FeedbackForm from './components/FeedbackForm';
import FeedbackCard from './components/FeedbackCard';

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'top'>('latest');

  const handleSubmitFeedback = (newFeedback: { content: string }) => {
    const feedback: Feedback = {
      ...newFeedback,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      votes: 0,
      replies: [],
      isReported: false,
    };
    setFeedbacks([feedback, ...feedbacks]);
  };

  const handleVote = (id: string, value: number) => {
    setFeedbacks(
      feedbacks.map((f) =>
        f.id === id ? { ...f, votes: f.votes + value } : f
      )
    );
  };

  const handleReport = (id: string) => {
    setFeedbacks(
      feedbacks.map((f) =>
        f.id === id ? { ...f, isReported: true } : f
      )
    );
  };

  const handleReply = (id: string) => {
    const content = prompt('Enter your reply:');
    if (!content) return;

    setFeedbacks(
      feedbacks.map((f) =>
        f.id === id
          ? {
              ...f,
              replies: [
                ...f.replies,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  content,
                  timestamp: new Date(),
                  votes: 0,
                  isReported: false,
                },
              ],
            }
          : f
      )
    );
  };

  const filteredFeedbacks = feedbacks
    .filter((f) => !f.isReported)
    .sort((a, b) =>
      sortBy === 'latest'
        ? b.timestamp.getTime() - a.timestamp.getTime()
        : b.votes - a.votes
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Campus Pulse</h1>
          <p className="text-blue-100">Share your thoughts anonymously</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FeedbackForm onSubmit={handleSubmitFeedback} />

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <RefreshCcw size={20} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'top')}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="latest">Latest First</option>
                <option value="top">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl mb-2">No feedback yet</p>
              <p>Be the first to share your thoughts!</p>
            </div>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                onVote={handleVote}
                onReport={handleReport}
                onReply={handleReply}
              />
            ))
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>Campus Pulse made with 💙 INdrajit Ari</p>
          <p className="text-sm mt-2">
            Your privacy is our priority. All feedback is completely anonymous.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;