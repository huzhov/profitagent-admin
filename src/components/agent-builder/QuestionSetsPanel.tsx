import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Plus } from "lucide-react";
import type {
  handleOnChangeInput,
  updateOptionAt,
  removeOptionRow,
} from "./types";

type QuestionSetsPanelProps = {
  id?: string;
  name: string;
  type: string;
  options: string[];
  handleOnChangeInput: handleOnChangeInput;
  addOptionRow: () => void;
  updateOptionAt: updateOptionAt;
  removeOptionRow: removeOptionRow;
  addEditQuestionFromPanel: () => void;
  closePanel: () => void;
};

export default function QuestionSetsPanel({
  id,
  name,
  type,
  options,
  handleOnChangeInput,
  addOptionRow,
  updateOptionAt,
  removeOptionRow,
  addEditQuestionFromPanel,
  closePanel,
}: QuestionSetsPanelProps) {
  return (
    <div className="mt-4 p-3 border rounded bg-gray-50">
      <Label className="mb-5">
        {id ? `Edit "${name}"` : "Add New"} Question
      </Label>
      <div className="mt-2 grid grid-cols-1 gap-2">
        <div>
          <Label className="w-full">Question Name</Label>
          <Input
            onChange={(e) => handleOnChangeInput("name", e.target.value)}
            value={name}
            placeholder="e.g., What's your full name?"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="mr-2">Type:</Label>
          <Select
            onValueChange={(value) => handleOnChangeInput("type", value)}
            value={type}
          >
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="options">Options</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {type === "options" && (
          <div className="pt-2">
            <Label>Options</Label>
            <div className="space-y-2 mt-1">
              {options.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="flex gap-2"></div>
                  <Input
                    value={opt}
                    onChange={(e) => updateOptionAt(i, e.target.value)}
                  />
                  <Button
                    size="sm"
                    className="text-red-600"
                    variant="outline"
                    onClick={() => removeOptionRow(i)}
                    type="button"
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
              <div className="flex justify-end">
                <Button size="sm" onClick={addOptionRow} type="button">
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        )}
        <div>
          <Label>Note</Label>
          <Input
            className="mt-1.5"
            onChange={(e) => handleOnChangeInput("note", e.target.value)}
            placeholder="e.g., We'll use this to personalize your experience"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <Button size="sm" onClick={addEditQuestionFromPanel}>
            Save
          </Button>
          <Button size="sm" onClick={closePanel} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
