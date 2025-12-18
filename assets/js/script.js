import { profileInfoContent } from "./profile.js";
import { experienceContent } from "./experience.js";
import { projects } from "./projects.js";
import { papers } from "./papers.js";

// --- FUNCTIONS ---

// Function to apply syntax highlighting/coloring after typing
function formatTerminalOutput(text) {
  // 1. Highlight success status (Profile Info & Experience)
  text = text.replace(
    /\[STATUS\] - Online\/Available/g,
    "<span class='success'>[STATUS] - Online/Available</span>"
  );
  text = text.replace(/\[SUCCESS\]/g, "<span class='success'>[SUCCESS]</span>");

  // 2. Simple JSON key highlighting (yellow-400 in Tailwind-like color)
  // This assumes the text is mostly JSON structure for the profile info
  text = text.replace(
    /"(\w+)":/g,
    "<span class='text-yellow-400'>\"$1\"</span>:"
  );

  // 3. Highlight array brackets in skills (red-400 in Tailwind-like color)
  text = text.replace(/(\[[^\]]+\])/g, "<span class='text-red-400'>$1</span>");

  // 4. Highlight project and paper key details
  text = text.replace(
    /(Description|Tech|Impact|Features|Goal|Security|Abstract|Journal|Date|Citation|Conference|Keywords|Course Work|Topic|Title):/g,
    "<span class='text-cyan-400'>$1:</span>"
  );

  return text;
}

// The core typing function
function typeWriter(
  elementId,
  text,
  cursorId,
  speed = 25,
  callback = () => {}
) {
  const element = document.getElementById(elementId);
  const cursor = document.getElementById(cursorId);
  if (!element) return;

  // Ensure cursor is handled, though it might be null for content typing
  if (cursor) {
    let currentCursor = document.querySelector(`#${cursorId}`);
    if (currentCursor) currentCursor.style.display = "inline-block"; // Show cursor
  }

  let i = 0;
  element.innerHTML = ""; // Clear existing content

  // We type the raw text content only, ignoring HTML tags for the animation
  const rawText = text.replace(/<[^>]*>/g, "");

  function type() {
    if (i < rawText.length) {
      element.textContent += rawText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Typing finished
      if (cursor) {
        let currentCursor = document.querySelector(`#${cursorId}`);
        if (currentCursor) currentCursor.style.display = "none"; // Hide cursor
      }

      // Apply formatting (like color spans) after raw text is typed
      element.innerHTML = formatTerminalOutput(text);

      callback();
    }
  }
  type();
}

// Function to handle project link clicks (Mutually exclusive with papers)
function showProjectDetails(projectId) {
  const project = projects[projectId];
  if (!project) return;

  // Mutual Exclusivity: Hide paper details and show project details
  document.getElementById("paper-details").style.display = "none";
  const detailContainer = document.getElementById("project-details");

  // Ensure project output is visible
  detailContainer.style.display = "block";

  const commandText = `cat ${project.name}`;
  const linkElement = document.getElementById("detail-link");
  linkElement.href = project.link || "#";
  linkElement.textContent = project.link || "Repo not available";

  // Clear previous content instantly
  document.getElementById("detail-content").textContent = "";
  document.getElementById("project-command-text").textContent = "";

  // Step 1: Type the command text (slower speed for command typing)
  typeWriter("project-command-text", commandText, "detail-cursor", 40, () => {
    // Step 2: Type the content (output) (faster speed for output)
    typeWriter(
      "detail-content",
      project.details.trim(),
      "detail-cursor",
      15,
      () => {
        // Callback after output is typed (nothing needed here, cursor is hidden by typeWriter)
      }
    );
  });
}

// Function to handle paper link clicks (Mutually exclusive with projects)
function showPaperDetails(paperId) {
  const paper = papers[paperId];
  if (!paper) return;

  // Mutual Exclusivity: Hide project details and show paper details
  document.getElementById("project-details").style.display = "none";
  const detailContainer = document.getElementById("paper-details");

  // Ensure paper output is visible
  detailContainer.style.display = "block";

  const commandText = `cat ${paper.name}`;
  const linkElement = document.getElementById("paper-detail-link");
  linkElement.href = paper.link || "#";
  linkElement.textContent = paper.link
    ? "./" + paper.name
    : "Paper not available";
  if (paper.link) linkElement.target = "_blank";

  // Clear previous content instantly
  document.getElementById("paper-detail-content").textContent = "";
  document.getElementById("paper-command-text").textContent = "";

  // Step 1: Type the command text (slower speed for command typing)
  typeWriter(
    "paper-command-text",
    commandText,
    "paper-detail-cursor",
    40,
    () => {
      // Step 2: Type the content (output) (faster speed for output)
      typeWriter(
        "paper-detail-content",
        paper.details.trim(),
        "paper-detail-cursor",
        15,
        () => {
          // Callback after output is typed
        }
      );
    }
  );
}

// Expose functions to global scope for HTML onclick handlers
window.showProjectDetails = showProjectDetails;
window.showPaperDetails = showPaperDetails;

// --- INITIALIZATION ---

// Initial setup on page load
document.addEventListener("DOMContentLoaded", () => {
  const infoWarning = document.getElementById("info-warning");
  const experienceSection = document.getElementById("experience-section");

  // Hide the unused output section initially
  document.getElementById("paper-details").style.display = "none";
  document.getElementById("project-details").style.display = "none";

  // 1. Start typing for the main info pane (profile_info.json)
  typeWriter(
    "info-output",
    profileInfoContent.trim(),
    "info-cursor",
    20,
    () => {
      // 2. After info is typed, show and type the experience log
      if (infoWarning)
        infoWarning.textContent =
          "Log found. Running 'cat experience_log.txt'...";

      experienceSection.style.display = "block";

      typeWriter(
        "experience-output",
        experienceContent.trim(),
        "experience-cursor",
        18,
        () => {
          // Experience typing finished
        }
      );
    }
  );
});
