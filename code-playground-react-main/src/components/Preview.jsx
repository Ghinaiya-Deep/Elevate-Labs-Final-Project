import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';

const Preview = ({ code, className = '' }) => {
  const iframeRef = useRef(null);

  const updatePreview = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const combinedCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <style>
          ${code.css || ''}
        </style>
      </head>
      <body>
        ${code.html || ''}
        <script>
          // Error handling for preview
          window.onerror = function(msg, url, lineNo, columnNo, error) {
            console.error('Preview Error:', msg, 'at line', lineNo);
            return false;
          };
          
          ${code.js || ''}
        </script>
      </body>
      </html>
    `;

    // Write content to iframe
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(combinedCode);
    iframe.contentWindow.document.close();
  };

  const refreshPreview = () => {
    updatePreview();
  };

  const openInNewTab = () => {
    const combinedCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <style>
          ${code.css || ''}
        </style>
      </head>
      <body>
        ${code.html || ''}
        <script>
          ${code.js || ''}
        </script>
      </body>
      </html>
    `;

    const newWindow = window.open();
    newWindow.document.write(combinedCode);
    newWindow.document.close();
  };

  useEffect(() => {
    updatePreview();
  }, [code]);

  return (
    <Card className={`bg-editor-panel border-border shadow-editor ${className}`}>
      <div className="bg-editor-toolbar border-b border-border px-4 py-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
          Live Preview
        </h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshPreview}
            className="h-8 w-8 p-0 hover:bg-secondary transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={openInNewTab}
            className="h-8 w-8 p-0 hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="h-full bg-white">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      </div>
    </Card>
  );
};

export default Preview;