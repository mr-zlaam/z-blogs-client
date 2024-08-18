"use client";
declare global {
  interface Window {
    copyToClipboard: (id: string) => void;
  }
}

import { useMessage } from "@/hooks/useMessage";
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
  const { successMessage } = useMessage();
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
        navigator.clipboard.writeText(codeElement.innerText).then(() => {
          successMessage("copied successfully", "top-center", 1000);
        });
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
