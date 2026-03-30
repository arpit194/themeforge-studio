import { useEffect, useRef, useState } from "react";
import { codeToHtml } from "shiki";
import { usePageTheme } from "../../context/usePageTheme";
import styles from "./CodeBlock.module.css";

type Props = {
  code: string;
  language?: string;
  filename?: string;
};

function IconCopy() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CodeBlock({ code, language = "tsx", filename }: Props) {
  const { isDark } = usePageTheme();
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    codeToHtml(code.trim(), {
      lang: language,
      theme: isDark ? "github-dark" : "github-light",
    }).then(setHtml);
  }, [code, language, isDark]);

  function handleCopy() {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.root} data-dark={isDark ? "true" : "false"}>
      <div className={styles.toolbar}>
        {filename && <span className={styles.filename}>{filename}</span>}
        <button
          className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
      </div>
      <div className={styles.scroll}>
        <div
          className={styles.shikiWrap}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
