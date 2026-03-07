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
    period: "Jan 2024 – Dec 2025",
    techStack: ["Java 8", "Processing 3", "Gradle", "OOP"],
    shortDescription:
      "Graphical Checkers implementation built with Processing and a Gradle wrapper for reproducible runs. Features click-to-select, valid-move highlighting, captures, king promotion, and win detection.",
    highlights: [
      "Implemented full game logic with Java 8 and Processing 3.3.7 in a clean OOP design (App, Cell, CheckersPiece, Move).",
      "Packaged with Gradle 7.6.4 wrapper and .sdkmanrc for Java 8 to avoid macOS EAWT/QuitHandler issues on modern JDKs.",
      "Documented reproducible setup, troubleshooting, and architecture for INFO1113/COMP9003 at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/checkers-java-processing",
    bookmarkLabel: "Checkers",
    accent: "#58a6ff",
    mediaType: "image",
    mediaLabel: "Checkers game board",
  },
  {
    id: "tactical-tank-game",
    name: "Tactical Tank Game",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Java 8", "Processing 3.3.7", "Gradle 8.5", "2D game", "Turn-based"],
    shortDescription:
      "2D tactical tank game built with Java and the Processing library. Turn-based gameplay on a grid-based board with configurable levels, scoreboard, parachute drops, and a fixed 864×640 window at 30 FPS.",
    highlights: [
      "Implemented tank gameplay (move, aim, fire) with turn-based rounds; levels and entities loaded from config (e.g. config.json).",
      "Used processing.core and processing.data only (no JavaFX, AWT, or JOGL); Java 8 toolchain with Gradle wrapper for assignment compliance.",
      "Added scoreboard per player/character, limited parachute drops, and macOS EAWT stubs for Java 9+ compatibility when needed.",
    ],
    link: "https://github.com/bhakthisalimath/tanks-artillery-game",
    bookmarkLabel: "Tank Game",
    accent: "#f59e0b",
    mediaType: "image",
    mediaLabel: "Tactical tank game",
  },
  {
    id: "minesweeper-processing",
    name: "Minesweeper — Java & Processing",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Java 8", "Processing 3.3.7", "Gradle 7.6.4", "OOP", "2D game"],
    shortDescription:
      "Graphical Minesweeper with click-to-reveal, right-click flags, adjacent mine counts (1–8), auto-reveal cascade, mine explosion animation, timer, and configurable mine count. Fixed 864×640 window, 27×18 grid.",
    highlights: [
      "Implemented full game logic in clean OOP (App, Tile, Mine): reveal, flag, cascade reveal, win/loss detection, and multi-frame explosion animation (mine0–mine9 sprites).",
      "Used Processing 3.3.7 with Gradle 7.6.4 wrapper and .sdkmanrc for Java 8 to avoid macOS EAWT/QuitHandler issues; optional mine count via --args.",
      "Documented architecture, troubleshooting, and recruiter notes for INFO1113/COMP9003 at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/minesweeper-java-processing",
    bookmarkLabel: "Minesweeper",
    accent: "#84cc16",
    mediaType: "image",
    mediaLabel: "Minesweeper game board",
  },
  {
    id: "inkball",
    name: "Inkball — Physics Puzzle Game",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Java 17+", "Processing 4.3.1", "Gradle 9", "JUnit 5", "Physics", "2D game"],
    shortDescription:
      "Physics-based puzzle game: guide coloured balls into matching holes by drawing barriers. Collision detection, breakable bricks, ball queue, three levels with config (config.json + level files), pause and restart.",
    highlights: [
      "Implemented OOP design (App, Balls, Holes, Hitbox, Walls, breakingBrick, Drawing): draw/delete lines, ball–line and ball–wall collision, hole attraction and colour-match capture, scoring and wrong-hole penalty.",
      "Data-driven levels and scoring via config.json and level1–3.txt; Processing 4.3.1 with Java 17+ and JogAmp to avoid macOS EAWT issues; JUnit 5 tests with headless skip for CI.",
      "Features: ball queue, spawn countdown, timer, breakable bricks with cracked sprites; Space to pause, R to restart; documented architecture and troubleshooting for INFO1113/COMP9003.",
    ],
    link: "https://github.com/bhakthisalimath/inkball",
    bookmarkLabel: "Inkball",
    accent: "#ec4899",
    mediaType: "image",
    mediaLabel: "Inkball puzzle game",
  },
  {
    id: "2048-processing",
    name: "2048 — Java & Processing",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Java 8", "Processing 3.3.7", "Gradle 7.6+", "OOP", "2D game"],
    shortDescription:
      "Graphical 2048 game: slide tiles, merge matching numbers, configurable grid (2×2 to 10×10 via --args), timer, mouse click to place 2/4 in empty cell, R to reset. Value-based tile colours, rounded cells, hover feedback.",
    highlights: [
      "Implemented OOP design (App, Board, Cell, Moves, Timer): move/merge logic with rotation-based row handling, spawn after move, game-over when no empty cell and no adjacent equals; EAWT stubs for macOS.",
      "Build compiles to Java 8 bytecode; Gradle runs game with Java 8 (auto-detect or JAVA8_HOME) so Processing 3 works on macOS; .sdkmanrc optional; configurable grid size via command line.",
      "Polished UI: value-based colours, rounded rects, timer in header and on game over; documented for INFO1113/COMP9003 at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/2048-java-processing",
    bookmarkLabel: "2048",
    accent: "#eab308",
    mediaType: "image",
    mediaLabel: "2048 game board",
  },
  {
    id: "student-record-bst",
    name: "Student Record Management System (BST)",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python", "BST", "pytest", "unittest", "OOP"],
    shortDescription:
      "Student record management system using a Binary Search Tree in Python. Supports insert, search, delete, update, in-order and level-order traversal, and min/max GPA queries.",
    highlights: [
      "Implemented BST from scratch with O(log n) insert, search, and delete (average case); handled 0-, 1-, and 2-child deletion cases.",
      "Demonstrated recursive algorithms, tree traversals, and OOP with a clear Student model (ID, name, GPA).",
      "Validated correctness with pytest and unittest; documented time complexity and future improvements (e.g. AVL).",
    ],
    link: "https://github.com/bhakthisalimath/Student-Record-BST-System",
    bookmarkLabel: "Student BST",
    accent: "#34d399",
    mediaType: "image",
    mediaLabel: "BST student records",
  },
  {
    id: "constrained-graph-pathfinding",
    name: "Constrained Graph Pathfinding",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python 3.9+", "BFS", "Dijkstra", "unittest", "OOP", "Standard library only"],
    shortDescription:
      "Graph pathfinding library for a courier network with safe/unsafe vertices: path existence (BFS), fastest path by weight via an oasis (Dijkstra), and most direct path by hops via any oasis. Standard-library only, PEP 585 type hints.",
    highlights: [
      "Implemented OOP design: Vertex (safe flag, adjacency), Edge (endpoints, weight), Graph (add/remove, pathfinding). BFS for reachability and hop-minimal paths; Dijkstra for weight-based shortest path from oasis.",
      "APIs: exists_path(s, t), fastest_path(s, t, oasis), most_direct_path(s, t, oases); all respect safe vertices only; positive integer edge weights; simple graph invariants (no self-loops, no duplicate edges).",
      "Fully tested with unittest (Vertex, Edge, Graph); no external dependencies (collections.deque, heapq, itertools); documented for COMP2123 / Algorithms at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/constrained-graph-pathfinding",
    bookmarkLabel: "Graph Pathfinding",
    accent: "#6366f1",
    mediaType: "image",
    mediaLabel: "Graph pathfinding library",
  },
  {
    id: "dynamic-topk-tree",
    name: "Dynamic Top-k Tree",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python 3.9+", "Data structures", "Tree algorithms", "unittest", "OOP", "Standard library only"],
    shortDescription:
      "Dynamic tree that maintains the sum of the top-k gold values in every subtree under structural updates: put (add child), move_subtree, melt_subtree. Configurable k per node; automatic k_sum propagation. No external dependencies.",
    highlights: [
      "Implemented Node (gold, k, k_sum, add_child, update_gold, _update_k_sum) and Tree (put, move_subtree, melt_subtree); k_sum propagates upward when structure or values change.",
      "Use case: dwarven-mine model—fast “sum of top-k gold in this branch” as the tree is restructured; each node has its own k; top-k computed from subtree golds.",
      "Fully tested with unittest (7 tests: 4 Node, 3 Tree); Python 3.9+ with built-in generics; documented for COMP2123 / Algorithms at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/dynamic-topk-tree",
    bookmarkLabel: "Top-k Tree",
    accent: "#ca8a04",
    mediaType: "image",
    mediaLabel: "Dynamic top-k tree",
  },
  {
    id: "heuristic-search-engine",
    name: "Heuristic Search Engine",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python 3.6+", "BFS", "DFS", "IDS", "A*", "Greedy", "Hill Climbing", "Standard library only"],
    shortDescription:
      "State-space search framework over binary strings: six algorithms (BFS, DFS, IDS, Greedy Best-First, A*, Hill Climbing). Flexible input with start, goals, and unsafe states (X wildcards); single CLI entry point; configurable expansion limit.",
    highlights: [
      "Implemented six search strategies in separate modules (bfs, dfs, ids, greedy, A_star, hillClimb) with shared utils: parse_input_file, Node, flip, goal/unsafe checks, Hamming heuristic; consistent path + expanded-order output.",
      "Input format: 3-line file (start, goals, unsafe); X in goals = don’t care, X in unsafe = expanded to all concrete states; state space = flip one bit per step; bounded search (default 1000 expansions).",
      "Single entry point (broken_printer.py) with strategy letter (B/D/I/G/A/H); standard library only; documented for INFO1113/COMP9003 at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/heuristic-search-engine",
    bookmarkLabel: "Search Engine",
    accent: "#059669",
    mediaType: "image",
    mediaLabel: "Heuristic search engine",
  },
  {
    id: "diabetes-risk-prediction",
    name: "Diabetes Risk Prediction — Pima Dataset",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python 3.9+", "pandas", "scikit-learn", "Logistic Regression", "StandardScaler", "ML pipeline"],
    shortDescription:
      "ML pipeline for diabetes risk prediction on the Pima Indians dataset: load CSV, 75/25 stratified train/test split, StandardScaler (fit on train only), logistic regression; reports accuracy, precision/recall/F1, and confusion matrix.",
    highlights: [
      "End-to-end pipeline: load data with explicit column names, train_test_split(stratify=y, random_state=42), scale with StandardScaler fit on train only to avoid leakage, LogisticRegression with fixed seed; reproducible runs.",
      "Evaluation: accuracy (~72%), classification report (precision, recall, F1), confusion matrix; 768 instances, 8 numeric features, binary outcome; requirements.txt and .venv for portable setup.",
      "Documented for COMP3308 / Machine Learning at University of Sydney; README with versions, quick start, troubleshooting, and dataset references.",
    ],
    link: "https://github.com/bhakthisalimath/diabetes-risk-prediction",
    bookmarkLabel: "Diabetes ML",
    accent: "#dc2626",
    mediaType: "image",
    mediaLabel: "Diabetes risk prediction",
  },
  {
    id: "stdchip-simulator",
    name: "StdChip Architecture Simulator",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python 3.6+", "Assembler", "Emulator", "Custom ISA", "Standard library only"],
    shortDescription:
      "Custom instruction-set architecture with a two-stage toolchain: assembler (assembly → binary or hex listing) and emulator (load and execute). 11 opcodes, labels, multi-base literals, READ/PUT I/O, CALL subprocess; 256-byte memory, zero dependencies.",
    highlights: [
      "Full ISA: SET, MOV, ADD, SUB, READ, PUT, JMP, JEQ, JGT, CALL, EXIT; assembly with :labels:, // comments, 0x/0b/0o/decimal/'c' literals; binary format (magic + 4-byte instructions); assembler two-pass (labels → indices, encode).",
      "Emulator: 256-byte memory, fetch–execute loop; READ N/S from stdin, PUT N (b/o/d/h) or S to stdout; CALL runs emulator on path in memory via fork/exec, stores exit code; EXIT with code from memory.",
      "Pure Python, standard library only; --hex for human-readable listing; documented for INFO1113/COMP9003 at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/stdchip-architecture-simulator",
    bookmarkLabel: "StdChip Simulator",
    accent: "#7c3aed",
    mediaType: "image",
    mediaLabel: "StdChip assembler and emulator",
  },
  {
    id: "trivia-net",
    name: "Trivia.NET — Distributed Trivia Platform",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python 3.8+", "TCP", "JSON", "threading", "selectors", "Optional: Ollama/requests"],
    shortDescription:
      "Multiplayer network trivia: central TCP server, multiple clients. Human, auto (built-in solver), and AI (Ollama) modes. Timed questions (math, Roman numerals, CIDR), live leaderboard, config-driven (server_config.json, client_*.json).",
    highlights: [
      "Server: single TCP socket, selectors, newline-delimited JSON (HI, READY, QUESTION, RESULT, LEADERBOARD, FINISHED); game loop waits for required players, runs question types in order, checks answers via internal solvers.",
      "Clients: CONNECT <host>:<port>; receiver thread; modes you (human input), auto (solver), ai (Ollama API); requests imported only in AI path so you/auto need zero pip installs.",
      "questions.py: math expressions, Roman numerals, usable IPs in subnet, network/broadcast address; config-driven prompts and timing; documented for INFO1113/COMP9003 at University of Sydney.",
    ],
    link: "https://github.com/bhakthisalimath/Trivia.NET",
    bookmarkLabel: "Trivia.NET",
    accent: "#2563eb",
    mediaType: "image",
    mediaLabel: "Distributed trivia game",
  },
  {
    id: "bit-state-manager",
    name: "BitStateManager — Naughty Bits CLI",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2024",
    techStack: ["Java", "CLI", "State management", "Parsing"],
    shortDescription:
      "Interactive Java CLI that manages a sequence of bits classified as naughty (1) or good (0). Supports check, change, and exit commands with right-to-left indexing.",
    highlights: [
      "Built robust input parsing for interactive CLI with check <string>, change <index> <state>, and exit commands.",
      "Maintained mutable bit configuration and correct right-to-left index mapping with edge-case handling for invalid input.",
      "Designed for deterministic output and automated marking; documented behaviour and troubleshooting.",
    ],
    link: "https://github.com/bhakthisalimath/bit-state-manager",
    bookmarkLabel: "Bit Manager",
    accent: "#60a5fa",
    mediaType: "image",
    mediaLabel: "CLI bit state tool",
  },
  {
    id: "moviestore-management",
    name: "MovieStore Management System",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Java 17", "Gradle", "OOP", "UML"],
    shortDescription:
      "Java OOP-based movie rental system with inventory tracking, copyright validation (50-year rule), and studio-based querying. Implements Actor, Studio, Movie, and MovieStore from a UML spec.",
    highlights: [
      "Translated UML to clean OOP: Actor, Studio, Movie, MovieStore with encapsulation and relationships; add/rent copies and out-of-stock handling.",
      "Implemented getMoviesByStudio(studio) and getMoviesWithoutCopyright() with Movie.copyrighted() logic (2024 − releaseYear < 50).",
      "Used Gradle wrapper and .sdkmanrc (Java 17) for reproducible builds; documented structure and quick start.",
    ],
    link: "https://github.com/bhakthisalimath/moviestore-management-system",
    bookmarkLabel: "MovieStore",
    accent: "#a78bfa",
    mediaType: "image",
    mediaLabel: "Movie rental system",
  },
  {
    id: "holiday-planner",
    name: "HolidayPlanner — Flask & SQLAlchemy",
    role: "Solo Developer",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Python 3.10+", "Flask 3", "SQLAlchemy 2", "Jinja2", "Flask-SocketIO", "SQLite"],
    shortDescription:
      "Full-stack holiday booking web app with sign up/login, browse and filter packages, cart, checkout, and admin CRUD. Uses Flask, SQLAlchemy, Jinja2 templates, and Flask-SocketIO for real-time updates.",
    highlights: [
      "Implemented authentication (sign up, login) with role-based access (user vs admin); browse and filter packages by category, price, and duration.",
      "Built booking cart with configurable nights, checkout with shipping and payment details, and admin-only create/edit/delete for packages.",
      "Used SQLite and SQLAlchemy models (User, Package); Flask-SocketIO for real-time support; runs on fixed port (localhost:1204) with venv-based setup.",
    ],
    link: "https://github.com/bhakthisalimath/Holiday-booking-system",
    bookmarkLabel: "HolidayPlanner",
    accent: "#0d9488",
    mediaType: "image",
    mediaLabel: "Holiday booking app",
  },
  {
    id: "bitesavr",
    name: "BiteSavr — Grocery Price Comparison",
    role: "Group Project (Contributor)",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Angular 17", "TypeScript 5.4", "Python 3.8+", "Flask 2.3+", "Flask-CORS", "REST API", "Full-stack"],
    shortDescription:
      "Full-stack web app that compares grocery prices across Aldi, Coles, and Woolworths. Build a basket, see the cheapest option per item and the best single store for your full list, with per-store baskets and missing-item handling.",
    highlights: [
      "Angular SPA (TechDivas/) with Flask REST API: POST /api/submit and /api/store_baskets; CORS enabled for local dev (frontend on 4200, backend on 5000).",
      "Item lookup with quantity-type hints from catalogue; two views—cheapest-per-item and best single store—with expandable per-store baskets (Aldi, Coles, Woolworths) and clear missing-item feedback.",
      "Backend loads aldiData.json, products_data.json, woolworthsData.json; substring matching and aggregation for basket totals and store comparison; documented versions, quick start, and troubleshooting (WIT Hack / uni project).",
    ],
    link: "https://github.com/bhakthisalimath/bitesavr-grocery-price-comparison",
    bookmarkLabel: "BiteSavr",
    accent: "#22c55e",
    mediaType: "image",
    mediaLabel: "BiteSavr grocery comparison",
  },
  {
    id: "vsas",
    name: "Virtual Scroll Access System (VSAS)",
    role: "Group Project (Contributor)",
    period: "Jan 2024 – Dec 2025",
    techStack: ["Java 21", "Gradle", "SQLite", "BCrypt", "JUnit 5", "JaCoCo", "Web app"],
    shortDescription:
      "Web-based document management system for uploading, organizing, searching, and downloading PDF scrolls with role-based authentication and admin controls. Includes dashboards, profile management, and download tracking analytics.",
    highlights: [
      "Built end-to-end PDF document workflows: upload, browse, preview, download, and filtering/search across scroll metadata with guest access for public documents.",
      "Implemented secure authentication with BCrypt password hashing and role-based access (admin, regular user, guest) with dedicated dashboards and admin user management.",
      "Added automated tests (JUnit) with JaCoCo coverage reporting (≥ 75% target) and Gradle wrapper builds; SQLite database initializes on server start.",
    ],
    link: "https://github.com/bhakthisalimath/Virtual-Scroll-Access-System-VSAS-",
    bookmarkLabel: "VSAS",
    accent: "#64748b",
    mediaType: "image",
    mediaLabel: "VSAS document portal",
  },
];

export const projectsCopy: {
  title: string;
  intro: string;
} = {
  title: "Projects",
  intro:
    "Academic and personal projects in Java, Python, data structures, and OOP—from graphical games and CLI tools to BST-based systems, UML-driven design, and full-stack web apps.",
};
