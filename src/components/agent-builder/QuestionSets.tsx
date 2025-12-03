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
import type { Questions } from "./types";
import { JsonDefaultSchema } from "./schema";

type QuestionSetsProps = {
  questionSets: string;
  error: string;
  setQuestionSets: (value: string) => void;
  setQuestionSetError: (value: string) => void;
  clearQuestionSetError: () => void;
};

const placeholder = `{
  name: "Customer Onboarding",
  questions: [
    {
      id: "q1_name",
      question: "What's your full name?",
      type: "text",
      note: "We'll use this to personalize your experience",
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
  const [questionName, setQuestionText] = useState("New question");
  const [questionType, setQuestionType] = useState("text");
  const [questionNote, setQuestionNote] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["Option 1"]);

  useEffect(() => {
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
        questions: parsed.questions.map((q: Questions, index: number) => ({
          id: q.id || `q_${index + 1}`,
          question: q.question || "Untitled question",
          type: q.type || "text",
          options: Array.isArray(q.options)
            ? q.options
            : q.type === "options"
              ? ["Option 1"]
              : undefined,
          note: q.note || "",
        })),
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
    setQuestionText("New question");
    setQuestionType("text");
    setQuestionOptions(["Option 1"]);
    setQuestionNote("");
    setShowPanel(true);
  };

  const openEditPanel = (question: Questions) => {
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
        questions: schema.questions.map((q) =>
          q.id === questionId ? { ...editedQuestion } : q
        ),
      };
      setQuestionSets(JSON.stringify(editedSchema, null, 2));
      setQuestionId("");
    }
    setShowPanel(false);
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
      <Label className={`font-semibold mb-2 ${error ? "text-red-500" : ""}`}>
        Editable JSON
      </Label>
      <Textarea
        spellCheck={false}
        value={questionSets}
        onChange={(e) => setQuestionSets(e.target.value)}
        rows={6}
        placeholder={placeholder}
      />
      <div className="mb-5 text-sm ">
        <p className="text-xs text-gray-500 mt-1">
          Tip: edit the JSON the UI updates automatically. Supports types:{" "}
          <code>text</code>, <code>email</code>, <code>options</code>,{" "}
          <code>number</code>.
        </p>
        <div className="text-xs text-red-600 mt-1">
          {error ? `JSON error: ${error}` : ""}
        </div>
      </div>
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
      <Label className="font-bold mt-5 mb-2">
        Questions: {schema.questions?.length ?? 0}
      </Label>
      <div className="space-y-4">
        {schema.questions.map((question) => (
          <div key={question.id} className="flex items-center w-full gap-4">
            <div className="w-full">
              <Label className="block font-medium mb-1">
                {question.question}
              </Label>
              {/* Questions Type Render */}
              {question.type === "options" ? (
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <div className="flex-1">
                      {question.options && question.options.length ? (
                        question.options.map((opt: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <Input
                              type="checkbox"
                              name={question.id}
                              className="w-4 h-4 my-1"
                            />
                            <Label>{opt}</Label>
                          </div>
                        ))
                      ) : (
                        <Label className="text-sm text-gray-500">
                          No options provided
                        </Label>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Input
                  type={question.type}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
                />
              )}
              {question.note ? (
                <p className="text-xs text-gray-500 mt-1">{question.note}</p>
              ) : (
                <div className="p-2.5" />
              )}
            </div>
            <Button type="button" onClick={() => openEditPanel(question)}>
              <Pencil />
            </Button>
            <Button
              type="button"
              className="bg-red-600"
              onClick={() => {
                const filtered = schema.questions.filter(
                  (x) => x.id !== question.id
                );
                const newSchema = { ...schema, questions: filtered };
                setQuestionSets(JSON.stringify(newSchema, null, 2));
              }}
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
          <Label>Question Name</Label>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <Input
              value={questionName}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g., What's your full name?"
            />
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
                      <Input
                        value={opt}
                        onChange={(e) => updateOptionAt(i, e.target.value)}
                      />
                      <Button
                        className="px-2 py-1 bg-red-600"
                        onClick={() => removeOptionRow(i)}
                        type="button"
                      >
                        <Trash />
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button onClick={addOptionRow} type="button">
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <Label className="font-medium">Note</Label>
            <Input
              className="border rounded p-2"
              value={questionNote}
              onChange={(e) => setQuestionNote(e.target.value)}
              placeholder="e.g., We'll use this to personalize your experience"
            />

            <div className="flex gap-2 mt-3">
              <Button className="px-3 py-2" onClick={addEditQuestionFromPanel}>
                Save
              </Button>
              <Button className="px-3 py-2" onClick={closePanel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {!showPanel && (
        <Button onClick={openAddPanel} className="w-full mt-2">
          Add Question
        </Button>
      )}
    </div>
  );
});
