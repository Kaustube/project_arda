import { useState, useEffect } from 'react';

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet };
};

export const MobileOptimizedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useMobileOptimization();

  return (
    <div className={`min-h-screen ${isMobile ? 'overflow-x-hidden' : ''}`}>
      {/* Mobile viewport fix */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      
      {/* Touch optimization for mobile */}
      {isMobile && (
        <style>{`
          * {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          input, textarea, select {
            -webkit-user-select: auto;
            -khtml-user-select: auto;
            -moz-user-select: auto;
            -ms-user-select: auto;
            user-select: auto;
          }
          
          button, a, [role="button"] {
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0.1);
          }
          
          /* Prevent zoom on input focus */
          input, textarea, select {
            font-size: 16px !important;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          
          /* Fix for 100vh on mobile */
          .min-h-screen {
            min-height: -webkit-fill-available;
            min-height: 100vh;
          }
        `}</style>
      )}
      
      {children}
    </div>
  );
};
