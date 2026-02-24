import PromptEnhanceAnimation from "@/components/PromptEnhanceAnimation";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <PromptEnhanceAnimation
        simplePrompt="a plumber"
        enhancedPrompt="Middle-aged male plumber wearing faded denim overalls, a sweat-stained red cotton shirt, and a heavy leather tool belt. He has calloused hands, smudged grease on his jaw, short grizzled hair under a canvas cap, and rugged tan leather work boots."
        typingSpeed={25}
      />
    </main>
  );
}
