
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, XCircle } from "lucide-react";

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

interface ProjectFormProps {
  projectData: ProjectData;
  onDataChange: (data: ProjectData) => void;
}

const ProjectForm = ({ projectData, onDataChange }: ProjectFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onDataChange({
      ...projectData,
      [name]: value,
    });
  };

  const handleArrayItemChange = (fieldName: "features" | "technologies", index: number, value: string) => {
    const newArray = [...projectData[fieldName]];
    newArray[index] = value;
    
    onDataChange({
      ...projectData,
      [fieldName]: newArray,
    });
  };

  const addArrayItem = (fieldName: "features" | "technologies") => {
    onDataChange({
      ...projectData,
      [fieldName]: [...projectData[fieldName], ""],
    });
  };

  const removeArrayItem = (fieldName: "features" | "technologies", index: number) => {
    if (projectData[fieldName].length <= 1) return;
    
    const newArray = [...projectData[fieldName]];
    newArray.splice(index, 1);
    
    onDataChange({
      ...projectData,
      [fieldName]: newArray,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            
            <div className="grid gap-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                name="projectName"
                value={projectData.projectName}
                onChange={handleInputChange}
                placeholder="My Awesome React App"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleInputChange}
                placeholder="A brief description of what your project does and its main features"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Features</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => addArrayItem("features")}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Feature
                </Button>
              </div>
              
              {projectData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleArrayItemChange("features", index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  {projectData.features.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem("features", index)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Technologies</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => addArrayItem("technologies")}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Technology
                </Button>
              </div>
              
              {projectData.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => handleArrayItemChange("technologies", index, e.target.value)}
                    placeholder={`Technology ${index + 1}`}
                  />
                  {projectData.technologies.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem("technologies", index)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Installation & Usage</h2>
            
            <div className="grid gap-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Textarea
                id="prerequisites"
                name="prerequisites"
                value={projectData.prerequisites}
                onChange={handleInputChange}
                placeholder="Node.js v14+, npm or yarn"
                rows={2}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="installation">Installation Instructions</Label>
              <Textarea
                id="installation"
                name="installation"
                value={projectData.installation}
                onChange={handleInputChange}
                placeholder="1. Clone the repo\n2. Run npm install\n3. Run npm start"
                rows={4}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="usage">Usage</Label>
              <Textarea
                id="usage"
                name="usage"
                value={projectData.usage}
                onChange={handleInputChange}
                placeholder="Instructions on how to use your project after installation"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            
            <div className="grid gap-2">
              <Label htmlFor="apis">APIs Used</Label>
              <Textarea
                id="apis"
                name="apis"
                value={projectData.apis}
                onChange={handleInputChange}
                placeholder="List any external APIs your project uses"
                rows={2}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="deployment">Deployment</Label>
              <Textarea
                id="deployment"
                name="deployment"
                value={projectData.deployment}
                onChange={handleInputChange}
                placeholder="Instructions on how to deploy the project"
                rows={2}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contributing">Contributing Guidelines</Label>
              <Textarea
                id="contributing"
                name="contributing"
                value={projectData.contributing}
                onChange={handleInputChange}
                placeholder="Guidelines for contributors"
                rows={2}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="license">License</Label>
              <Input
                id="license"
                name="license"
                value={projectData.license}
                onChange={handleInputChange}
                placeholder="MIT, Apache 2.0, etc."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="acknowledgements">Acknowledgements</Label>
              <Textarea
                id="acknowledgements"
                name="acknowledgements"
                value={projectData.acknowledgements}
                onChange={handleInputChange}
                placeholder="Credits, inspirations, etc."
                rows={2}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
