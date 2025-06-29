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

export default function TermsAndConditionsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeBottomTab, setActiveBottomTab] = React.useState("Settings");

  const handleLink = (url) => {
    Linking.openURL(url).catch((err) => console.warn("Failed to open URL", err));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.textPrimary} />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={BackIcon} style={styles.BackIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Effective Date: June 16, 2025</Text>

        <Text style={styles.paragraph}>
          Welcome to Haven AI. By using our mobile app, website, or any of our services (collectively, the “Service”), you agree to the following Terms & Conditions. Please read them carefully before using Haven AI.
        </Text>

        <Text style={styles.sectionHeading}>1. Purpose of the Service</Text>
        <Text style={styles.paragraph}>
          Haven AI is an AI-powered chatbot designed to support individuals who are trying to quit vaping by offering emotional check-ins, coping strategies, and motivational support. It is a wellness support tool, not a medical or mental health service.
        </Text>

        <Text style={styles.sectionHeading}>2. Not Medical or Clinical Advice</Text>
        <Text style={styles.paragraph}>
          Haven AI is not a licensed healthcare provider, therapist, or crisis service. The content and interactions are for informational and motivational purposes only and are not a substitute for professional advice. In emergencies, please contact qualified help immediately.
        </Text>

        <Text style={styles.sectionHeading}>3. User Eligibility</Text>
        <Text style={styles.bullet}>• You must be at least 16 years old</Text>
        <Text style={styles.bullet}>• Use the platform voluntarily</Text>
        <Text style={styles.bullet}>• Avoid illegal or harmful use</Text>

        <Text style={styles.sectionHeading}>4. Data & Privacy</Text>
        <Text style={styles.paragraph}>
          We collect data to personalize your experience. Read our{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("PrivacyPolicy")}>
            Privacy Policy
          </Text>{" "}
          for details on what we collect and how we store it.
        </Text>

        <Text style={styles.sectionHeading}>5. AI Limitations</Text>
        <Text style={styles.bullet}>• The chatbot may misinterpret context</Text>
        <Text style={styles.bullet}>• It’s not a substitute for clinical judgment</Text>
        <Text style={styles.bullet}>• Don’t rely on it in emergencies</Text>

        <Text style={styles.sectionHeading}>6. Crisis & Safety Protocol</Text>
        <Text style={styles.paragraph}>
          Haven AI encourages users in crisis to seek professional help and provides crisis info when possible. It does not intervene or diagnose.
        </Text>

        <Text style={styles.sectionHeading}>7. Acceptable Use</Text>
        <Text style={styles.bullet}>• No harmful, threatening, or illegal use</Text>
        <Text style={styles.bullet}>• Don’t interfere with functionality</Text>
        <Text style={styles.bullet}>• No impersonation or misuse</Text>

        <Text style={styles.sectionHeading}>8. Modifications to the Service</Text>
        <Text style={styles.paragraph}>
          We may update the app or these terms at any time. Continued use means you accept the changes.
        </Text>

        <Text style={styles.sectionHeading}>9. Disclaimer of Warranties</Text>
        <Text style={styles.paragraph}>
          Haven AI is provided “as is” with no guarantees of results. You use it at your own risk.
        </Text>

        <Text style={styles.sectionHeading}>10. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Haven AI is not liable for emotional outcomes or failure to quit vaping. Use of the app is your responsibility.
        </Text>

        <Text style={styles.sectionHeading}>11. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms are governed by U.S. law.
        </Text>

        <Text style={styles.sectionHeading}>12. Contact Us</Text>
        <Text style={styles.bullet}>
          Email:{" "}
          <Text style={styles.link} onPress={() => handleLink("mailto:support@havenai.app")}>
            support@havenai.app
          </Text>
        </Text>
        <Text style={styles.bullet}>
          Website:{" "}
          <Text style={styles.link} onPress={() => handleLink("https://www.havenai.app")}>
            www.havenai.app
          </Text>
        </Text>

        <Text style={styles.paragraph}>
          By using Haven AI, you confirm that you’ve read, understood, and agreed to these Terms & Conditions.
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
    fontFamily: "Poppins-Italic",
    color: "#555",
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#444",
    marginBottom: 4,
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
