import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../assets/BackIcon.png";
import BottomTabBar from "../../components/common/BottomTabBar";
import COLORS from "../../constants/colors";

export default function PrivacyPolicyScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeBottomTab, setActiveBottomTab] = React.useState("Settings");

  const handleLink = (url) => {
    Linking.openURL(url).catch((err) => console.warn("Can't open URL", err));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.textPrimary} />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={BackIcon} style={styles.BackIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Effective Date: June 16, 2025</Text>

        <Text style={styles.paragraph}>
          At Haven AI, your privacy and trust are our top priorities. This Privacy Policy explains how we collect, use, store, and protect your personal data—including data from partner services like smartwatches and calendars—when you use our app, website, and chatbot (the “Service”).
        </Text>

        <Text style={styles.sectionHeading}>1. What We Collect</Text>
        <Text style={styles.subheading}>a. Personal Information (you provide):</Text>
        <Text style={styles.bullet}>• Username or nickname (optional)</Text>
        <Text style={styles.bullet}>• Email (if provided for syncing, reminders, or support)</Text>
        <Text style={styles.bullet}>• Onboarding responses (e.g., vaping habits, goals)</Text>
        <Text style={styles.bullet}>• Chat messages and mood check-ins</Text>

        <Text style={styles.subheading}>b. Usage Data (collected automatically):</Text>
        <Text style={styles.bullet}>• App features used, session frequency, and time of use</Text>
        <Text style={styles.bullet}>• Device type, OS, language settings</Text>
        <Text style={styles.bullet}>• Approximate location (for timezone only)</Text>

        <Text style={styles.subheading}>c. Wellness & Behavioral Data:</Text>
        <Text style={styles.bullet}>• Craving logs, patterns, progress tracking</Text>
        <Text style={styles.bullet}>• Motivation statements and reflections</Text>

        <Text style={styles.subheading}>d. Third-Party Integrations (with permission):</Text>
        <Text style={styles.bullet}>• Calendar data: event timestamps/categories</Text>
        <Text style={styles.bullet}>• Smartwatch data: heart rate, sleep, activity</Text>
        <Text style={styles.bullet}>• Currently supports Apple Health, Google Fit, Fitbit</Text>
        <Text style={styles.bullet}>• No GPS, recordings, or private notes collected</Text>

        <Text style={styles.sectionHeading}>2. How We Use Your Data</Text>
        <Text style={styles.paragraph}>
          We use your data to personalize support, predict cravings, track progress, and improve your experience. We never sell your data or use it for ads.
        </Text>

        <Text style={styles.sectionHeading}>3. How We Store & Protect Your Data</Text>
        <Text style={styles.bullet}>• Encrypted storage & TLS for transmission</Text>
        <Text style={styles.bullet}>• Strict access controls</Text>
        <Text style={styles.bullet}>• Anonymous use mode (optional)</Text>

        <Text style={styles.sectionHeading}>4. How We Share Your Data</Text>
        <Text style={styles.bullet}>• With trusted providers under NDA</Text>
        <Text style={styles.bullet}>• With smartwatch/calendar APIs (with consent)</Text>
        <Text style={styles.bullet}>• With authorities only if legally required</Text>

        <Text style={styles.sectionHeading}>5. Your Rights & Choices</Text>
        <Text style={styles.bullet}>• Access, correct, delete your data</Text>
        <Text style={styles.bullet}>• Disconnect integrations anytime</Text>
        <Text style={styles.bullet}>• Request portable data copy</Text>
        <Text style={styles.paragraph}>
          Email us at{" "}
          <Text style={styles.link} onPress={() => handleLink("mailto:privacy@havenai.app")}>
            privacy@havenai.app
          </Text>{" "}
          to make a request.
        </Text>

        <Text style={styles.sectionHeading}>6. Retention</Text>
        <Text style={styles.paragraph}>
          We retain data only as long as needed. You can delete your account anytime from settings.
        </Text>

        <Text style={styles.sectionHeading}>7. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Haven AI is not intended for users under 16. We do not knowingly collect data from minors without parental consent.
        </Text>

        <Text style={styles.sectionHeading}>8. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          You’ll be notified in-app or by email if any major changes are made.
        </Text>

        <Text style={styles.sectionHeading}>9. Contact Us</Text>
        <Text style={styles.bullet}>Email:{" "}
          <Text style={styles.link} onPress={() => handleLink("mailto:privacy@havenai.app")}>
            privacy@havenai.app
          </Text>
        </Text>
        <Text style={styles.bullet}>Website:{" "}
          <Text style={styles.link} onPress={() => handleLink("https://www.havenai.app")}>
            www.havenai.app
          </Text>
        </Text>
      </ScrollView>

      <BottomTabBar activeBottomTab={activeBottomTab} setActiveBottomTab={setActiveBottomTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.textPrimary,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  BackIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white,
    resizeMode: "contain",
  },
  backText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: "Poppins",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins",
    color: COLORS.white,
    textAlign: "center",
    flex: 1,
    marginRight: 32,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins-Italic",
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginTop: 10,
  },
  bullet: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#444",
    marginBottom: 4,
    lineHeight: 20,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#444",
    lineHeight: 22,
    marginBottom: 10,
  },
  link: {
    color: COLORS.textPrimary,
    textDecorationLine: "underline",
    fontFamily: "Poppins",
  },
});
