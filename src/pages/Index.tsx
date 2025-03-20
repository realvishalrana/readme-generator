import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ProjectForm from "@/components/ProjectForm";
import ReadmePreview from "@/components/ReadmePreview";
import TemplateSelector from "@/components/TemplateSelector";
import { generateReadme } from "@/utils/readmeGenerator";
import { templateOptions } from "@/data/templateOptions";
import { exportAsMarkdown, exportAsPdf } from "@/utils/exportUtils";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    features: [""],
    installation: "",
    usage: "",
    technologies: ["React", "TypeScript", "HTML", "CSS"],
    prerequisites: "",
    apis: "",
    deployment: "",
    contributing: "",
    license: "MIT",
    acknowledgements: "",
  });

  const [generatedReadme, setGeneratedReadme] = useState("");

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    generateReadmeContent(templateId, projectData);
  };

  const handleDataChange = (newData: typeof projectData) => {
    setProjectData(newData);
    generateReadmeContent(selectedTemplate, newData);
  };

  const generateReadmeContent = (
    template: string,
    data: typeof projectData
  ) => {
    const readme = generateReadme(template, data);
    setGeneratedReadme(readme);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme).then(
      () => {
        toast({
          title: "Copied to clipboard!",
          description: "Your README has been copied to clipboard.",
        });
      },
      () => {
        toast({
          variant: "destructive",
          title: "Copy failed",
          description: "Failed to copy to clipboard. Please try again.",
        });
      }
    );
  };
  const handleExportAsMarkdown = () => {
    if (!generatedReadme.trim()) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Please generate content before exporting.",
      });
      return;
    }

    exportAsMarkdown(generatedReadme, projectData.projectName || "README");
    toast({
      title: "Export successful!",
      description: "Your README.md file has been downloaded.",
    });
  };

  const handleExportAsPdf = () => {
    if (!generatedReadme.trim()) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Please generate content before exporting.",
      });
      return;
    }

    exportAsPdf(generatedReadme, projectData.projectName || "README");
    toast({
      title: "Export successful!",
      description: "Your README PDF file has been downloaded.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-2">
          React README Generator
        </h1>
        <p className="text-muted-foreground">
          Create professional README files for your React projects in seconds
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TemplateSelector
            templates={templateOptions}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateChange}
          />
        </div>

        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="edit">Edit Content</TabsTrigger>
              <TabsTrigger value="preview">Preview README</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="mt-0">
              <ProjectForm
                projectData={projectData}
                onDataChange={handleDataChange}
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <div className="bg-card rounded-lg border p-4 mb-4 flex justify-end">
                <Button onClick={copyToClipboard} variant="outline">
                  Copy to Clipboard
                </Button>
                <Button onClick={handleExportAsMarkdown} variant="outline">
                  Export as README.md
                </Button>
                <Button onClick={handleExportAsPdf} variant="outline">
                  Export as PDF
                </Button>
              </div>
              <ReadmePreview markdown={generatedReadme} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
