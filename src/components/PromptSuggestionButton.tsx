import { Button } from '@/components/ui/button'

interface PromptSuggestionButtonProps {
    text: string;
    onClick: () => void;
  }
  
  const PromptSuggestionButton: React.FC<PromptSuggestionButtonProps> = ({ text, onClick }) => {
    return (
      <Button
        onClick={onClick}
        variant="outline"
        className="w-full p-3 text-left justify-start bg-white hover:bg-gray-50
                   shadow-sm hover:shadow-md text-sm text-gray-700
                   hover:border-gray-300"
      >
        {text}
      </Button>
    )
  }
  
  export default PromptSuggestionButton