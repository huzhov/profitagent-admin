import { useEffect, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Plus, Pencil } from "lucide-react";
import type { Question } from "./types";
import { JsonDefaultSchema } from "./schema";

type QuestionSetsProps = {
  questionSets: string;
  error: string;
  setQuestionSets: (value: string) => void;
  setQuestionSetError: (value: string) => void;
  clearQuestionSetError: () => void;
};

const jsonPlaceholder = `Paste your JSON question set here, e.g.: 
{
  "name": "Customer Onboarding",
  "questions": [
    {
      "id": "q1",
      "question": "What's your full name?",
      "type": "text",
      "note": "We'll use this to personalize your experience",
    },
  ],
}`;

export default memo(function QuestionSets({
  questionSets,
  setQuestionSets,
  error,
  setQuestionSetError,
  clearQuestionSetError,
}: QuestionSetsProps) {
  const [schema, setSchema] = useState(JsonDefaultSchema);

  // UI state for adding and editing question
  const [showPanel, setShowPanel] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [questionName, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [questionNote, setQuestionNote] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["Option 1"]);

  useEffect(() => {
    // If questionSets is cleared, setSchema to default
    if (!questionSets.length) {
      setSchema(JsonDefaultSchema);
      clearQuestionSetError();
      return;
    }

    try {
      const parsed = JSON.parse(questionSets);
      if (!parsed || !Array.isArray(parsed.questions)) {
        setQuestionSetError(
          `Schema must be an object with a 'questions' array`
        );
        return;
      }
      const normalized = {
        ...parsed,
        questions: parsed.questions.map(
          (question: Question, index: number) => ({
            id: question.id || `q_${index + 1}`,
            question: question.question || "Untitled question",
            type: question.type || "text",
            options: Array.isArray(question.options)
              ? question.options
              : question.type === "options"
                ? ["Option 1"]
                : undefined,
            note: question.note || "",
          })
        ),
      };
      setSchema(normalized);
      clearQuestionSetError();
    } catch (error: unknown) {
      if (error instanceof Error && questionSets.length)
        setQuestionSetError(error.message);
      else clearQuestionSetError();
    }
  }, [questionSets]);

  const openAddPanel = () => {
    setQuestionText("");
    setQuestionType("text");
    setQuestionOptions(["Option 1"]);
    setQuestionNote("");
    setShowPanel(true);
  };

  const openEditPanel = (question: Question) => {
    setQuestionId(question.id);
    setQuestionText(question.question);
    setQuestionType(question.type);
    setQuestionOptions(question.options ?? ["Option 1"]);
    setQuestionNote(question.note ?? "");
    setShowPanel(true);
  };

  const closePanel = () => {
    setQuestionId("");
    setShowPanel(false);
  };

  const addEditQuestionFromPanel = () => {
    // clean Options
    const cleanOptions =
      questionType === "options"
        ? questionOptions.filter((o) => o && o.trim())
        : undefined;
    if (!questionId) {
      // Add new question
      const nextId = `q${schema.questions.length + 1}`;
      const newQuestion = {
        id: nextId,
        question: questionName || `Question ${schema.questions.length + 1}`,
        type: questionType,
        ...(cleanOptions ? { options: cleanOptions } : {}),
        note: questionNote,
      };
      const newSchema = {
        ...schema,
        questions: [...schema.questions, newQuestion],
      };
      setQuestionSets(JSON.stringify(newSchema, null, 2));
    } else {
      // when QuestionId exists then edit question
      const editedQuestion = {
        id: questionId,
        question: questionName || `Question ${schema.questions.length + 1}`,
        type: questionType,
        ...(cleanOptions ? { options: cleanOptions } : {}),
        note: questionNote,
      };
      const editedSchema = {
        ...schema,
        questions: schema.questions.map((question) =>
          question.id === questionId ? { ...editedQuestion } : question
        ),
      };
      setQuestionSets(JSON.stringify(editedSchema, null, 2));
      setQuestionId("");
    }
    setShowPanel(false);
  };

  const removeQuestion = (question: Question) => {
    const filtered = schema.questions.filter((x) => x.id !== question.id);
    const newSchema = { ...schema, questions: filtered };
    setQuestionSets(JSON.stringify(newSchema, null, 2));
  };

  const updateOptionAt = (index: number, value: string) => {
    setQuestionOptions((prev) => prev.map((v, i) => (i === index ? value : v)));
  };
  const addOptionRow = () => {
    setQuestionOptions((prev) => [...prev, `Option ${prev.length + 1}`]);
  };
  const removeOptionRow = (index: number) => {
    setQuestionOptions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div>
        <Label className={`${error ? "text-red-500" : ""}`}>JSON</Label>
        <Textarea
          spellCheck={false}
          value={questionSets}
          onChange={(e) => setQuestionSets(e.target.value)}
          rows={12}
          placeholder={jsonPlaceholder}
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          Tip: edit the JSON the UI updates automatically. Supports types:{" "}
          <code>text</code>, <code>email</code>, <code>options</code>.
        </p>
        <div className="text-xs text-red-600 mt-1">
          {error ? `JSON error: ${error}` : ""}
        </div>
      </div>
      <Label className="font-bold my-3">Live Preview</Label>
      <div className="mt-3">
        <Label>Name</Label>
        <Input
          placeholder="e.g., Customer Inbound"
          className="mt-1.5"
          value={schema.name}
          onChange={(e) => {
            const newSchema = { ...schema, name: e.target.value };
            setQuestionSets(JSON.stringify(newSchema, null, 2));
          }}
        />
      </div>
      <Label className="my-3">Questions: {schema.questions?.length ?? 0}</Label>
      <div className="space-y-1">
        {schema.questions.map((question) => (
          <div key={question.id} className="flex items-center w-full gap-2">
            <div className="w-full">
              <Label className="block font-medium">{question.question}</Label>
              {/* Questions Type Render */}
              {question.type === "options" ? (
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <div className="flex-1">
                      {question.options && question.options.length ? (
                        question.options.map((opt: string, i: number) => (
                          <div
                            key={i}
                            className="flex justify-between w-full gap-2 border rounded-full w-full mt-1.5"
                          >
                            <Label className="ml-2">{opt}</Label>
                            <Input
                              type="radio"
                              name={question.id}
                              className="w-4 h-4 my-1.5 mr-2"
                            />
                          </div>
                        ))
                      ) : (
                        <Label className="text-sm text-gray-500 mt-1.5">
                          No options provided
                        </Label>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Input type={question.type} className="mt-1.5" />
              )}
              {question.note ? (
                <p className="text-xs text-gray-500 mt-1">{question.note}</p>
              ) : (
                <div className="p-2.5" />
              )}
            </div>
            <Button
              type="button"
              size="sm"
              onClick={() => openEditPanel(question)}
            >
              <Pencil />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-red-600"
              onClick={() => removeQuestion(question)}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
      {/* Show Add/Edit Panel */}
      {showPanel && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <Label className="mb-5">
            {questionId ? "Edit" : "Add New"} Question
          </Label>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div>
              <Label>Question Name</Label>
              <Input
                value={questionName}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g., What's your full name?"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="mr-2">Type:</Label>
              <Select
                value={questionType}
                onValueChange={(value) => setQuestionType(value)}
              >
                <SelectTrigger id="toneOfVoice" className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {questionType === "options" && (
              <div className="pt-2">
                <Label>Options</Label>
                <div className="space-y-2 mt-1">
                  {questionOptions.map((opt, i) => (
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
                value={questionNote}
                onChange={(e) => setQuestionNote(e.target.value)}
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
      )}
      {!showPanel && (
        <Button onClick={openAddPanel} className="w-full mt-2" size="sm">
          Add Question
        </Button>
      )}
    </div>
  );
});
