import { useState, useEffect } from "react";

/* Clipboard.writeText() is part of the Clipboard API in the browser. 
It allows a website to write text to your operating system's clipboard. */

/* text = color.hex */
export default function CopyToClipboard({ text }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Utilize useEffect to set a 3 second timeout */
  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      <button onClick={copyText} className="copy-button"></button>
      {copied && <p>Copied successfully!</p>}{" "}
      {/* means: if copied is true show the message */}
    </>
  );
}

/* Click on Button:

1. copyText() is called.
2. await navigator.clipboard.writeText(text) copies the hex code
3. if successfull setCopied(true) is called (setCopied(true) updates the state to true).
4. shows the message "Copied successfully!"
5. After 3 secons useEffect puts setCopied back to false and the message disappears */
