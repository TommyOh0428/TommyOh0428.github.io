export const projects = {
  p1: {
    name: "multiagent_path_finding.py",
    link: "",
    details: `- Implemented Conflict-Based Search Algorithm to generate optimal, conflict-free paths for multiple agents.
- Architected the parallel Conflict-Based Search Algorithm and improved computational efficiency by 70%.
- Ensured the algorithm's reliability by creating Pytest unit tests and automated shell scripts for execution.
- Fixed the bugs in the MAPF visualizer and enhanced its usability for better visualization of agent paths.
Impact: Improved the search algorithm by 70% by parallelizing node expansions, enhancing performance in complex environments.
Tech: Python, JavaScript, Pytest, Multi-threading, Conflict-Based Search (CBS).`,
  },
  p2: {
    name: "simple_custom_shell.c",
    link: "",
    details: `- Implemented a POSIX-style shell in C using syscalls for process management and signal handling.
- Developed built-in commmands (cd, exit, history) and custom commands with piping and redirection.
- Managed process lifecycle and signal using sigaction, waitpid, and fork.
- Built a robust command tokenizer to handle quotes, escapes, and redirection.
Tech: C, POSIX, Unix System Calls.`,
  },
  p3: {
    name: "cannon_chaos.py",
    link: "https://github.com/TommyOh0428/cannon-chaos",
    details: `- Desiged a custom networking protocol for efficient and time synchronization between server and clients.
- Implemented TCP socket communication for reliable game state transmission.
- Created Pytest for clients and server for robust and reliable connection for the game.
Tech: Python, TCP Sockets, Pytest.
`,
  },
  p4: {
    name: "multi_agent_developer_bot.py",
    link: "https://github.com/TommyOh0428/Multiagent-Bot",
    details: `- Utilized the Large Language Model with predefined instructions for agent specific responses.
- Containerized the environment for execution, ensuring portability and consistency using Docker.
- Deployed via AWS Lambda with GitHub Actions for serverless execution and automated CI/CD pipeline.
- Implemented automated testing using Bash script for streamlined validation and code quality.
Tech: Python, Docker, AWS Lambda, GitHub Actions, Bash.
`,
  },
  p5: {
    name: "swe_resume_evaluator.js",
    link: "https://github.com/sfuosdev/swe-resume-evaluator",
    details: `- Built a React-based SaaS platform that analyzes the resumes and provides structured feedback.
- Implemented OAuth authentication with Firebase and Express.js, ensuring secure user access.
- Designed interactive React components for visualizing resume analysis results.
Tech: JavaScript, React, Firebase, Express.js.
`,
  },
  p6: {
    name: "numerical_method_visualizer.jsx",
    link: "https://github.com/sfuosdev/Macm316",
    details: `- Developed a React-based visualization tool to help students grasp complex numerical methods.
- Applied Agile methodology, gathering feedback from colleagues for continuous improvement.
- Implemented Test-Driven Development to ensure reliability and maintainability.
Tech: JavaScript, React.
`,
  },
  p7: {
    name: "sfu_rmp.js",
    link: "https://github.com/sfuosdev/SFU-RMP",
    details: `- Developed a Chrome extension to streamline course evaluations and professor ratings for SFU students.
- Implemented professor and course data crawling using Node.js.
- Applied agile practices, incorporating user feedback for iterative enhancements.
- Ensured code quality through unit tests using Jest framework.
Tech: JavaScript, Chrome extension.
`,
  },
};
