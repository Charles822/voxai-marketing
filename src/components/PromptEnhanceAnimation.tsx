"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptEnhanceAnimationProps {
  simplePrompt?: string;
  enhancedPrompt?: string;
  typingSpeed?: number;
}

// VoxAI Brand Colors from Tailwind Config
const COLORS = {
  // voxGreen palette (primary brand color)
  voxGreen: {
    50: '#f3faf8',
    100: '#d7f0ed',
    200: '#afe0d9',
    300: '#7fc9c2',
    400: '#55aca7',
    500: '#3b918d',  // PRIMARY BRAND COLOR
    600: '#2d7472',
    700: '#285d5d',
    800: '#234c4c',
    850: '#1d4545',
    875: '#1e4444',
    900: '#214040',
    925: '#132A2A',
    950: '#0e2324',
  },
  // voxOrange (secondary)
  voxOrange: {
    500: '#ed5d1f',
    400: '#f18046',
  },
  // Footer colors
  footer: {
    1: '#070f13',
    2: '#0c191d',
    text: '#b6e8f3',
  },
  // Derived
  bgDark: '#0e2324',      // voxGreen-950
  bgCard: '#132A2A',      // voxGreen-925
  bgInput: '#1d4545',     // voxGreen-850
  border: '#234c4c',      // voxGreen-800
  borderHover: '#3b918d', // voxGreen-500
  textPrimary: '#f3faf8', // voxGreen-50
  textSecondary: '#d7f0ed', // voxGreen-100
  textMuted: '#7fc9c2',   // voxGreen-300
  accent: '#3b918d',      // voxGreen-500
  accentGlow: 'rgba(59, 145, 141, 0.4)',
  orange: '#ed5d1f',      // voxOrange-500
};

export default function PromptEnhanceAnimation({
  simplePrompt = "a plumber",
  enhancedPrompt = "Middle-aged male plumber wearing faded denim overalls, a sweat-stained red cotton shirt, and a heavy leather tool belt. He has calloused hands, smudged grease on his jaw, short grizzled hair under a canvas cap, and rugged tan leather work boots.",
  typingSpeed = 30,
}: PromptEnhanceAnimationProps) {
  const [phase, setPhase] = useState<"showing-simple" | "enhancing" | "typing">("showing-simple");
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase("enhancing");
    }, 2000);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (phase === "enhancing") {
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
        }
      }, typingSpeed);

      return () => clearInterval(typeInterval);
    }
  }, [phase, enhancedPrompt, typingSpeed]);

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
        maxWidth: "540px",
        aspectRatio: "9/16",
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.bgCard} 50%, ${COLORS.bgDark} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 24px",
        boxSizing: "border-box",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* VoxAI Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: `rgba(59, 145, 141, 0.15)`,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: COLORS.accent,
              borderRadius: "50%",
              boxShadow: `0 0 10px ${COLORS.accent}`,
            }}
          />
          <span
            style={{
              color: COLORS.accent,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            VoxAI Prompt Enhancer
          </span>
        </div>
      </motion.div>

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
                color: COLORS.textMuted,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "20px",
              }}
            >
              Basic Prompt
            </p>
            
            {/* Input-style container */}
            <div
              style={{
                background: COLORS.bgInput,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "12px",
                padding: "24px 32px",
                minWidth: "280px",
              }}
            >
              <h2
                style={{
                  color: COLORS.textSecondary,
                  fontSize: "28px",
                  fontWeight: 500,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{simplePrompt}&rdquo;
              </h2>
            </div>

            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                marginTop: "40px",
                color: COLORS.textMuted,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: `2px solid ${COLORS.border}`,
                  borderTop: `2px solid ${COLORS.accent}`,
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              Enhancing...
            </motion.div>
          </motion.div>
        )}

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
              gap: "24px",
            }}
          >
            {/* voxGreen glow spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "60px",
                height: "60px",
                border: `3px solid ${COLORS.border}`,
                borderTop: `3px solid ${COLORS.accent}`,
                borderRadius: "50%",
                boxShadow: `0 0 20px ${COLORS.accentGlow}`,
              }}
            />
            <p
              style={{
                color: COLORS.accent,
                fontSize: "18px",
                fontWeight: 600,
                margin: 0,
                letterSpacing: "1px",
              }}
            >
              Enhancing with AI...
            </p>
          </motion.div>
        )}

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
                color: COLORS.accent,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "16px",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Enhanced Prompt
            </p>
            
            {/* VoxAI-style card */}
            <div
              style={{
                background: COLORS.bgInput,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "16px",
                padding: "28px",
                boxShadow: `0 0 0 1px ${COLORS.border}, 0 20px 40px rgba(0,0,0,0.3)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* voxGreen glow on top edge */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
                  opacity: 0.6,
                }}
              />
              
              <p
                style={{
                  color: COLORS.textSecondary,
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  margin: 0,
                  minHeight: "200px",
                }}
              >
                {displayedText}
                <motion.span
                  animate={{ opacity: cursorVisible ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    color: COLORS.accent,
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
                marginTop: "28px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: `rgba(59, 145, 141, 0.2)`,
                  color: COLORS.accent,
                  padding: "10px 20px",
                  borderRadius: "24px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  border: `1px solid rgba(59, 145, 141, 0.4)`,
                  boxShadow: `0 0 20px ${COLORS.accentGlow}`,
                }}
              >
                <span style={{ fontSize: "14px" }}>✨</span>
                Prompt Enhanced
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom brand mark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "typing" && displayedText.length === enhancedPrompt.length ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          position: "absolute",
          bottom: "50px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: COLORS.textMuted,
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          Powered by VoxAI
        </p>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
