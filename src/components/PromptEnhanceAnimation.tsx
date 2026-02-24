"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptEnhanceAnimationProps {
  simplePrompt?: string;
  enhancedPrompt?: string;
  typingSpeed?: number;
}

// VoxAI Brand Colors
const COLORS = {
  // Background
  bgDark: "#1a1d21",        // Main dark background
  bgCard: "#262626",        // Card background
  bgInput: "#353a3d",       // Input/card surface
  
  // Borders
  border: "#3f3f3f",        // Border gray
  borderHover: "#40c5cd",   // Cyan accent border
  
  // Text
  textPrimary: "#ffffff",   // White text
  textSecondary: "#dedede", // Light gray text
  textMuted: "#898989",     // Muted text
  
  // Accent
  cyan: "#40c5cd",          // Primary cyan accent
  cyanGlow: "rgba(64, 197, 205, 0.3)", // Cyan glow
  gold: "#FFD700",          // Yellow/Gold for credits
  
  // Gradients
  gradientStart: "#1a1d21",
  gradientEnd: "#262626",
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
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.gradientEnd} 100%)`,
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
            background: `rgba(64, 197, 205, 0.1)`,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: COLORS.cyan,
              borderRadius: "50%",
              boxShadow: `0 0 10px ${COLORS.cyan}`,
            }}
          />
          <span
            style={{
              color: COLORS.cyan,
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
                  borderTop: `2px solid ${COLORS.cyan}`,
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
            {/* Cyan glow spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "60px",
                height: "60px",
                border: `3px solid ${COLORS.border}`,
                borderTop: `3px solid ${COLORS.cyan}`,
                borderRadius: "50%",
                boxShadow: `0 0 20px ${COLORS.cyanGlow}`,
              }}
            />
            <p
              style={{
                color: COLORS.cyan,
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
                color: COLORS.cyan,
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
              {/* Subtle cyan glow on top edge */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
                  opacity: 0.5,
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
                    color: COLORS.cyan,
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
                  background: `rgba(64, 197, 205, 0.15)`,
                  color: COLORS.cyan,
                  padding: "10px 20px",
                  borderRadius: "24px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  border: `1px solid rgba(64, 197, 205, 0.3)`,
                  boxShadow: `0 0 20px ${COLORS.cyanGlow}`,
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
