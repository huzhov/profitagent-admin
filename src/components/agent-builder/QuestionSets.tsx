import { useEffect, useState, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import type {
  JsonSchema,
  Question,
  handleOnChangeInput,
  updateOptionAt,
  removeOptionRow,
} from "./types";
import { JsonDefaultSchema } from "./schema";
import QuestionSetsPanel from "./QuestionSetsPanel";

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
  const [prevQuestionSets, setPrevQuestionSets] = useState(questionSets);
  // UI state for adding and editing question
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [questionName, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [questionNote, setQuestionNote] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["Option 1"]);

  const { schema: parsedSchema, error: parseError } = useMemo(() => {
    const parseSchema = (questionSets: string) => {
      try {
        if (!questionSets || !questionSets.trim()) {
          return { schema: JsonDefaultSchema, error: "" };
        }
        const parsed = JSON.parse(questionSets);

        if (!parsed || !Array.isArray(parsed.questions)) {
          return {
            schema: null,
            error: `Schema must be an object with a 'questions' array`,
          };
        }
        if (typeof parsed.name !== "string") {
          return { schema: null, error: `Schema must include a 'name' string` };
        }

        // validate question object
        const invalidQuestionIndex = parsed.questions.findIndex(
          (question: any) => {
            if (typeof question !== "object" || question === null) return true;
            if (typeof question.id !== "string") return true;
            if (typeof question.question !== "string") return true;
            if (typeof question.type !== "string") return true;
            if (typeof question.note !== "string") return true;
            return false;
          }
        );

        if (invalidQuestionIndex !== -1) {
          return {
            schema: null,
            error: `Invalid question object at index ${invalidQuestionIndex}. Expected { id, question, type, note? }`,
          };
        }

        const normalized = {
          ...parsed,
          questions: parsed.questions.map((question: any, index: number) => ({
            id: question.id || `q${index + 1}`,
            question: question.question || "Untitled question",
            type: question.type || "text",
            options: Array.isArray(question.options)
              ? question.options
              : question.type === "options"
                ? ["Option 1"]
                : undefined,
            note: typeof question.note === "string" ? question.note : "",
          })),
        };

        if (normalized.name.length < 3) {
          return {
            schema: normalized,
            error: `"name" must be at least 3 characters`,
          };
        }
        if (normalized.questions.length < 1) {
          return {
            schema: normalized,
            error: `Schema must have at least 1 question`,
          };
        }

        return { schema: normalized, error: "" };
      } catch (err: unknown) {
        if (err instanceof Error) return { schema: null, error: err.message };
        return { schema: null, error: "Unknown JSON parse error" };
      }
    };

    return parseSchema(questionSets);
  }, [questionSets]);

  const [schema, setSchema] = useState<JsonSchema>(() => {
    return parsedSchema || JsonDefaultSchema;
  });

  if (questionSets !== prevQuestionSets) {
    setPrevQuestionSets(questionSets);
    if (parsedSchema) {
      if (JSON.stringify(parsedSchema) !== JSON.stringify(schema)) {
        setSchema(parsedSchema);
      }
    }
  }

  useEffect(() => {
    if (parseError) {
      if (parseError !== error) setQuestionSetError(parseError);
    } else if (error) clearQuestionSetError();
  }, [parseError, error, setQuestionSetError, clearQuestionSetError]);

  // Panel Functions
  const openAddPanel = () => {
    setQuestionId("");
    setQuestionText("");
    setQuestionType("text");
    setQuestionOptions(["Option 1"]);
    setQuestionNote("");
    setShowAddPanel(true);
  };

  const openEditPanel = (question: Question) => {
    setShowAddPanel(false);
    setQuestionId(question.id);
    setQuestionText(question.question);
    setQuestionType(question.type);
    setQuestionOptions(question.options ?? ["Option 1"]);
    setQuestionNote(question.note ?? "");
  };

  const closePanel = () => {
    setQuestionId("");
    setShowAddPanel(false);
  };

  const handleOnChangePanelInput: handleOnChangeInput = (name, value) => {
    switch (name) {
      case "name":
        return setQuestionText(value);
      case "type":
        return setQuestionType(value);
      case "note":
        return setQuestionNote(value);
    }
  };

  // Questions Functions
  const addEditQuestionFromPanel = () => {
    // clean Options
    const cleanOptions =
      questionType === "options"
        ? questionOptions.filter((o) => o?.trim())
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
    setShowAddPanel(false);
  };

  const moveQuestion = (direction: string, index: number) => {
    const newQuestionArr = [...schema?.questions]; // Create a question copy array
    if (direction === "Up") {
      //Swap array direction up
      [newQuestionArr[index - 1], newQuestionArr[index]] = [
        newQuestionArr[index],
        newQuestionArr[index - 1],
      ];
    } else {
      // Swap array direction down
      [newQuestionArr[index + 1], newQuestionArr[index]] = [
        newQuestionArr[index],
        newQuestionArr[index + 1],
      ];
    }

    const swapQuestionId = newQuestionArr.map((q, i) => ({
      ...q,
      id: `q${i + 1}`,
    }));

    const newSchema = {
      ...schema,
      questions: swapQuestionId,
    };

    setQuestionSets(JSON.stringify(newSchema, null, 2));
  };

  const removeQuestion = (index: number) => {
    const filtered = schema.questions.filter((_, i) => index !== i);
    const newSchema = { ...schema, questions: filtered };
    setQuestionSets(JSON.stringify(newSchema, null, 2));
  };

  // Options Functions
  const addOptionRow = () => {
    setQuestionOptions((prev) => [...prev, `Option ${prev.length + 1}`]);
  };

  const updateOptionAt: updateOptionAt = (index, value) => {
    setQuestionOptions((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const removeOptionRow: removeOptionRow = (index) => {
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
        <div className="text-sm text-red-500 mt-1">
          {error ? `JSON error: ${error}` : ""}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Tip: edit the JSON the UI updates automatically. Supports types:{" "}
          <code>text</code>, <code>email</code>, <code>options</code>.
        </p>
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
      <div className="space-y-4">
        {schema.questions.map((question, index) => (
          <div key={index}>
            <div className="flex items-center w-full gap-2">
              <div className="w-full">
                <div className="flex gap-2 ">
                  <div className="w-full">
                    <Label className="block font-medium w-full">
                      {question.question}
                    </Label>
                  </div>
                  <div className="flex justify-end gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-1 w-1"
                      disabled={!index}
                      onClick={() => moveQuestion("Up", index)}
                    >
                      <ChevronUp />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-1 w-1"
                      disabled={schema.questions.length - 1 === index}
                      onClick={() => moveQuestion("Down", index)}
                    >
                      <ChevronDown />
                    </Button>
                  </div>
                </div>
                {/* Questions Type Render */}
                {question.type === "options" ? (
                  <div>
                    <div className="flex gap-2 items-center mb-2 rounded">
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
              <div className="flex flex-col">
                <div className="flex gap-2">
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
                    onClick={() => removeQuestion(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
            {/* Show Edit Panel */}
            {questionId === question.id && (
              <QuestionSetsPanel
                id={questionId}
                name={questionName}
                type={questionType}
                options={questionOptions}
                handleOnChangeInput={handleOnChangePanelInput}
                addOptionRow={addOptionRow}
                updateOptionAt={updateOptionAt}
                removeOptionRow={removeOptionRow}
                addEditQuestionFromPanel={addEditQuestionFromPanel}
                closePanel={closePanel}
              />
            )}
          </div>
        ))}
      </div>
      {/* Show Add Panel */}
      {showAddPanel ? (
        <QuestionSetsPanel
          name={questionName}
          type={questionType}
          options={questionOptions}
          handleOnChangeInput={handleOnChangePanelInput}
          addOptionRow={addOptionRow}
          updateOptionAt={updateOptionAt}
          removeOptionRow={removeOptionRow}
          addEditQuestionFromPanel={addEditQuestionFromPanel}
          closePanel={closePanel}
        />
      ) : (
        <Button onClick={openAddPanel} className="w-full mt-2" size="sm">
          Add Question
        </Button>
      )}
    </div>
  );
});
