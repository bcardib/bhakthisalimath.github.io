// data/projects.ts
export type Project = {
  id: string;
  name: string;
  role: string;
  period: string;
  techStack: string[];
  shortDescription: string;
  highlights: string[];
  link?: string;
  bookmarkLabel?: string;
  accent?: string;
  mediaType?: "image" | "video";
  mediaLabel?: string;
  mediaSrc?: string;
  mediaPoster?: string;
};

export const projects: Project[] = [
  {
    id: "checkers-java",
    name: "Checkers (Draughts) — Java & Processing",
    role: "Solo Developer",
    period: "2024 – 2025",
    techStack: ["Java 8", "Processing 3", "Gradle", "OOP"],
    shortDescription:
      "Graphical Checkers implementation built with Processing and a Gradle wrapper for reproducible runs. Features click-to-select, valid-move highlighting, captures, king promotion, and win detection.",
    highlights: [
      "Implemented full game logic with Java 8 and Processing 3.3.7 in a clean OOP design (App, Cell, CheckersPiece, Move).",
      "Packaged with Gradle 7.6.4 wrapper and .sdkmanrc for Java 8 to avoid macOS EAWT/QuitHandler issues on modern JDKs.",
      "Documented reproducible setup, troubleshooting, and architecture for INFO1113/COMP9003 at University of Sydney.",
    ],
    link: "https://github.com/bcardib/checkers-java-processing",
    bookmarkLabel: "Checkers",
    accent: "#58a6ff",
    mediaType: "image",
    mediaLabel: "Checkers game board",
  },
  {
    id: "student-record-bst",
    name: "Student Record Management System (BST)",
    role: "Solo Developer",
    period: "2024 – 2025",
    techStack: ["Python", "BST", "pytest", "unittest", "OOP"],
    shortDescription:
      "Student record management system using a Binary Search Tree in Python. Supports insert, search, delete, update, in-order and level-order traversal, and min/max GPA queries.",
    highlights: [
      "Implemented BST from scratch with O(log n) insert, search, and delete (average case); handled 0-, 1-, and 2-child deletion cases.",
      "Demonstrated recursive algorithms, tree traversals, and OOP with a clear Student model (ID, name, GPA).",
      "Validated correctness with pytest and unittest; documented time complexity and future improvements (e.g. AVL).",
    ],
    link: "https://github.com/bcardib/Student-Record-BST-System",
    bookmarkLabel: "Student BST",
    accent: "#34d399",
    mediaType: "image",
    mediaLabel: "BST student records",
  },
  {
    id: "bit-state-manager",
    name: "BitStateManager — Naughty Bits CLI",
    role: "Solo Developer",
    period: "2024",
    techStack: ["Java", "CLI", "State management", "Parsing"],
    shortDescription:
      "Interactive Java CLI that manages a sequence of bits classified as naughty (1) or good (0). Supports check, change, and exit commands with right-to-left indexing.",
    highlights: [
      "Built robust input parsing for interactive CLI with check <string>, change <index> <state>, and exit commands.",
      "Maintained mutable bit configuration and correct right-to-left index mapping with edge-case handling for invalid input.",
      "Designed for deterministic output and automated marking; documented behaviour and troubleshooting.",
    ],
    link: "https://github.com/bcardib/bit-state-manager",
    bookmarkLabel: "Bit Manager",
    accent: "#60a5fa",
    mediaType: "image",
    mediaLabel: "CLI bit state tool",
  },
  {
    id: "moviestore-management",
    name: "MovieStore Management System",
    role: "Solo Developer",
    period: "2024 – 2025",
    techStack: ["Java 17", "Gradle", "OOP", "UML"],
    shortDescription:
      "Java OOP-based movie rental system with inventory tracking, copyright validation (50-year rule), and studio-based querying. Implements Actor, Studio, Movie, and MovieStore from a UML spec.",
    highlights: [
      "Translated UML to clean OOP: Actor, Studio, Movie, MovieStore with encapsulation and relationships; add/rent copies and out-of-stock handling.",
      "Implemented getMoviesByStudio(studio) and getMoviesWithoutCopyright() with Movie.copyrighted() logic (2024 − releaseYear < 50).",
      "Used Gradle wrapper and .sdkmanrc (Java 17) for reproducible builds; documented structure and quick start.",
    ],
    link: "https://github.com/bcardib/moviestore-management-system",
    bookmarkLabel: "MovieStore",
    accent: "#a78bfa",
    mediaType: "image",
    mediaLabel: "Movie rental system",
  },
];

export const projectsCopy: {
  title: string;
  intro: string;
} = {
  title: "Projects",
  intro:
    "Academic and personal projects in Java, Python, data structures, and OOP—from graphical games and CLI tools to BST-based systems and UML-driven design.",
};
