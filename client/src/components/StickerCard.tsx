import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Sticker } from '@shared/schema';

interface StickerCardProps {
  sticker: Sticker;
}

export function StickerCard({ sticker }: StickerCardProps) {
  return (
    <Card className={cn(
      "text-center border-2",
      sticker.unlocked ? "border-quiz-accent" : "border-gray-200"
    )}>
      <CardContent className="p-4">
        <div className="text-4xl mb-2">
          {sticker.unlocked ? sticker.emoji : <Lock className="h-8 w-8 mx-auto opacity-30" />}
        </div>
        <div className="text-sm font-medium text-foreground">{sticker.name}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {sticker.unlocked ? 'Desbloqueado!' : `${sticker.requirement} estrelas`}
        </div>
      </CardContent>
    </Card>
  );
}
