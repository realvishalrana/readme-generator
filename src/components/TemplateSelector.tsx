
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Template {
  id: string;
  name: string;
  description: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector = ({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Template</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedTemplate} 
          onValueChange={onSelectTemplate}
          className="gap-4"
        >
          {templates.map((template) => (
            <div key={template.id} className="flex items-start space-x-3">
              <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
              <div>
                <Label htmlFor={template.id} className="font-medium cursor-pointer">
                  {template.name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
