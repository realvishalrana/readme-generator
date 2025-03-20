
interface ProjectData {
  projectName: string;
  description: string;
  features: string[];
  installation: string;
  usage: string;
  technologies: string[];
  prerequisites: string;
  apis: string;
  deployment: string;
  contributing: string;
  license: string;
  acknowledgements: string;
}

export const generateReadme = (template: string, data: ProjectData): string => {
  switch (template) {
    case "standard":
      return generateStandardReadme(data);
    case "comprehensive":
      return generateComprehensiveReadme(data);
    case "minimal":
      return generateMinimalReadme(data);
    default:
      return generateStandardReadme(data);
  }
};

// Standard template includes the most common sections
const generateStandardReadme = (data: ProjectData): string => {
  const featuresText = data.features.filter(f => f.trim() !== '')
    .map(feature => `* ${feature}`).join('\n');
  
  const techText = data.technologies.filter(t => t.trim() !== '')
    .map(tech => `* ${tech}`).join('\n');

  return `# ${data.projectName || "Project Name"}

${data.description || "Add your project description here"}

## Features

${featuresText || "* Feature 1\n* Feature 2\n* Feature 3"}

## Technologies Used

${techText || "* React\n* TypeScript\n* HTML\n* CSS"}

## Installation

${data.prerequisites ? `### Prerequisites\n\n${data.prerequisites}\n\n` : ""}
\`\`\`
${data.installation || "npm install\nnpm start"}
\`\`\`

## Usage

${data.usage || "Instructions on how to use the project after installation."}

${data.license ? `## License\n\n${data.license}` : ""}
${data.acknowledgements ? `\n\n## Acknowledgements\n\n${data.acknowledgements}` : ""}
`;
};

// Comprehensive template includes all possible sections
const generateComprehensiveReadme = (data: ProjectData): string => {
  const featuresText = data.features.filter(f => f.trim() !== '')
    .map(feature => `* ${feature}`).join('\n');
  
  const techText = data.technologies.filter(t => t.trim() !== '')
    .map(tech => `* ${tech}`).join('\n');

  return `# ${data.projectName || "Project Name"}

${data.description || "Add your project description here"}

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
${data.apis ? "- [API Reference](#api-reference)\n" : ""}
${data.deployment ? "- [Deployment](#deployment)\n" : ""}
${data.contributing ? "- [Contributing](#contributing)\n" : ""}
- [License](#license)
${data.acknowledgements ? "- [Acknowledgements](#acknowledgements)\n" : ""}

## Features

${featuresText || "* Feature 1\n* Feature 2\n* Feature 3"}

## Technologies Used

${techText || "* React\n* TypeScript\n* HTML\n* CSS"}

## Prerequisites

${data.prerequisites || "Node.js and npm installed on your machine."}

## Installation

\`\`\`
${data.installation || "# Clone the repository\ngit clone https://github.com/yourusername/your-repo.git\n\n# Navigate to the project directory\ncd your-repo\n\n# Install dependencies\nnpm install\n\n# Start the development server\nnpm start"}
\`\`\`

## Usage

${data.usage || "Instructions on how to use the project after installation."}

${data.apis ? `\n## API Reference\n\n${data.apis}` : ""}

${data.deployment ? `\n## Deployment\n\n${data.deployment}` : ""}

${data.contributing ? `\n## Contributing\n\n${data.contributing}` : ""}

## License

${data.license || "MIT"}

${data.acknowledgements ? `\n## Acknowledgements\n\n${data.acknowledgements}` : ""}
`;
};

// Minimal template includes only the essential sections
const generateMinimalReadme = (data: ProjectData): string => {
  const techText = data.technologies.filter(t => t.trim() !== '')
    .join(", ");

  return `# ${data.projectName || "Project Name"}

${data.description || "Add your project description here"}

## Stack

${techText || "React, TypeScript, HTML, CSS"}

## Quick Start

\`\`\`
${data.installation || "npm install\nnpm start"}
\`\`\`

${data.license ? `## License\n\n${data.license}` : ""}
`;
};
