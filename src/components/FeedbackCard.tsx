import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, ThumbsDown, Flag, MessageCircle } from 'lucide-react';
import type { Feedback } from '../types';

interface Props {
  feedback: Feedback;
  onVote: (id: string, value: number) => void;
  onReport: (id: string) => void;
  onReply: (id: string) => void;
}

export default function FeedbackCard({ feedback, onVote, onReport, onReply }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <p className="text-gray-600 mb-4">{feedback.content}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex space-x-4">
          <button
            onClick={() => onVote(feedback.id, 1)}
            className="flex items-center space-x-1 hover:text-blue-600"
          >
            <ThumbsUp size={16} />
            <span>{feedback.votes}</span>
          </button>
          <button
            onClick={() => onVote(feedback.id, -1)}
            className="flex items-center space-x-1 hover:text-red-600"
          >
            <ThumbsDown size={16} />
          </button>
          <button
            onClick={() => onReply(feedback.id)}
            className="flex items-center space-x-1 hover:text-purple-600"
          >
            <MessageCircle size={16} />
            <span>{feedback.replies.length} replies</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span>{formatDistanceToNow(feedback.timestamp)} ago</span>
          <button
            onClick={() => onReport(feedback.id)}
            className="flex items-center space-x-1 hover:text-red-600"
            title="Report inappropriate content"
          >
            <Flag size={16} />
          </button>
        </div>
      </div>

      {feedback.replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          {feedback.replies.map((reply) => (
            <div key={reply.id} className="mb-2 last:mb-0">
              <p className="text-gray-600">{reply.content}</p>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span>{formatDistanceToNow(reply.timestamp)} ago</span>
                <button
                  onClick={() => onReport(reply.id)}
                  className="flex items-center space-x-1 hover:text-red-600"
                >
                  <Flag size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}