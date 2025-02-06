import PromptSuggestionButton from "./PromptSuggestionButton";

interface PromptSuggestionsRowProps {
  handlePrompt: (prompt: string) => void;
}

const PromptSuggestionsRow: React.FC<PromptSuggestionsRowProps> = ({
  handlePrompt,
}) => {
  const prompts = [
    "What is the current NAV of the S&P 500 ETF?",
    "How many stocks are in the Vanguard S&P 500 ETF?",
    "What is the expense ratio of the S&P 500 ETF?",
    "What is the gross expense ratio of the SPDR ETF?",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prompts.map((prompt, index) => (
          <PromptSuggestionButton
            key={`suggestion-${index}`}
            text={prompt}
            onClick={() => handlePrompt(prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestionsRow;
