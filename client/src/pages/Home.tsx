import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ContinentFilter } from '@/components/ContinentFilter';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { t } from '@/i18n/pt-BR';

export default function Home() {
  const [, setLocation] = useLocation();
  const { settings } = useGameStore();

  const navigateTo = (path: string) => {
    audioManager.playClick();
    setLocation(path);
  };

  return (
    <>
      <Header />
      
      <div className="p-6 space-y-6">
        <div className="text-center mb-8">
          <div className={`w-32 h-24 mx-auto mb-4 rounded-xl overflow-hidden flag-shadow ${!settings.calmMode ? 'gentle-bounce' : ''}`}>
            <img 
              src="/flags/BR.svg" 
              alt="Bandeira do Brasil" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a simple colored rectangle if SVG fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(to bottom, #009739 0%, #009739 33%, #FEDF00 33%, #FEDF00 66%, #009739 66%)';
                }
              }}
            />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">{t('learnFlags')}</h2>
          <p className="text-muted-foreground">{t('discoverCountries')}</p>
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            onClick={() => navigateTo('/quiz')}
            className="w-full bg-quiz-primary text-white p-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors duration-200 touch-target"
          >
            <i className="fas fa-play mr-3" />
            {t('playQuiz')}
          </Button>
          
          <Button
            size="lg" 
            onClick={() => navigateTo('/practice')}
            className="w-full bg-quiz-secondary text-white p-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors duration-200 touch-target"
          >
            <i className="fas fa-graduation-cap mr-3" />
            {t('freePractice')}
          </Button>
          
          <Button
            size="lg"
            onClick={() => navigateTo('/collection')}
            className="w-full bg-quiz-accent text-white p-4 rounded-xl font-semibold text-lg hover:bg-yellow-600 transition-colors duration-200 touch-target"
          >
            <i className="fas fa-collection mr-3" />
            {t('myCollection')}
          </Button>
        </div>

        <ContinentFilter />
      </div>
    </>
  );
}
