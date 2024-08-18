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

const Editor = () => {
  const [value, setValue] = useCustomStorage("editorContent", "");
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

  const renderedHtml = useMemo(() => {
    const rawHtml = DOMPurify.sanitize(marked(value) as string);
    const highlightedHtml = highlightSyntax(rawHtml, "js"); // Replace 'js' with the appropriate language

    // Add copy buttons to each <pre> block
    const copyButtonHtml = (id: string) =>
      `
    <div class="relative ">
    <button class="absolute right-5 top-4 px-3 py-1 rounded-md bg-white cursor-pointer hover:bg-gray-500 hover:text-white duration-200 transition-all " onclick="copyToClipboard('${id}')">
      ${VarCopy}
    </button>
    </div>
    `;

    const withCopyButtons = highlightedHtml.replace(
      /(<pre[^>]*>)(.*?)(<\/pre>)/gs,
      (_, openingTag, codeContent, closingTag) => {
        const uniqueId = `codeBlock-${Math.random().toString(36).substr(2, 9)}`;
        return `<div class="code-container">${copyButtonHtml(
          uniqueId
        )}${openingTag}<code id="${uniqueId}">${codeContent}</code>${closingTag}</div>`;
      }
    );

    return withCopyButtons;
  }, [value]);

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
      <div
        className="mx-10"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      ></div>
    </main>
  );
};

export default Editor;
