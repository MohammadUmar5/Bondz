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

function Echoes() {
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

        {/* Posts Feed */}
        <View>
          {/* Challenge Submissions First */}
          {challengeSubmissions.map((submission) => (
            <ChallengePost
              key={submission.id}
              submission={submission}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))}

          {/* Regular Posts */}
          {mockPosts.map((post, index) => (
            <SocialPost key={post.id} post={post as any} />
          ))}
        </View>

        {/* Load More */}
        <TouchableOpacity
          className="mx-4 my-6 p-4 rounded-2xl items-center"
          style={{ backgroundColor: Colors.default.cardBg }}
        >
          <Text style={{ color: Colors.default.textSecondary }}>
            🔄 Load more peaceful moments
          </Text>
        </TouchableOpacity>
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