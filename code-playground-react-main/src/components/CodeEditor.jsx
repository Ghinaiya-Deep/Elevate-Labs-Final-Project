import React, { useState, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Card } from '@/components/ui/card';

const CodeEditor = ({ onCodeChange, initialCode = {} }) => {
  const [code, setCode] = useState({
    html: initialCode.html || '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>Start coding...</p>\n</body>\n</html>',
    css: initialCode.css || '/* Add your styles here */\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 2rem;\n}',
    js: initialCode.js || '// Add your JavaScript here\nconsole.log("Hello, World!");\n\n// Example: Add interactivity\ndocument.addEventListener("DOMContentLoaded", function() {\n  const h1 = document.querySelector("h1");\n  if (h1) {\n    h1.addEventListener("click", function() {\n      h1.style.color = h1.style.color === "yellow" ? "white" : "yellow";\n    });\n  }\n});'
  });

  const handleEditorChange = useCallback((language, value) => {
    const newCode = { ...code, [language]: value || '' };
    setCode(newCode);
    onCodeChange(newCode);
  }, [code, onCodeChange]);

  const editorOptions = {
    theme: 'vs-dark',
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    lineNumbers: 'on',
    renderWhitespace: 'selection',
    cursorBlinking: 'smooth',
    smoothScrolling: true,
    contextmenu: true,
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    quickSuggestions: true,
    suggestOnTriggerCharacters: true,
  };

  // Emit initial code on mount
  useEffect(() => {
    onCodeChange(code);
  }, []); // Only run once on mount

  return (
    <Card className="h-full bg-editor-panel border-border shadow-editor">
      <div className="bg-editor-toolbar border-b border-border px-4 py-2">
        <div className="flex items-center justify-center text-sm font-medium text-foreground">
          <span className="w-3 h-3 bg-accent rounded-full animate-pulse mr-2"></span>
          Code Editor
        </div>
      </div>
      
      <div className="flex h-full">
        {/* HTML Editor */}
        <div className="flex-1 border-r border-border">
          <div className="bg-code-html/10 border-b border-border px-3 py-2 flex items-center">
            <span className="mr-2">🌐</span>
            <span className="text-sm font-medium">HTML</span>
          </div>
          <Editor
            height="calc(100vh - 200px)"
            language="html"
            value={code.html}
            onChange={(value) => handleEditorChange('html', value)}
            options={editorOptions}
            className="border-0"
          />
        </div>

        {/* CSS Editor */}
        <div className="flex-1 border-r border-border">
          <div className="bg-code-css/10 border-b border-border px-3 py-2 flex items-center">
            <span className="mr-2">🎨</span>
            <span className="text-sm font-medium">CSS</span>
          </div>
          <Editor
            height="calc(100vh - 200px)"
            language="css"
            value={code.css}
            onChange={(value) => handleEditorChange('css', value)}
            options={editorOptions}
            className="border-0"
          />
        </div>

        {/* JS Editor */}
        <div className="flex-1">
          <div className="bg-code-js/10 border-b border-border px-3 py-2 flex items-center">
            <span className="mr-2">⚡</span>
            <span className="text-sm font-medium">JS</span>
          </div>
          <Editor
            height="calc(100vh - 200px)"
            language="javascript"
            value={code.js}
            onChange={(value) => handleEditorChange('js', value)}
            options={editorOptions}
            className="border-0"
          />
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;