import { useCallback, useRef, useState } from "react";

// Shared by every "copy email" button on the site so the 2s "Copied!" window
// and the clipboard call itself only exist in one place.
export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copy = useCallback(
    (text) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
    },
    [resetDelay],
  );

  return [copied, copy];
}
