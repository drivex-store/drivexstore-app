"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrambleTextPlugin } from '@libs/vendor';
import { useScrambleGroup } from '@animations/hooks/useScrambleGroup';
import { defaultChars } from '@libs/constants/constants';

import React, { useRef, useEffect, useCallback, useMemo } from 'react'; // module id: 271645
import gsap from 'gsap'; // module id: 989970
import { useScrambleGroup } from '@features/animations/hooks/useScrambleGroup';

// Fallback constant for undefined 'v' in the provided minified source
const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:',.<>/?";

export function ScrambleText(props) {
  const {
    children,
    className,
    duration = 0.6,
    chars = DEFAULT_CHARS,
    dualLayer = true,
    triggerOnHover = false,
    revealMode = false,
    theme = "dark",
    firstColorClass,
    secondColorClass,
    onComplete,
    onReady,
    multiLine = false
  } = props;

  const containerRef = useRef(null);
  const textRef = useRef(null);
  const timelineRef = useRef(null);
  const originalTextRef = useRef("");
  const hasCompletedRef = useRef(false);

  // Replicating React Compiler memoized random ID generation
  const componentId = useRef(`scramble-${Math.random().toString(36).slice(2, 9)}`);

  const themeConfig = useMemo(() => {
    return theme === "brand" 
      ? { firstColorClass: "scramble-white", secondColorClass: "scramble-foreground" }
      : { firstColorClass: "scramble-brand", secondColorClass: "scramble-foreground" };
  }, [theme]);

  const colorClass1 = firstColorClass ?? themeConfig.firstColorClass;
  const colorClass2 = secondColorClass ?? themeConfig.secondColorClass;
  const scrambleGroupContext = useScrambleGroup();

  let extractedText = "";
  if (typeof children === "string") {
    extractedText = children;
  } else if (typeof children === "number") {
    extractedText = String(children);
  }

  useEffect(() => {
    originalTextRef.current = extractedText;
  }, [extractedText]);

  const killTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  const playAnimation = useCallback(() => {
    if (!textRef.current) return null;
    
    const targetElement = textRef.current;
    const targetText = originalTextRef.current || extractedText;
    
    if (!targetText || targetText.length === 0) return null;

    // Accessibility check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targetElement.textContent = targetText;
      targetElement.className = targetElement.className.replace(/\bscramble-\w+\b/g, "");
      hasCompletedRef.current = true;
      onComplete?.();
      return null;
    }

    killTimeline();

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        timelineRef.current = null;
        hasCompletedRef.current = true;
        onComplete?.();
      }
    });

    if (dualLayer) {
      // Generate randomized initial string matching spacing/newlines
      const initialScrambled = (function(textStr, charset = DEFAULT_CHARS) {
        let result = "";
        for (let i = 0; i < textStr.length; i++) {
          const char = textStr[i];
          if (char === " " || char === "\n" || char === "\r") {
            result += char;
          } else {
            result += charset[Math.floor(Math.random() * charset.length)];
          }
        }
        return result;
      })(targetText, chars);

      const nonSpaceLength = targetText.replace(/\s/g, "").length;
      const progressDelay = nonSpaceLength > 0 ? duration / nonSpaceLength : 0;

      if (revealMode && !hasCompletedRef.current) {
        targetElement.textContent = targetText.replace(/[^\s\n\r]/g, "\u00A0"); // replaces chars with non-breaking spaces
        
        timelineRef.current.to(targetElement, {
          duration: duration,
          scrambleText: {
            text: initialScrambled,
            chars: chars,
            speed: 1,
            revealDelay: 0.1,
            oldClass: colorClass1,
            newClass: colorClass1
          },
          ease: "none"
        });
      } else {
        timelineRef.current.to(targetElement, {
          duration: duration,
          scrambleText: {
            text: initialScrambled,
            chars: chars,
            speed: 1,
            revealDelay: 0.1,
            oldClass: colorClass2,
            newClass: colorClass1
          },
          ease: "none"
        });
      }

      timelineRef.current.to(targetElement, {
        duration: duration,
        scrambleText: {
          text: targetText,
          chars: chars,
          speed: 1,
          revealDelay: 0.1,
          oldClass: colorClass1,
          newClass: colorClass2
        },
        ease: "none"
      }, progressDelay);
    } else {
      timelineRef.current.to(targetElement, {
        duration: duration,
        scrambleText: {
          text: targetText,
          chars: chars,
          speed: 1,
          revealDelay: 0.2
        },
        ease: "none"
      });
    }

    return timelineRef.current;
  }, [chars, dualLayer, duration, colorClass1, onComplete, revealMode, colorClass2, extractedText, killTimeline]);

  // Register with group context if available
  useEffect(() => {
    if (scrambleGroupContext) {
      scrambleGroupContext.register(componentId.current, playAnimation);
      return () => {
        scrambleGroupContext.unregister(componentId.current);
      };
    }
  }, [scrambleGroupContext, playAnimation]);

  // Emit onReady
  useEffect(() => {
    onReady?.(playAnimation);
  }, [onReady, playAnimation]);

  // Cleanup timeline on unmount
  useEffect(() => {
    return () => {
      killTimeline();
    };
  }, [killTimeline]);

  const handleMouseEnter = triggerOnHover ? playAnimation : undefined;

  // Render variables
  const initialDisplayText = revealMode 
    ? extractedText.replace(/[^\s\n\r]/g, "\u00A0") 
    : extractedText;
  
  const whiteSpace = multiLine ? "normal" : "nowrap";
  const displayMode = multiLine ? "inline" : "inline-block";
  const lineStyleOverride = multiLine ? { width: "100%" } : {};

  return (
    <span 
      ref={containerRef} 
      className={className} 
      style={{ position: "relative", display: displayMode, whiteSpace: whiteSpace }}
      onMouseEnter={handleMouseEnter}
    >
      <span className="sr-only">
        {extractedText}
      </span>
      
      <span aria-hidden="true" style={{ visibility: "hidden", whiteSpace: whiteSpace }}>
        {extractedText}
      </span>
      
      <span 
        ref={textRef} 
        aria-hidden="true" 
        style={{ position: "absolute", top: 0, left: 0, whiteSpace: whiteSpace, ...lineStyleOverride }}
      >
        {initialDisplayText}
      </span>
    </span>
  );
}
