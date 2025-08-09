import { useEffect } from "react";
import { Switch, Route, Router } from "wouter";
import { useGameStore } from "@/lib/store";
import { audioManager } from "@/lib/audio";
import { cn } from "@/lib/utils";

import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Practice from "@/pages/Practice";
import Settings from "@/pages/Settings";
import Collection from "@/pages/Collection";
import NotFound from "@/pages/not-found";

// Configure base path for GitHub Pages
const basePath = import.meta.env.PROD ? "/cecigames" : "";

function App() {
  const { settings } = useGameStore();

  useEffect(() => {
    // Apply global settings
    const root = document.documentElement;
    
    if (settings.calmMode) {
      root.classList.add('calm-mode');
    } else {
      root.classList.remove('calm-mode');
    }
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0ms');
    } else {
      root.style.removeProperty('--animation-duration');
    }

    // Initialize audio with volume
    audioManager.setVolume(settings.volumeLevel / 100);
    audioManager.setEnabled(settings.soundEnabled);
  }, [settings]);

  return (
    <Router base={basePath}>
      <div className={cn(
        "max-w-md mx-auto bg-background min-h-screen",
        settings.calmMode && "calm-mode"
      )}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/practice" component={Practice} />
          <Route path="/settings" component={Settings} />
          <Route path="/collection" component={Collection} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
