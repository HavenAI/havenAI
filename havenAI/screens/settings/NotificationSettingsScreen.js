import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from "react-native";
import SettingToggle from "../../components/common/SettingsToggle.js";
import BackIcon from "../../assets/BackIcon.png";
import BottomTabBar from "../../components/common/BottomTabBar.js";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../constants/colors.js";

export default function NotificationSettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeBottomTab, setActiveBottomTab] = useState("Settings");

  const [notifications, setNotifications] = useState(true);
  const [cravingPredictions, setCravingPredictions] = useState(true);
  const [dailyCheckIn, setDailyCheckIn] = useState(true);

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1C454F" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={BackIcon} style={styles.BackIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      

      {/* Toggle Options */}
      <View style={styles.toggleContainer}>
        <SettingToggle label="Allow Notifications" value={notifications} onValueChange={setNotifications} />
        <SettingToggle label="Craving Predictions" value={cravingPredictions} onValueChange={setCravingPredictions} />
        <SettingToggle label="Daily Check In" value={dailyCheckIn} onValueChange={setDailyCheckIn} />
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
        alignItems: 'center',
    },
    BackIcon: {
      width: 24,
      height: 24,
      tintColor: COLORS.white,
      resizeMode: 'contain',
    },
    backText: {
      fontSize: 16,
      color: COLORS.white,
      fontFamily: 'Poppins',
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Poppins',
      color: COLORS.white,
      textAlign: 'center',
      flex: 1,
      marginRight: 32,
      
    },
    toggleContainer: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor: COLORS.neutral,
    },
  });
  