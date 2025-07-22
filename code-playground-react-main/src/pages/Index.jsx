import React, { useState, useCallback, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor.jsx';
import Preview from '@/components/Preview.jsx';
import Toolbar from '@/components/Toolbar.jsx';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const Index = () => {
  const [code, setCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [layout, setLayout] = useState('horizontal');

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  const handleTemplateSelect = useCallback((templateCode) => {
    setCode(templateCode);
  }, []);

  const handleSaveProject = useCallback((projectData) => {
    console.log('Project saved:', projectData);
  }, []);

  const handleLoadProject = useCallback((projectData) => {
    setCode(projectData.code);
  }, []);

  // Check for shared code in URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#shared=')) {
      try {
        const encodedCode = hash.substring(8);
        const sharedCode = JSON.parse(atob(encodedCode));
        setCode(sharedCode);
      } catch (error) {
        console.error('Failed to load shared code:', error);
      }
    }
  }, []);

  const isVerticalLayout = layout === 'vertical';

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Toolbar */}
      <Toolbar
        layout={layout}
        onLayoutChange={setLayout}
        onTemplateSelect={handleTemplateSelect}
        onSaveProject={handleSaveProject}
        onLoadProject={handleLoadProject}
        code={code}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction={isVerticalLayout ? "vertical" : "horizontal"}
          className="h-full"
        >
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-2 pb-1">
              <CodeEditor
                onCodeChange={handleCodeChange}
                initialCode={code}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-border hover:bg-accent transition-colors" />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-2 pt-1">
              <Preview code={code} className="h-full" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="bg-editor-toolbar border-t border-border px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Ready</span>
          <span>•</span>
          <span>HTML: {code.html?.split('\n').length || 0} lines</span>
          <span>•</span>
          <span>CSS: {code.css?.split('\n').length || 0} lines</span>
          <span>•</span>
          <span>JS: {code.js?.split('\n').length || 0} lines</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          <span>Live Preview Active</span>
        </div>
      </div>
    </div>
  );
};

export default Index;