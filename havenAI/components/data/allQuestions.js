
const quizSections = [
    {
      section: "Your Relationship with Vaping",
      questions: [
        {
          id: "goal",
          type: "checkbox",
          question: "What's your current goal with vaping?",
          options: [
            "I want to quit completely",
            "I want to cut down gradually",
            "I'm just exploring for now"
          ],
          multiSelect: true
        },
        {
          id: "vapeType",
          type: "checkbox",
          question: "What type of vape do you mostly use?",
          options: [
            "Disposable (e.g. Elf bar, Puff bar)",
            "Pod based (e.g. JUUL, Vuse)",
            "Refillable/Mod",
            "Not sure"
          ],
          multiSelect: true
        },
        {
          id: "nicotineStrength",
          type: "radio",
          question: "Do you know your vape's nicotine strength?",
          options: [
            "Yes - High (e.g. 50mg)",
            "Medium (e.g. 20–35mg)",
            "Low (e.g. <10mg)",
            "I'm not sure"
          ],
          multiSelect: true
        }
      ]
    },
    {
      section: "Understanding Your Triggers",
      questions: [
        {
          id: "cravingTime",
          type: "checkbox",
          question: "When do you usually crave a hit? (Select all that apply)",
          options: [
            "In the morning",
            "Late at night",
            "When I'm bored",
            "When I'm stressed or anxious",
            "After meals",
            "In social settings",
            "After consuming alcohol"
          ],
          multiSelect: true
        },
        {
          id: "cause",
          type: "checkbox",
          question: "What usually causes you to reach for your vape?",
          options: [
            "Habit/boredom",
            "Stress/overwhelm",
            "Emotions (e.g. sadness, anxiety)",
            "Routine",
            "To focus",
            "Social pressure",
            "I'm not sure"
          ],
          multiSelect: true
        },
        {
          id: "vapeRefill",
          type: "radio",
          question:"On average, how often do you buy a new vape or refill?",
          options:[
            "Everyday",
            "Every 2-3 days",
            "Once a week",
            "Every 2 weeks",
            "Once a month"
          ]
        },
        {
          id: "expense",
          type: "text",
          question: "How much do you usually spend each time you buy a vape or refill?"
        },
        {
          id: "frequency",
          type: "radio",
          question: "How many times a day do you typically vape?",
          options: [
            "1 - 2 times",
            "3 - 5 times",
            "6 - 10 times",
            "More than 10 times",
            "I don't keep track"
          ],
          multiSelect: true
        },
        {
          id: "quitBefore",
          type: "radio",
          question: "Have you ever tried to quit vaping before?",
          options: ["Yes", "No", "Maybe"]
        },
        {
          id: "cravingFeelings",
          type: "checkbox",
          question: "If you have tried to quit vaping before, how did the cravings feel like? (Select all that apply)",
          options: [
            "Missing the hand to mouth action",
            "Missing the taste of your vape flavour",
            "Missing the visual of smoke exhaled",
            "Mental tug of war to get a vape",
            "General discomfort",
            "Dizziness or lack of focus",
            "Jittery or shaking"
          ],
          multiSelect: true
        },
        {
          id: "quitMethod",
          type: "radio",
          question: "What is your preferred way to quit vaping?",
          options: ["Quit cold turkey", "Quit gradually"]
        },
        {
          id: "futureSelfMessage",
          type: "text",
          question:
            "Imagine it’s 6 months from now and you’ve fully quit vaping. What would your future self say to you right now to keep you going? (Tip: Think about how you want to feel — e.g. free, healthy, proud — and let those feelings guide your words.)"
        }
      ]
    },
    {
      section: "Personalize Your Support",
      questions: [
        {
          id: "supportType",
          type: "checkbox",
          question: "Which of these would help you the most during a craving? (Select all that apply)",
          options: [
            "A message from my “future self”",
            "Breathing or grounding techniques",
            "A voice note with encouragement",
            "Just chat with me",
            "A challenge or distraction"
          ],
          multiSelect: true
        },
        {
          id: "calmingThings",
          type: "text",
          question: "What typically makes you feel calm or safe?"
        },
        {
          id: "stressTriggers",
          type: "text",
          question: "What tends to trigger stress or overwhelm for you?"
        },
        {
          id: "relaxingSounds",
          type: "text",
          question: "Do certain sounds or music genres help you relax or stay focused?"
        },
        {
          id: "mindfulnessUse",
          type: "radio",
          question: "Do you currently use any mindfulness, journaling, or breathing techniques?",
          options: ["Yes", "No", "Maybe"],
          multiSelect: true
        },
        {
          id: "mindfulnessDetails",
          type: "text",
          question: "Could you describe the types of journaling or breath work that you are familiar with..."
        },
        {
          id: "tone",
          type: "radio",
          question: "How do you want your AI support to feel?",
          options: [
            "Chill & supportive (like a non-judgy friend)",
            "Tough love & accountability",
            "Light & encouraging",
            "You decide for me"
          ],
          multiSelect: true
        },
        {
          id: "talkLevel",
          type: "radio",
          question: "How talkative do you want your AI to be?",
          options: [
            "Just quick check-ins",
            "A bit of back and forth would be nice",
            "I want full conversations"
          ],
          multiSelect: true
        },
        {
          id: "checkinFrequency",
          type: "radio",
          question: "How often would you like me to check-in on your mood, cravings and triggers?",
          options: [
            "Hourly",
            "3 times a day",
            "2 times a day",
            "Daily",
            "Weekly"
          ],
          multiSelect: true
        },
  
        {
          id: "vapeFeeling",
          type: "text",
          question: "In one word, how does vaping make you feel?"
        },
        {
          id: "additionalNotes",
          type: "text",
          question: "Anything you'd like to tell us about your journey with vaping?"
        }
      ]
    }
  ];

const allQuestions = quizSections.flatMap(section => section.questions);
  
  export default allQuestions;
  