export type DemoAccount = "Gmail" | "Outlook";
export type DemoTone = "Concise" | "Warm" | "Formal";

export interface DemoThread {
  id: string;
  sender: string;
  initials: string;
  account: DemoAccount;
  subject: string;
  preview: string;
  time: string;
  priority: string;
  summary: string;
  nextStep: string;
  drafts: Record<DemoTone, string>;
}

export const demoTones: DemoTone[] = ["Concise", "Warm", "Formal"];

export const demoThreads: DemoThread[] = [
  {
    id: "launch",
    sender: "Maya Chen",
    initials: "MC",
    account: "Gmail",
    subject: "One last look before launch",
    preview: "The updated homepage is ready for your sign-off.",
    time: "9:12 AM",
    priority: "Reply today",
    summary:
      "Maya has finished the homepage updates. She needs your approval by 2 PM to keep tomorrow’s launch on track.",
    nextStep: "Review the homepage and confirm whether it is ready to launch.",
    drafts: {
      Concise:
        "Hi Maya, thanks for the update. I’ll review the homepage and send you my feedback by 2 PM today.",
      Warm: "Hi Maya, thanks for all your work on this! I’m looking forward to seeing the updates. I’ll take a look and get you my feedback by 2 PM today.",
      Formal:
        "Hi Maya, thank you for sharing the updated homepage. I will review it and provide feedback by 2 PM today so we can confirm the launch schedule.",
    },
  },
  {
    id: "proposal",
    sender: "Alex Morgan",
    initials: "AM",
    account: "Outlook",
    subject: "A quick question on the proposal",
    preview: "Can we include the onboarding workshop in scope?",
    time: "8:46 AM",
    priority: "Decision needed",
    summary:
      "Alex would like an onboarding workshop added to the proposal. The team is waiting on your answer before finalizing the scope.",
    nextStep: "Confirm the workshop requirements before updating the proposal.",
    drafts: {
      Concise:
        "Hi Alex, happy to look at adding a workshop. Could you confirm the group size and preferred timing? I’ll use that to update the scope.",
      Warm: "Hi Alex, an onboarding workshop sounds like a useful addition! Could you share the group size and the timing you have in mind? I’ll take a look and update the proposal from there.",
      Formal:
        "Hi Alex, thank you for the suggestion. Please confirm the expected number of participants and preferred schedule for the onboarding workshop. I can then assess the scope and update the proposal accordingly.",
    },
  },
  {
    id: "research",
    sender: "Nina Patel",
    initials: "NP",
    account: "Gmail",
    subject: "Research notes for Thursday",
    preview: "Three customer themes to discuss at our next session.",
    time: "8:20 AM",
    priority: "For your review",
    summary:
      "Nina shared three themes from the latest customer interviews. She’d like your perspective before Thursday’s planning session.",
    nextStep: "Read the findings and add your questions ahead of Thursday.",
    drafts: {
      Concise:
        "Hi Nina, thanks for pulling these together. I’ll review the findings and add my questions before Thursday’s session.",
      Warm: "Hi Nina, thanks for putting these notes together! I’m glad we have fresh customer input for planning. I’ll read through the themes and add my questions before Thursday.",
      Formal:
        "Hi Nina, thank you for preparing the research summary. I will review the findings and share my questions in advance of Thursday’s planning session.",
    },
  },
];

export const demoPromises = [
  {
    id: "feedback",
    title: "Send homepage feedback",
    person: "Maya Chen",
    account: "Gmail" as DemoAccount,
    due: "Today, 2 PM",
    today: true,
    context: "“I’ll get you my feedback this afternoon.”",
  },
  {
    id: "scope",
    title: "Confirm the workshop scope",
    person: "Alex Morgan",
    account: "Outlook" as DemoAccount,
    due: "Today, 4 PM",
    today: true,
    context: "“Let me check the details and come back to you.”",
  },
  {
    id: "notes",
    title: "Review customer research",
    person: "Nina Patel",
    account: "Gmail" as DemoAccount,
    due: "Tomorrow",
    today: false,
    context: "“I’ll add my questions before our planning session.”",
  },
];
