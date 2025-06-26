import { BasicWrapper } from "@/components";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import SocialPost from "@/components/bondzSpace/posts/SocialPost";
import { mockPosts } from "../../data/mockPosts";
import { ChallengeSection } from "../../components/bondzSpace/feed/challenges/ChallengeSection";
import { ChallengeSubmission } from "../../components/bondzSpace/feed/challenges/ChallengeSubmissionPage";
import { ChallengePost } from "../../components/bondzSpace/feed/challenges/ChallengePost";
import { ChallengeCard } from "../../types/challenge";
import { useState } from "react";
import { ChallengeParticipationFlow } from "../../components/bondzSpace/feed/challenges/ChallengeParticipationFlow";
import { ChallengeResponsesPage } from "../../components/bondzSpace/feed/challenges/ChallengeResponsesPage";
import ThreadCard from "../../components/bondzSpace/threads/ThreadCard";
import { insertThreadsRandomly, isThread } from "../../components/bondzSpace/threads/threadUtils";
import { useTheme } from "@/contexts/ThemeProvider";

function Echoes() {
  const { theme } = useTheme();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeCard | null>(null);
  const [challengeSubmissions, setChallengeSubmissions] = useState<ChallengeSubmission[]>([]);
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);
  const [challengeResponses, setChallengeResponses] = useState<{ [challengeId: number]: ChallengeSubmission[] }>({});
  const [showResponsesPage, setShowResponsesPage] = useState(false);
  const [responsesChallenge, setResponsesChallenge] = useState<ChallengeCard | null>(null);

  const handleChallengePress = (challenge: ChallengeCard) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseSubmission = () => {
    setSelectedChallenge(null);
  };

  const handleSubmissionComplete = (submission: ChallengeSubmission) => {
    setChallengeResponses(prev => ({
      ...prev,
      [submission.challengeId]: [
        ...(prev[submission.challengeId] || []),
        submission
      ]
    }));
    setJoinedChallenges(prev => prev.includes(submission.challengeId) ? prev : [...prev, submission.challengeId]);
    setSelectedChallenge(null);
  };

  const handleSeeMyResponses = (challenge: ChallengeCard) => {
    setResponsesChallenge(challenge);
    setShowResponsesPage(true);
  };

  const handleCreatePostFromResponses = () => {
    setSelectedChallenge(responsesChallenge);
    setShowResponsesPage(false);
  };

  const handleLike = () => {
    // Handle like action
    console.log('Post liked');
  };

  const handleComment = () => {
    // Handle comment action
    console.log('Comment pressed');
  };

  const handleShare = () => {
    // Handle share action
    console.log('Post shared');
  };

  // Thread handlers
  const handleJoinThread = (threadId: string) => {
    console.log("Joining thread:", threadId);
    // Implement join thread logic
  };

  const handleViewContributors = (threadId: string) => {
    console.log("Viewing contributors for thread:", threadId);
    // Implement view contributors logic
  };

  const handleThreadPress = (threadId: string) => {
    console.log("Opening thread:", threadId);
    // Navigate to thread detail page
    // router.push(`/threads/${threadId}`);
  };

  // Create mixed feed with threads randomly inserted between posts
  const createMixedFeed = () => {
    const allPosts = [...challengeSubmissions, ...mockPosts];
    return insertThreadsRandomly(allPosts);
  };

  const mixedFeed = createMixedFeed();

  return (
    <View className="flex-1" style={{ backgroundColor: Colors.default.bg }}>
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{ borderColor: Colors.default.textSecondary, paddingTop: 15 }}
      >
        <View className="flex-row items-center">
          <Text
            className="text-2xl font-bold mr-2"
            style={{
              color: Colors.default.textPrimary, 
            }}
          >
            Echoes
          </Text>
        </View>

        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="p-2">
            <Ionicons
              name="search"
              size={24}
              color={Colors.default.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.default.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons
              name="chatbubbles-outline"
              size={24}
              color={Colors.default.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Challenge Section */}
        <ChallengeSection
          onChallengePress={handleChallengePress}
          joinedChallenges={joinedChallenges}
          onSeeMyResponses={handleSeeMyResponses}
        />

        {/* Mixed Feed - Posts and Threads */}
        <View>
          {mixedFeed.map((item, index) => {
            if (isThread(item)) {
              // Render ThreadCard
              return (
                <ThreadCard
                  key={`thread-${item.id}`}
                  thread={item}
                  theme={theme}
                  onJoin={handleJoinThread}
                  onViewContributors={handleViewContributors}
                  onThreadPress={handleThreadPress}
                />
              );
            } else if ('challengeId' in item) {
              // Render ChallengePost
              return (
                <ChallengePost
                  key={`challenge-${item.id}`}
                  submission={item as ChallengeSubmission}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              );
            } else {
              // Render Regular SocialPost
              return (
                <SocialPost key={`post-${item.id}`} post={item as any} />
              );
            }
          })}
        </View>
      </ScrollView>

      {/* Challenge Submission Modal */}
      <Modal
        visible={selectedChallenge !== null}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedChallenge && (
          <ChallengeParticipationFlow
            challenge={selectedChallenge}
            onSubmit={handleSubmissionComplete}
            onClose={handleCloseSubmission}
            onNavigateToResponses={() => {}} // implement if needed
          />
        )}
      </Modal>

      {/* Responses Modal */}
      <Modal visible={showResponsesPage}>
        {responsesChallenge && (
          <ChallengeResponsesPage
            challenge={responsesChallenge}
            userResponses={challengeResponses[responsesChallenge.id] || []}
            onCreatePost={handleCreatePostFromResponses}
            title="My Responses"
            onlyUser
            onClose={() => setShowResponsesPage(false)}
            onJoinChallenge={() => {
              setShowResponsesPage(false);
              setSelectedChallenge(responsesChallenge);
            }}
          />
        )}
      </Modal>
    </View>
  );
}

export default BasicWrapper(Echoes);