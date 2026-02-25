"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// VoxAI Brand Colors
const COLORS = {
  voxGreen: {
    50: '#f3faf8',
    100: '#d7f0ed',
    300: '#7fc9c2',
    500: '#3b918d',
    600: '#2d7472',
    700: '#285d5d',
    800: '#234c4c',
    850: '#1d4545',
    925: '#132A2A',
    950: '#0e2324',
  }
};

export default function ImageTo3DAnimation() {
  const [phase, setPhase] = useState<"grid" | "selected" | "button" | "dialog" | "loading">("grid");

  useEffect(() => {
    // Accelerated timing (3 seconds total)
    // Phase 1: Show grid (0-0.4s)
    const timer1 = setTimeout(() => setPhase("selected"), 400);
    // Phase 2: Selection (0.4-0.8s)
    const timer2 = setTimeout(() => setPhase("button"), 800);
    // Phase 3: Button click (0.8-1.2s)
    const timer3 = setTimeout(() => setPhase("dialog"), 1200);
    // Phase 4: Dialog + Model select (1.2-1.6s)
    const timer4 = setTimeout(() => setPhase("loading"), 1600);
    // Phase 5: Loading until 3s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Placeholder images (4 generic options)
  const placeholders = [
    { id: 1, color: "#3b5a7c" },
    { id: 2, color: "#5a3b7c" },
    { id: 3, color: "#7c5a3b" },
    { id: 4, color: COLORS.voxGreen[500] }, // Selected one
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "540px",
        aspectRatio: "9/16",
        background: `linear-gradient(180deg, ${COLORS.voxGreen[950]} 0%, ${COLORS.voxGreen[925]} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 24px",
        boxSizing: "border-box",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: "50px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: `rgba(59, 145, 141, 0.15)`,
          border: `1px solid ${COLORS.voxGreen[800]}`,
          borderRadius: "20px",
          padding: "8px 16px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            background: COLORS.voxGreen[500],
            borderRadius: "50%",
            boxShadow: `0 0 10px ${COLORS.voxGreen[500]}`,
          }}
        />
        <span
          style={{
            color: COLORS.voxGreen[500],
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          VoxAI Image to 3D
        </span>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: Grid of 4 images */}
        {phase === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            {placeholders.map((img, i) => (
              <div
                key={img.id}
                style={{
                  aspectRatio: "1",
                  background: `linear-gradient(135deg, ${img.color}40, ${img.color}20)`,
                  borderRadius: "12px",
                  border: `2px solid ${i === 3 ? COLORS.voxGreen[500] : COLORS.voxGreen[800]}`,
                  boxShadow: i === 3 ? `0 0 20px ${COLORS.voxGreen[500]}40` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: COLORS.voxGreen[300], fontSize: "12px" }}>
                  Image {i + 1}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* PHASE 2: Selected image */}
        {phase === "selected" && (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "200px",
              aspectRatio: "1",
              background: `linear-gradient(135deg, ${COLORS.voxGreen[500]}40, ${COLORS.voxGreen[500]}20)`,
              borderRadius: "16px",
              border: `3px solid ${COLORS.voxGreen[500]}`,
              boxShadow: `0 0 30px ${COLORS.voxGreen[500]}60`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: COLORS.voxGreen[100], fontSize: "14px" }}>Selected</span>
          </motion.div>
        )}

        {/* PHASE 3: Generate 3D Button */}
        {phase === "button" && (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ textAlign: "center" }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.4, repeat: 1 }}
              style={{
                background: `linear-gradient(135deg, ${COLORS.voxGreen[500]}, ${COLORS.voxGreen[600]})`,
                color: COLORS.voxGreen[50],
                padding: "14px 32px",
                borderRadius: "24px",
                fontSize: "16px",
                fontWeight: 600,
                boxShadow: `0 0 20px ${COLORS.voxGreen[500]}40`,
                border: `1px solid ${COLORS.voxGreen[400]}`,
              }}
            >
              Generate 3D
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 4: Model Selection Dialog */}
        {phase === "dialog" && (
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: COLORS.voxGreen[850],
              border: `1px solid ${COLORS.voxGreen[800]}`,
              borderRadius: "16px",
              padding: "24px",
              width: "100%",
              maxWidth: "300px",
              boxShadow: `0 20px 40px rgba(0,0,0,0.4)`,
            }}
          >
            <p
              style={{
                color: COLORS.voxGreen[100],
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              Select AI Model
            </p>
            
            {/* Selected: VoxAI 3 */}
            <div
              style={{
                background: `rgba(59, 145, 141, 0.2)`,
                border: `2px solid ${COLORS.voxGreen[500]}`,
                borderRadius: "12px",
                padding: "12px 16px",
                marginBottom: "8px",
              }}
            >
              <p style={{ color: COLORS.voxGreen[50], fontSize: "13px", fontWeight: 600, margin: 0 }}>
                VoxAI 3 (Beta)
              </p>
              <p style={{ color: COLORS.voxGreen[300], fontSize: "11px", margin: "4px 0 0 0" }}>
                4k Texture, Highest Detail
              </p>
            </div>

            {/* Other options (muted) */}
            <div
              style={{
                background: COLORS.voxGreen[900],
                border: `1px solid ${COLORS.voxGreen[800]}`,
                borderRadius: "12px",
                padding: "10px 16px",
                opacity: 0.5,
              }}
            >
              <p style={{ color: COLORS.voxGreen[100], fontSize: "12px", margin: 0 }}>
                VoxAI 1
              </p>
            </div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                marginTop: "16px",
                background: COLORS.voxGreen[500],
                color: COLORS.voxGreen[50],
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Generate
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 5: Loading */}
        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              style={{
                width: "50px",
                height: "50px",
                border: `4px solid ${COLORS.voxGreen[800]}`,
                borderTop: `4px solid ${COLORS.voxGreen[500]}`,
                borderRadius: "50%",
                boxShadow: `0 0 20px ${COLORS.voxGreen[500]}40`,
              }}
            />
            <p style={{ color: COLORS.voxGreen[500], fontSize: "14px", fontWeight: 600 }}>
              Generating 3D...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status text at bottom */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "60px",
          textAlign: "center",
        }}
      >
        <p style={{ color: COLORS.voxGreen[300], fontSize: "11px", letterSpacing: "2px" }}>
          {phase === "grid" && "Select an image"}
          {phase === "selected" && "Image selected"}
          {phase === "button" && "Click Generate 3D"}
          {phase === "dialog" && "Choose AI Model"}
          {phase === "loading" && "Processing..."}
        </p>
      </motion.div>
    </div>
  );
}
