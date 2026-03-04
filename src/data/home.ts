export const homeCopy: {
  hero: {
    headline: string;
    wave: string;
    currently: string;
    currentLocation: string;
    currentRole: string;
    previousTitle: string;
    creator: string;
    arrowLabel: string;
    socials: { label: string; href: string; icon: string }[];
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    facts: string[];
    cta: string;
  };
  education: {
    title: string;
    subtitle: string;
    items: {
      school: string;
      degree: string;
      period: string;
      details: string;
      status: "current" | "past";
    }[];
  };
  featuredProjects: {
    title: string;
    subtitle: string;
    cta: string;
  };
} = {
  hero: {
    headline: "Hi, I'm Bhakthi Salimath",
    wave: "👋",
    currently: "Currently",
    currentLocation: "Studying in University of Sydney",
    currentRole:
      "Final year Bachelor of Advanced Computing student, majoring in Computer Science.",
    previousTitle:
      "Previously: BiteSavr, ML Sentiment Analysis System, and Award-winning Hackathon Projects",
    creator:
      "I enjoy building intelligent systems and data-driven applications, combining algorithms, machine learning, and software engineering to solve real-world problems.",
    arrowLabel: "Scroll to about section",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/bcardib",
        icon: "/icons/github.svg",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/bhakthisalimath/",
        icon: "/icons/linkedin.svg",
      },
      {
        label: "Email",
        href: "mailto:bhakthisalimath@gmail.com",
        icon: "/icons/email.svg",
      },
    ],
  },
  about: {
    title: "About me",
    subtitle:
      "A quick snapshot of who I am and the foundation I'm building on.",
    paragraphs: [
      "I'm Bhakthi Salimath, a Computer Science student at The University of Sydney pursuing a Bachelor of Advanced Computing.",
      "I enjoy building intelligent systems and data-driven applications that combine algorithms, machine learning, and practical software engineering.",
      "Through hackathons, academic projects, and personal builds, I have worked with technologies such as Java, Python, React, and modern development tools while exploring how software can solve real-world problems.",
    ],
    facts: [
      "Location: Sydney, Australia",
      "Degree: Bachelor of Advanced Computing (Computer Science)",
      "Interests: Technology, algorithmic problem solving, hackathons, GDG society events, and gym",
    ],
    cta: "Jump to projects",
  },
  education: {
    title: "Education",
    subtitle: "My academic journey and computing foundation.",
    items: [
      {
        school: "The University of Sydney",
        degree: "Bachelor of Advanced Computing (Computer Science)",
        period: "2024 – Present",
        details:
          "Coursework includes data structures and algorithms, object-oriented programming, software engineering, and algorithm design.",
        status: "current",
      },
    ],
  },
  featuredProjects: {
    title: "Projects",
    subtitle:
      "Selected projects involving machine learning, algorithms, and real-world software applications.",
    cta: "View all projects",
  },
};
