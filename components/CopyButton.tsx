import { Button } from "@mui/joy";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };
  return (
    <Button onClick={handleCopy} color={isCopied ? "success" : "neutral"}>
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
}
