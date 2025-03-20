
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface ReadmePreviewProps {
  markdown: string;
}

const ReadmePreview = ({ markdown }: ReadmePreviewProps) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Basic markdown to HTML conversion
    let tempHtml = markdown
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold my-2">$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\s*\*\s(.*$)/gm, '<li class="ml-5">$1</li>')
      .replace(/(<\/li>\n<li)/g, '$1')
      .replace(/^(<li.*<\/li>)$/gm, '<ul class="list-disc my-2">$1</ul>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-2 rounded my-2 overflow-x-auto text-sm"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>')
      // Paragraphs
      .replace(/^(?!<[uh]|<pre|<li|<a)(.+$)/gm, '<p class="my-2">$1</p>')
      // Line breaks
      .replace(/\n\n/g, '<br/>');
    
    setHtml(tempHtml);
  }, [markdown]);

  return (
    <Card className="p-6 bg-white overflow-auto max-h-[800px]">
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </Card>
  );
};

export default ReadmePreview;
