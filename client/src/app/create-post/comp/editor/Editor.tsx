"use client";
declare global {
  interface Window {
    copyToClipboard: (id: string) => void;
  }
}
import DOMPurify from "dompurify";

import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import { useEffect, useMemo, useState } from "react";
import SimpleMDEditor from "react-simplemde-editor";
import useCustomStorage from "@/hooks/useCustomStorageNext"; // Adjust the import path as needed
import highlightSyntax from "./highlightSyntax"; // Adjust the import path as needed

const Editor = ({
  setValue,
  value,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}) => {
  const [copyValue, setCopyValue] = useState("copy");
  const VarCopy = copyValue;
  const newOptions = useMemo(() => {
    return {
      spellChecker: true,
      showIcons: ["strikethrough", "table", "code"],
      hideIcons: ["bold"],
    };
  }, []);

  const onChange = (value: string) => {
    setValue(value);
  };

  // Add the copyToClipboard function to the window object so it can be called from HTML
  useEffect(() => {
    window.copyToClipboard = (id: string) => {
      setCopyValue("copied!");
      const codeElement = document.getElementById(id);
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText).then(() => {});
      }
    };
  }, [VarCopy]);

  return (
    <main className="overflow-auto">
      <SimpleMDEditor
        id="editor"
        value={value}
        onChange={onChange}
        options={newOptions as any}
        className=" "
      />
    </main>
  );
};

export default Editor;
