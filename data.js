// Mock current user
const currentUser = {
  id: "user001",
  name: "Amina Yusuf",
  role: "Corps Member",
  location: "Kano State",
  avatar: "https://i.pravatar.cc/150?img=47",
  rating: 4.8,
  reviews: 12,
  completedGigs: 12,
  serviceHours: 84,
  badges: ["Mentor Certification", "Community Educator"],
  academyCompleted: true   // change to false to test forced academy gate later
};

// Mock gigs
const gigs = [
  {
    id: "gig001",
    title: "Community Literacy Mentor",
    location: "Kano",
    children: 25,
    duration: "2 Weeks",
    status: "Open",
    reward: "₦10,000",
    description: "Support foundational literacy sessions for out-of-school children in the community.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
  },
  {
    id: "gig002",
    title: "Weekend Numeracy Coach",
    location: "Kaduna",
    children: 15,
    duration: "1 Week",
    status: "Completed",
    reward: "₦7,500",
    description: "Help children improve basic numeracy skills over the weekend.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400"
  }
];

// Mock courses
const courses = [
  {
    id: "course001",
    title: "Child Safeguarding & Ethics 101",
    duration: "30 mins",
    required: true,
    completed: false,
    description: "Learn how to protect children, recognize risks, and practice safe, ethical mentoring in your community."
  }
];