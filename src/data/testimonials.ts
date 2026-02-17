export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rebecca Martinez",
    role: "Homeowner",
    content: "Absolutely wonderful service! My home has never looked this clean. The team was professional, thorough, and so friendly. I've recommended them to all my neighbors.",
    rating: 5,
    avatar: "RM",
  },
  {
    id: "2",
    name: "David Thompson",
    role: "Apartment Resident",
    content: "I've tried several cleaning services, and this one is by far the best. They pay attention to every detail and always leave my apartment spotless.",
    rating: 5,
    avatar: "DT",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Working Professional",
    content: "As a busy professional, having a reliable cleaning service is a lifesaver. They work around my schedule and the quality is consistently excellent.",
    rating: 5,
    avatar: "PS",
  },
];
