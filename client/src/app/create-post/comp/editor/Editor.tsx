"use client";
declare global {
  interface Window {
    copyToClipboard: (id: string) => void;
  }
}

import "easymde/dist/easymde.min.css";
import { useEffect, useMemo } from "react";
import SimpleMDEditor from "react-simplemde-editor";

const Editor = ({
  setValue,
  value,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}) => {
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
      const codeElement = document.getElementById(id);
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText).then(() => {});
      }
    };
  }, []);

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
