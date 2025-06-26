import { ThreadData } from './ThreadCard';

// Sample thread data - replace with your actual data source
export const sampleThreads: ThreadData[] = [
  {
    id: "1",
    title: "Weekend Hiking Plans",
    latestPost: "Who's joining the sunrise trek tomorrow?",
    latestImage: "https://picsum.photos/400/200?random=1",
    contributors: [
      { id: "1", avatar: "https://picsum.photos/32/32?random=10" },
      { id: "2", avatar: "https://picsum.photos/32/32?random=11" },
      { id: "3", avatar: "https://picsum.photos/32/32?random=12" },
    ],
    additionalCount: 3,
    timeAgo: "2h ago",
    createdBy: "@alex",
    isActive: true,
  },
  {
    id: "2",
    title: "Book Club Discussion",
    latestPost: "What did everyone think about chapter 5?",
    contributors: [
      { id: "4", avatar: "https://picsum.photos/32/32?random=13" },
      { id: "5", avatar: "https://picsum.photos/32/32?random=14" },
    ],
    additionalCount: 5,
    timeAgo: "4h ago",
    createdBy: "@sarah",
    isActive: false,
  },
  {
    id: "3",
    title: "Photography Challenge",
    latestPost: "Here's my sunset shot from yesterday!",
    latestImage: "https://picsum.photos/400/200?random=2",
    contributors: [
      { id: "6", avatar: "https://picsum.photos/32/32?random=15" },
      { id: "7", avatar: "https://picsum.photos/32/32?random=16" },
      { id: "8", avatar: "https://picsum.photos/32/32?random=17" },
      { id: "9", avatar: "https://picsum.photos/32/32?random=18" },
    ],
    additionalCount: 12,
    timeAgo: "1d ago",
    createdBy: "@mike",
    isActive: true,
  },
  {
    id: "4",
    title: "Meditation & Mindfulness",
    latestPost: "Morning meditation session was incredible today 🧘‍♀️",
    contributors: [
      { id: "10", avatar: "https://picsum.photos/32/32?random=19" },
      { id: "11", avatar: "https://picsum.photos/32/32?random=20" },
      { id: "12", avatar: "https://picsum.photos/32/32?random=21" },
    ],
    additionalCount: 8,
    timeAgo: "6h ago",
    createdBy: "@zen_master",
    isActive: true,
  },
  {
    id: "5",
    title: "Recipe Exchange",
    latestPost: "Anyone have a good vegan lasagna recipe?",
    latestImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
    contributors: [
      { id: "13", avatar: "https://picsum.photos/32/32?random=22" },
      { id: "14", avatar: "https://picsum.photos/32/32?random=23" },
    ],
    additionalCount: 15,
    timeAgo: "3h ago",
    createdBy: "@foodie_jane",
    isActive: false,
  }
];