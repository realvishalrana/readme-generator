import html2pdf from "html2pdf.js";

export const exportAsMarkdown = (
  markdown: string,
  filename: string = "README"
) => {
  // Create a Blob with the markdown content
  const blob = new Blob([markdown], { type: "text/markdown" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.md`;

  // Programmatically click the anchor to trigger download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAsPdf = (markdown: string, filename: string = "README") => {
  // Create a hidden div to render the HTML
  const element = document.createElement("div");
  element.style.padding = "20px";
  element.style.maxWidth = "800px";
  element.style.margin = "0 auto";
  element.style.fontFamily = "Arial, sans-serif";

  // Convert markdown to HTML
  const html = markdownToHTML(markdown);
  element.innerHTML = html;

  // Append to body temporarily (necessary for proper rendering)
  document.body.appendChild(element);

  // Configure html2pdf options
  const opt = {
    margin: 10,
    filename: `${filename}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate PDF
  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      // Remove the element after PDF is generated
      document.body.removeChild(element);
    });
};

// More robust markdown to HTML conversion for PDF
const markdownToHTML = (markdown: string): string => {
  const html = markdown
    // Headers
    .replace(
      /^# (.*$)/gm,
      '<h1 style="font-size: 24px; font-weight: bold; margin: 16px 0; color: #333;">$1</h1>'
    )
    .replace(
      /^## (.*$)/gm,
      '<h2 style="font-size: 20px; font-weight: bold; margin: 14px 0; color: #333;">$1</h2>'
    )
    .replace(
      /^### (.*$)/gm,
      '<h3 style="font-size: 18px; font-weight: bold; margin: 12px 0; color: #333;">$1</h3>'
    )
    // Bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Code blocks
    .replace(
      /```([^`]*?)```/gms,
      '<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto; margin: 10px 0; font-family: monospace;">$1</pre>'
    )
    .replace(
      /`([^`]+)`/g,
      '<code style="background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px; font-family: monospace; font-size: 0.9em;">$1</code>'
    )
    // Lists
    .replace(/^\s*\*\s(.*$)/gm, '<li style="margin: 5px 0;">$1</li>')
    // Wrap lists in ul
    .replace(
      /(<li.*?>.*?<\/li>(\n|$))+/g,
      (match) => `<ul style="padding-left: 20px; margin: 10px 0;">${match}</ul>`
    )
    // Links
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" style="color: #0366d6; text-decoration: none;">$1</a>'
    )
    // Paragraphs
    .replace(
      /^(?!<[uh]|<pre|<li|<a|<code)(.+)$/gm,
      '<p style="margin: 10px 0; line-height: 1.5;">$1</p>'
    );

  return html;
};
