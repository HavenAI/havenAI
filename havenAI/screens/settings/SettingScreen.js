import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


import BottomTabBar from "../../components/common/BottomTabBar.js";
import BackIcon from "../../assets/BackIcon.png";
import COLORS from "../../constants/colors.js";
import FeedbackIcon from "../../assets/feedback.png";
import FAQIcon from "../../assets/FAQIcon.png";
import PrivacyPolicyIcon from "../../assets/privacy.png";
import TermsAndConditionsIcon from "../../assets/terms.png";
import PreferencesIcon from "../../assets/PreferencesIcon.png";
import NotificationsIcon from "../../assets/notification.png";
import ShareIcon from "../../assets/ShareIcon.png";


export default function SettingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeBottomTab, setActiveBottomTab] = useState("Settings");

  const settingsItems = [
    // { title: 'Preferences', screen: 'Preferences', icon: PreferencesIcon },
    { title: 'Notifications', screen: 'Notifications', icon: NotificationsIcon },
    // { title: 'Share', icon: ShareIcon },
    { title: 'Feedback', screen: 'Feedback', icon: FeedbackIcon },
    { title: 'FAQ', screen: 'FAQScreen', icon: FAQIcon },
    { title: 'Privacy Policy', screen: 'PrivacyPolicy', icon: PrivacyPolicyIcon },
    { title: 'Terms & Conditions', screen: 'TermsAndConditions', icon: TermsAndConditionsIcon },
  ];
  

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.textPrimary} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={BackIcon} style={styles.BackIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* List of Settings */}
      <View style={styles.listContainer}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <View style={styles.itemContent}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>


      {/* Bottom Tab Bar */}
      <BottomTabBar activeBottomTab={activeBottomTab} setActiveBottomTab={setActiveBottomTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textPrimary,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  BackIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
  backText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: 'Poppins',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
    marginRight: 32,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral,
    paddingHorizontal: 15,
  },
  item: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: COLORS.textPrimary,
  },
});
