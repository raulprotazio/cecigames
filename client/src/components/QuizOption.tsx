import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { audioManager } from '@/lib/audio';

interface QuizOptionProps {
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function QuizOption({
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  disabled,
  onClick,
}: QuizOptionProps) {
  const handleClick = () => {
    if (disabled) return;
    audioManager.playClick();
    onClick();
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "quiz-option w-full p-4 border-2 rounded-xl text-left font-medium transition-all duration-200 touch-target justify-between",
        !disabled && "hover:border-quiz-primary hover:bg-blue-50",
        isCorrect && "quiz-option-correct border-green-500 bg-green-50 text-green-800",
        isIncorrect && "quiz-option-incorrect border-red-500 bg-red-50 text-red-800",
        disabled && "quiz-option-disabled cursor-not-allowed"
      )}
    >
      <span className="text-left">{text}</span>
      <div className="ml-2">
        {isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
        {isIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
      </div>
    </Button>
  );
}
