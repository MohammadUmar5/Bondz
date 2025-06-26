import { ThreadData } from './ThreadCard';
import { sampleThreads } from './threadData';

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to randomly insert threads between posts
export function insertThreadsRandomly<T>(posts: T[], threads: ThreadData[] = sampleThreads): (T | ThreadData)[] {
  const result: (T | ThreadData)[] = [];
  const shuffledThreads = shuffleArray(threads);
  let threadIndex = 0;
  
  // Insert threads at random intervals (every 2-4 posts)
  for (let i = 0; i < posts.length; i++) {
    result.push(posts[i]);
    
    // Randomly decide whether to insert a thread (every 2-4 posts)
    const shouldInsertThread = (i + 1) % (Math.floor(Math.random() * 3) + 2) === 0;
    
    if (shouldInsertThread && threadIndex < shuffledThreads.length) {
      result.push(shuffledThreads[threadIndex]);
      threadIndex++;
    }
  }
  
  // Insert any remaining threads at the end
  while (threadIndex < shuffledThreads.length) {
    result.push(shuffledThreads[threadIndex]);
    threadIndex++;
  }
  
  return result;
}

// Function to check if an item is a thread
export function isThread<T>(item: T | ThreadData): item is ThreadData {
  return (item as ThreadData).contributors !== undefined;
}