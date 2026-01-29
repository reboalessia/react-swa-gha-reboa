export type EventItem = {
  id: string;
  title: string;
  date: string;
  tag: "Frontend" | "Cloud" | "AI" | "Career";
  location: "Online" | "Onsite";
};

export const events: EventItem[] = [
  { id: "e1", title: "Intro a React con Vite", date: "2026-02-10", tag: "Frontend", location: "Online" },
  { id: "e2", title: "Deploy su Azure Static Web Apps", date: "2026-02-12", tag: "Cloud", location: "Online" },
  { id: "e3", title: "GitHub PR & Code Review", date: "2026-02-15", tag: "Career", location: "Onsite" },
];