import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../assets/BackIcon.png";
import COLORS from "../../constants/colors";
import BottomTabBar from "../../components/common/BottomTabBar";

export default function FAQScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeBottomTab, setActiveBottomTab] = React.useState("Settings");

  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  const faqs = [
    {
      question: "What is Haven AI?",
      answer:
        "Haven AI is a supportive, AI-powered chatbot designed to help you quit vaping and manage cravings by understanding your triggers and offering real-time encouragement, reflection prompts, and mental wellness tools.",
    },
    {
      question: "Is Haven AI a therapist or mental health professional?",
      answer:
        "No. Haven AI is not a licensed therapist or medical provider. It’s a wellness support tool meant to guide, motivate, and help you build better habits—but it should never replace professional help when it’s needed.",
    },
    {
      question: "How does Haven AI know when I'm having a craving?",
      answer:
        "Haven AI learns from your patterns—like the times you vape, your mood check-ins, and responses you give. It predicts when you might be at risk of a craving and checks in at the right time.",
    },
    {
      question: "What kind of messages will I get from the chatbot?",
      answer:
        "You’ll receive:\n- Encouraging messages\n- Daily check-ins or motivational notes\n- Coping strategies\n- Gentle nudges to help you stay focused\n\nYou’re always in control—you can adjust how often the app checks in with you.",
    },
    {
      question: "What happens if I talk about feeling really low, anxious, or unsafe?",
      answer:
        "If you express signs of severe emotional distress, Haven AI will:\n- Encourage you to reach out to a real person or a crisis line\n- Provide resources and emergency contacts\n- Never attempt to give clinical advice\n\nYour safety is our top priority.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Yes. We do not sell your data or share your conversations with advertisers. Your information is stored securely and used only to personalize your experience.",
    },
    {
      question: "How do I track how much money I’ve saved by quitting vaping?",
      answer:
        "When you set up your account, you’ll enter vape habits and spending. Haven AI tracks estimated savings and reminds you what that money could help you achieve.",
    },
    {
      question: "Can I use Haven AI if I haven’t fully quit vaping yet?",
      answer:
        "Absolutely. Whether you're quitting, cutting back, or just exploring, Haven AI offers non-judgmental support.",
    },
    {
      question: "Is Haven AI free to use?",
      answer:
        "Haven AI is free to start. Some advanced features may become premium, but core tools are free to all users.",
    },
    {
      question: "How do I delete my data or account?",
      answer:
        "Go to Settings > Delete Account. Or email us at ",
      linkText: "support@havenai.app",
      linkUrl: "mailto:support@havenai.app",
    },
    {
      question: "Where can I get extra help to quit vaping?",
      answer:
        "We recommend these resources:",
      links: [
        { label: "Smokefree.gov", url: "https://smokefree.gov" },
        { label: "Truth Initiative", url: "https://truthinitiative.org" },
        { label: "NHS Quit Smoking (UK)", url: "https://www.nhs.uk/better-health/quit-smoking/" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.textPrimary} />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={BackIcon} style={styles.BackIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>

            {faq.linkText && (
              <Text style={styles.link} onPress={() => openURL(faq.linkUrl)}>
                {faq.linkText}
              </Text>
            )}

            {faq.links &&
              faq.links.map((link, idx) => (
                <Text
                  key={idx}
                  style={styles.link}
                  onPress={() => openURL(link.url)}
                >
                  • {link.label}
                </Text>
              ))}
          </View>
        ))}
      </ScrollView>

      <BottomTabBar
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },
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
    paddingBottom: 80, // Space for tab bar
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  answer: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#444",
    lineHeight: 22,
  },
  link: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontFamily: "Poppins",
    marginTop: 4,
    textDecorationLine: "underline",
  },
});
