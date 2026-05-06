import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Spacebar control
    const handleSpacebar = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleSpacebar);
    return () => window.removeEventListener('keydown', handleSpacebar);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      // Clean up previous oscillators
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {}
      });
      oscillatorsRef.current = [];

      // Create audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      
      // Different sound for process page vs main page
      const isProcessPage = location.pathname === '/process';
      
      if (isProcessPage) {
        // Process page: Soft, flowing rhythm (gentle processing feel)
        const createProcessSound = () => {
          const oscillators = [];
          
          // Soft base frequency
          const baseOsc = audioContext.createOscillator();
          baseOsc.frequency.setValueAtTime(196, audioContext.currentTime); // G3 - gentle
          baseOsc.type = 'sine';
          
          // Flow layer
          const flowOsc = audioContext.createOscillator();
          flowOsc.frequency.setValueAtTime(293.6, audioContext.currentTime); // D4 - flowing
          flowOsc.type = 'triangle';
          
          // Light movement
          const movementOsc = audioContext.createOscillator();
          movementOsc.frequency.setValueAtTime(392, audioContext.currentTime); // G4 - light
          movementOsc.type = 'sine';
          
          // Gain nodes
          const baseGain = audioContext.createGain();
          const flowGain = audioContext.createGain();
          const movementGain = audioContext.createGain();
          
          baseGain.gain.setValueAtTime(0.02 * volume, audioContext.currentTime);
          flowGain.gain.setValueAtTime(0.015 * volume, audioContext.currentTime);
          movementGain.gain.setValueAtTime(0.01 * volume, audioContext.currentTime);
          
          // Connect
          baseOsc.connect(baseGain);
          flowOsc.connect(flowGain);
          movementOsc.connect(movementGain);
          baseGain.connect(audioContext.destination);
          flowGain.connect(audioContext.destination);
          movementGain.connect(audioContext.destination);
          
          // Start
          baseOsc.start();
          flowOsc.start();
          movementOsc.start();
          
          // Gentle flowing rhythm (not static)
          setInterval(() => {
            const flow = 0.01 + Math.sin(Date.now() / 2000) * 0.01;
            flowGain.gain.setValueAtTime(flow * volume, audioContext.currentTime);
            
            const movement = 0.005 + Math.sin(Date.now() / 1500) * 0.005;
            movementGain.gain.setValueAtTime(movement * volume, audioContext.currentTime);
          }, 500);
          
          oscillators.push(baseOsc, flowOsc, movementOsc);
          return oscillators;
        };
        
        oscillatorsRef.current = createProcessSound();
      } else {
        // Main page: Rich, musical ambient soundscape
        const createAmbientSound = () => {
          const oscillators = [];
          
          // Bass foundation (F3 - earthy root)
          const bassOsc = audioContext.createOscillator();
          bassOsc.frequency.setValueAtTime(174.1, audioContext.currentTime); // F3
          bassOsc.type = 'sine';
          
          // Main melody (A3 - natural, calming)
          const melodyOsc = audioContext.createOscillator();
          melodyOsc.frequency.setValueAtTime(220, audioContext.currentTime); // A3
          melodyOsc.type = 'triangle';
          
          // Harmony (C4 - bright, growth)
          const harmonyOsc = audioContext.createOscillator();
          harmonyOsc.frequency.setValueAtTime(261.6, audioContext.currentTime); // C4
          harmonyOsc.type = 'sine';
          
          // High sparkle (F4 - inspiration)
          const sparkleOsc = audioContext.createOscillator();
          sparkleOsc.frequency.setValueAtTime(349.2, audioContext.currentTime); // F4
          sparkleOsc.type = 'sine';
          
          // Arpeggio layer (gentle movement)
          const arpeggioOsc = audioContext.createOscillator();
          arpeggioOsc.frequency.setValueAtTime(440, audioContext.currentTime); // A4
          arpeggioOsc.type = 'triangle';
          
          // Gain nodes for each layer
          const bassGain = audioContext.createGain();
          const melodyGain = audioContext.createGain();
          const harmonyGain = audioContext.createGain();
          const sparkleGain = audioContext.createGain();
          const arpeggioGain = audioContext.createGain();
          
          // Set initial volumes (very soft and gentle)
          bassGain.gain.setValueAtTime(0.03 * volume, audioContext.currentTime);
          melodyGain.gain.setValueAtTime(0.02 * volume, audioContext.currentTime);
          harmonyGain.gain.setValueAtTime(0.015 * volume, audioContext.currentTime);
          sparkleGain.gain.setValueAtTime(0.01 * volume, audioContext.currentTime);
          arpeggioGain.gain.setValueAtTime(0.008 * volume, audioContext.currentTime);
          
          // Connect all oscillators
          bassOsc.connect(bassGain);
          melodyOsc.connect(melodyGain);
          harmonyOsc.connect(harmonyGain);
          sparkleOsc.connect(sparkleGain);
          arpeggioOsc.connect(arpeggioGain);
          
          bassGain.connect(audioContext.destination);
          melodyGain.connect(audioContext.destination);
          harmonyGain.connect(audioContext.destination);
          sparkleGain.connect(audioContext.destination);
          arpeggioGain.connect(audioContext.destination);
          
          // Start all oscillators
          bassOsc.start();
          melodyOsc.start();
          harmonyOsc.start();
          sparkleOsc.start();
          arpeggioOsc.start();
          
          // Musical progression - slow chord changes
          let chordTime = 0;
          setInterval(() => {
            chordTime = (chordTime + 1) % 4;
            const time = audioContext.currentTime;
            
            // Chord progression: F - Am - C - G (feel-good progression)
            const chords = [
              { bass: 174.1, melody: 220, harmony: 261.6 }, // F major
              { bass: 220, melody: 277.2, harmony: 329.6 },   // A minor
              { bass: 261.6, melody: 329.6, harmony: 392 },    // C major  
              { bass: 196, melody: 246.9, harmony: 293.6 }     // G major
            ];
            
            const chord = chords[chordTime];
            bassOsc.frequency.linearRampToValueAtTime(chord.bass, time + 0.5);
            melodyOsc.frequency.linearRampToValueAtTime(chord.melody, time + 0.5);
            harmonyOsc.frequency.linearRampToValueAtTime(chord.harmony, time + 0.5);
          }, 4000); // Change chord every 4 seconds
          
          // Arpeggio movement
          const arpeggioNotes = [440, 523.3, 659.3, 523.3]; // A4 - C5 - E5 - C5
          let arpeggioStep = 0;
          setInterval(() => {
            arpeggioStep = (arpeggioStep + 1) % 4;
            arpeggioOsc.frequency.linearRampToValueAtTime(
              arpeggioNotes[arpeggioStep], 
              audioContext.currentTime + 0.1
            );
          }, 1000); // Change note every second
          
          // Organic breathing effect
          setInterval(() => {
            const breath = Math.sin(Date.now() / 6000) * 0.02 + 0.04;
            bassGain.gain.linearRampToValueAtTime(breath * volume, audioContext.currentTime + 0.1);
          }, 200);
          
          // Sparkle pulses
          setInterval(() => {
            const sparkle = Math.random() > 0.7 ? 0.03 : 0.01;
            sparkleGain.gain.linearRampToValueAtTime(sparkle * volume, audioContext.currentTime + 0.05);
          }, 800);
          
          oscillators.push(bassOsc, melodyOsc, harmonyOsc, sparkleOsc, arpeggioOsc);
          return oscillators;
        };
        
        oscillatorsRef.current = createAmbientSound();
      }
      
      return () => {
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {}
        });
        oscillatorsRef.current = [];
      };
    } else {
      // Stop all oscillators when not playing
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {}
      });
      oscillatorsRef.current = [];
    }
  }, [isPlaying, volume, location.pathname]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const isProcessPage = location.pathname === '/process';

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-background/80 backdrop-blur-md rounded-full p-3 shadow-lg border border-border/60">
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
          aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
          title={isProcessPage ? "Process rhythm (Space to toggle)" : "Ambient sound (Space to toggle)"}
        >
          {isPlaying ? (
            <VolumeX className="h-4 w-4 text-primary" />
          ) : (
            <Volume2 className="h-4 w-4 text-primary" />
          )}
        </button>
        
        {isPlaying && (
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-border rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--border)) ${volume * 100}%, hsl(var(--border)) 100%)`
              }}
            />
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          {isProcessPage ? '🔄' : '🌱'}
        </div>
      </div>
    </div>
  );
}
