export interface Feedback {
  id: string;
  content: string;
  timestamp: Date;
  votes: number;
  replies: Reply[];
  isReported: boolean;
}

export interface Reply {
  id: string;
  content: string;
  timestamp: Date;
  votes: number;
  isReported: boolean;
}