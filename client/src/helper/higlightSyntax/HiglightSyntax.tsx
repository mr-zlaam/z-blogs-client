type Language = "js";

interface CustomPattern {
  pattern: string[];
  className: string;
}

interface LanguagePatterns {
  strings: RegExp;
  custom: CustomPattern[];
}

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\<>]/g, "\\$&"); // Escape special characters
};

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
          "type ",
          "debugger",
          "apt ",
          "snap ",
          "class ",
          "from ",
          "def ",
          "pip ",
          "pip3 ",
          "async ",
          "await ",
          "bunx ",
          "npm ",
          "yarn ",
          "npx ",
          "pnpm ",
          "cd ",
          "bun ",
          "useState",
          "useEffect",
          "useRef",
          "useMemo",
          "useCallback",
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
          "sudo ",
          "fetch",
          "new ",
          "this",
          "instanceof",
          "extends",
          "throw",
          "switch",
          "case",
          "null",
          "enum",
          "if ",
          "else ",
          "break ",
          "continue",
          "for ",
          "while",
          "void",
        ],
        className: "keyword",
      },
      {
        pattern: ["__str__"],
        className: "key-python-yellow",
      },
      {
        pattern: ["{", "}", "[", "]", "(", ")"],
        className: "key-brackets",
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

    // Step 1: Highlight strings
    highlightedCode = highlightedCode.replace(
      patterns.strings,
      `<span class="string-${language}">$&</span>`
    );

    // Step 2: Highlight custom patterns
    patterns.custom.forEach(({ pattern, className }) => {
      // For numbers, ensure they are not inside strings
      if (className === "key-numbers") {
        const numberPattern = new RegExp(
          `(?<!<span[^>]*>)\\b(${pattern
            .map((p) => escapeRegExp(p))
            .join("|")})\\b(?![^<]*>)`,
          "g"
        );
        highlightedCode = highlightedCode.replace(
          numberPattern,
          `<span class="${className}">$&</span>`
        );
      } else {
        const combinedPattern = pattern.map((p) => escapeRegExp(p)).join("|"); // Escape special regex characters and combine patterns
        const regex = new RegExp(
          `(?<!<span[^>]*>)(${combinedPattern})(?![^<]*>)`,
          "g"
        );
        highlightedCode = highlightedCode.replace(
          regex,
          `<span class="${className}">$&</span>`
        );
      }
    });

    return `${openingTag}${highlightedCode}${closingTag}`;
  });
};

export default highlightSyntax;
