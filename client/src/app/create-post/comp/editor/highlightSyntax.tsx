type Language = "js";

interface CustomPattern {
  pattern: string[];
  className: string;
}

interface LanguagePatterns {
  strings: RegExp;
  custom: CustomPattern[];
}

const languagePatterns: Record<Language, LanguagePatterns> = {
  js: {
    strings: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
    custom: [
      {
        pattern: [
          "print",
          "console",
          "alert",
          "import",
          "export",
          "interface",
          "type",
          "debugger",
          "console",
          "apt",
          "snap",
        ],
        className: "key-method",
      },
      {
        pattern: [
          "try",
          "catch",
          "alert",
          "require",
          "function",
          "return",
          "const",
          "let",
          "document",
          "var",
          "querySelector",
          "querySelectorAll",
          "addEventListener",
          "removeEventListener",
          "setTimeout",
          "setInterval",
          "clearTimeout",
          "clearInterval",
          "sudo",
          "fetch",
          "new",
          "this",
          "instanceof",
          "extends",
          "throw",
          "switch",
          "case",
          "null",
          "enum",
          "if",
          "else",
          "break",
          "continue",
          "for",
          "while",
          "void",
        ],
        className: "keyword",
      },
    ],
  },
};

const highlightSyntax = (html: string, language: Language): string => {
  // Regex to match <pre> tags and their content
  const preTagRegex = /(<pre[^>]*>)(.*?)(<\/pre>)/gs;

  return html.replace(preTagRegex, (_, openingTag, codeContent, closingTag) => {
    // Apply syntax highlighting only to code inside <pre> tags
    const patterns = languagePatterns[language];
    let highlightedCode = codeContent;

    // Highlight strings
    highlightedCode = highlightedCode.replace(
      patterns.strings,
      `<span class="string-${language}">$&</span>`
    );

    // Highlight custom patterns
    patterns.custom.forEach(({ pattern, className }) => {
      pattern.forEach((p) => {
        const regex = new RegExp(p, "g");
        highlightedCode = highlightedCode.replace(
          regex,
          `<span class="${className}">$&</span>`
        );
      });
    });

    // Highlight keywords

    return `${openingTag}${highlightedCode}${closingTag}`;
  });
};

export default highlightSyntax;
