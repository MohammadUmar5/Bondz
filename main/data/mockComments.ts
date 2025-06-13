export interface CommentUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

export interface Comment {
  id: string;
  user: CommentUser;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      id: "1",
      username: "jenny_peace",
      displayName: "Jenny Wilson",
      avatar: "🌺",
      isVerified: true,
    },
    content:
      "This is so beautiful! I had a similar moment yesterday watching the clouds ☁️",
    timestamp: "2h",
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        user: {
          id: "2",
          username: "alex_zen",
          displayName: "Alex Chen",
          avatar: "🧘‍♂️",
          isVerified: false,
        },
        content: "Cloud watching is so underrated! 🌤️",
        timestamp: "1h",
        likes: 3,
        isLiked: true,
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "3",
      username: "mike_mindful",
      displayName: "Mike Johnson",
      avatar: "🍃",
      isVerified: false,
    },
    content:
      "Your garden posts always inspire me to spend more time in nature. Thank you for sharing! 🙏",
    timestamp: "1h",
    likes: 8,
    isLiked: false,
  },
  {
    id: "3",
    user: {
      id: "4",
      username: "lisa_light",
      displayName: "Lisa Rodriguez",
      avatar: "✨",
      isVerified: true,
    },
    content: "Morning dew has that magical quality doesn't it? ✨",
    timestamp: "45m",
    likes: 5,
    isLiked: true,
  },
];