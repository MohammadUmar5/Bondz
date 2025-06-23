import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  userData: {
    username: string;
    bio: string;
    location: string;
    website: string;
  };
  onSave: (updatedData: any) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  userData,
  onSave
}) => {
  const [formData, setFormData] = useState({
    username: userData.username,
    bio: userData.bio,
    location: userData.location,
    website: userData.website,
  });

  const handleSave = () => {
    // Basic validation
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      username: userData.username,
      bio: userData.bio,
      location: userData.location,
      website: userData.website,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
      }}>
        <View style={{
          backgroundColor: Colors.default.cardBg,
          borderRadius: 16,
          width: width * 0.9,
          maxHeight: height * 0.7,
          borderWidth: 1,
          borderColor: Colors.default.tabBarBorderColor
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: Colors.default.tabBarBorderColor
          }}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={{ 
                color: 'white', 
                fontSize: 16,
                opacity: 0.7 
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
            
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold'
            }}>
              Edit Profile
            </Text>
            
            <TouchableOpacity 
              onPress={handleSave}
              style={{
                backgroundColor: "#FFF",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20
              }}
            >
              <Text style={{ 
                color: 'black', 
                fontSize: 14,
                fontWeight: '600'
              }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Content */}
          <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            {/* Username */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 14, 
                fontWeight: '600',
                marginBottom: 8 
              }}>
                Username
              </Text>
              <TextInput
                value={formData.username}
                onChangeText={(text) => setFormData({ ...formData, username: text })}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 8,
                  padding: 12,
                  color: 'white',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: Colors.default.tabBarBorderColor
                }}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="Enter username"
              />
            </View>

            {/* Bio */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 14, 
                fontWeight: '600',
                marginBottom: 8 
              }}>
                Bio
              </Text>
              <TextInput
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                multiline
                numberOfLines={4}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 8,
                  padding: 12,
                  color: 'white',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: Colors.default.tabBarBorderColor,
                  textAlignVertical: 'top',
                  minHeight: 80
                }}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="Tell us about yourself..."
              />
            </View>

            {/* Location */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 14, 
                fontWeight: '600',
                marginBottom: 8 
              }}>
                Location
              </Text>
              <TextInput
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 8,
                  padding: 12,
                  color: 'white',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: Colors.default.tabBarBorderColor
                }}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="Enter your location"
              />
            </View>

            {/* Website */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 14, 
                fontWeight: '600',
                marginBottom: 8 
              }}>
                Website
              </Text>
              <TextInput
                value={formData.website}
                onChangeText={(text) => setFormData({ ...formData, website: text })}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 8,
                  padding: 12,
                  color: 'white',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: Colors.default.tabBarBorderColor
                }}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="Enter your website"
                autoCapitalize="none"
                keyboardType="url"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;