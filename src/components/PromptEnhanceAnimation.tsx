"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptEnhanceAnimationProps {
  simplePrompt?: string;
  enhancedPrompt?: string;
  typingSpeed?: number;
}

export default function PromptEnhanceAnimation({
  simplePrompt = "a plumber",
  enhancedPrompt = "Middle-aged male plumber wearing faded denim overalls, a sweat-stained red cotton shirt, and a heavy leather tool belt. He has calloused hands, smudged grease on his jaw, short grizzled hair under a canvas cap, and rugged tan leather work boots.",
  typingSpeed = 30,
}: PromptEnhanceAnimationProps) {
  const [phase, setPhase] = useState<"showing-simple" | "enhancing" | "typing">("showing-simple");
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Phase 1: Show simple prompt for 2 seconds
    const timer1 = setTimeout(() => {
      setPhase("enhancing");
    }, 2000);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (phase === "enhancing") {
      // Phase 2: Show "Enhancing..." briefly then start typing
      const timer = setTimeout(() => {
        setPhase("typing");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "typing") {
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < enhancedPrompt.length) {
          setDisplayedText(enhancedPrompt.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          // Keep cursor blinking after done
        }
      }, typingSpeed);

      return () => clearInterval(typeInterval);
    }
  }, [phase, enhancedPrompt, typingSpeed]);

  // Cursor blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "540px", // Mobile width for 9:16 ratio
        aspectRatio: "9/16",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 24px",
        boxSizing: "border-box",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Simple Prompt Phase */}
      <AnimatePresence mode="wait">
        {phase === "showing-simple" && (
          <motion.div
            key="simple"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "16px",
              }}
            >
              Basic Prompt
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              &ldquo;{simplePrompt}&rdquo;
            </h2>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                marginTop: "32px",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "12px",
              }}
            >
              Enhancing...
            </motion.div>
          </motion.div>
        )}

        {/* Enhancing Transition */}
        {phase === "enhancing" && (
          <motion.div
            key="enhancing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid rgba(255, 255, 255, 0.2)",
                borderTop: "3px solid #ffffff",
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Enhancing prompt...
            </p>
          </motion.div>
        )}

        {/* Typing Phase */}
        {phase === "typing" && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%" }}
          >
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              Enhanced Prompt
            </p>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  margin: 0,
                  minHeight: "200px",
                }}
              >
                {displayedText}
                <motion.span
                  animate={{ opacity: cursorVisible ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    color: "#60a5fa", // Blue cursor
                    fontWeight: 300,
                  }}
                >
                  |
                </motion.span>
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: displayedText.length === enhancedPrompt.length ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(96, 165, 250, 0.2)",
                  color: "#60a5fa",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                ✨ Prompt Enhanced
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
