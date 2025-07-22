import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Save, 
  Share2, 
  Layout, 
  Palette, 
  Settings,
  Code2,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Toolbar = ({ 
  layout, 
  onLayoutChange, 
  onTemplateSelect, 
  onSaveProject, 
  onLoadProject,
  code 
}) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('My Code Project');
  const { toast } = useToast();

  const templates = [
    {
      id: 'blank',
      name: 'Blank Project',
      description: 'Start with empty files',
      code: {
        html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>New Project</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
        css: '/* Add your styles here */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}',
        js: '// Add your JavaScript here\nconsole.log("Hello, World!");'
      }
    },
    {
      id: 'landing-page',
      name: 'Landing Page',
      description: 'Beautiful landing page template',
      code: {
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Amazing Product</title>
</head>
<body>
  <header class="hero">
    <div class="container">
      <h1>Welcome to the Future</h1>
      <p>Discover amazing features that will change your life</p>
      <button class="cta-button" onclick="scrollToFeatures()">Get Started</button>
    </div>
  </header>
  
  <section id="features" class="features">
    <div class="container">
      <h2>Features</h2>
      <div class="feature-grid">
        <div class="feature">
          <h3>🚀 Fast</h3>
          <p>Lightning fast performance</p>
        </div>
        <div class="feature">
          <h3>🔒 Secure</h3>
          <p>Bank-level security</p>
        </div>
        <div class="feature">
          <h3>📱 Responsive</h3>
          <p>Works on all devices</p>
        </div>
      </div>
    </div>
  </section>
</body>
</html>`,
        css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
}

.features {
  padding: 80px 0;
  background: #f8f9fa;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}`,
        js: `function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({
    behavior: 'smooth'
  });
}

// Add smooth scroll animations
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  // Observe all features
  document.querySelectorAll('.feature').forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(30px)';
    feature.style.transition = 'all 0.6s ease';
    observer.observe(feature);
  });
});`
      }
    },
    {
      id: 'todo-app',
      name: 'Todo App',
      description: 'Interactive todo list application',
      code: {
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
</head>
<body>
  <div class="app">
    <header>
      <h1>📝 My Todo List</h1>
    </header>
    
    <div class="todo-input">
      <input type="text" id="new-todo" placeholder="What needs to be done?">
      <button onclick="addTodo()">Add Todo</button>
    </div>
    
    <ul id="todo-list" class="todo-list">
      <!-- Todos will be added here dynamically -->
    </ul>
    
    <div class="stats">
      <span id="todo-count">0 items left</span>
      <button onclick="clearCompleted()">Clear Completed</button>
    </div>
  </div>
</body>
</html>`,
        css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  min-height: 100vh;
  padding: 20px;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

header {
  background: #2d3436;
  color: white;
  padding: 20px;
  text-align: center;
}

header h1 {
  font-size: 1.8rem;
  font-weight: 300;
}

.todo-input {
  display: flex;
  padding: 20px;
  gap: 10px;
  border-bottom: 1px solid #eee;
}

.todo-input input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.todo-input input:focus {
  outline: none;
  border-color: #74b9ff;
}

.todo-input button {
  background: #74b9ff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

.todo-input button:hover {
  background: #0984e3;
}

.todo-list {
  list-style: none;
  max-height: 400px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  gap: 15px;
}

.todo-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.todo-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background: #ff5252;
}

.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  font-size: 14px;
}

.stats button {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.stats button:hover {
  background: #5a6268;
}`,
        js: `let todos = [];
let nextId = 1;

function addTodo() {
  const input = document.getElementById('new-todo');
  const text = input.value.trim();
  
  if (text) {
    todos.push({
      id: nextId++,
      text: text,
      completed: false
    });
    input.value = '';
    renderTodos();
    updateStats();
  }
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
    updateStats();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
  updateStats();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  renderTodos();
  updateStats();
}

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.innerHTML = \`
      <input type="checkbox" \${todo.completed ? 'checked' : ''} 
             onchange="toggleTodo(\${todo.id})">
      <span class="todo-text">\${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(\${todo.id})">Delete</button>
    \`;
    todoList.appendChild(li);
  });
}

function updateStats() {
  const activeCount = todos.filter(t => !t.completed).length;
  const countElement = document.getElementById('todo-count');
  countElement.textContent = \`\${activeCount} item\${activeCount !== 1 ? 's' : ''} left\`;
}

// Allow adding todos with Enter key
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('new-todo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  });
});`
      }
    }
  ];

  const handleSave = () => {
    const projectData = {
      name: projectName,
      code: code,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const savedProjects = JSON.parse(localStorage.getItem('codeProjects') || '[]');
    savedProjects.push(projectData);
    localStorage.setItem('codeProjects', JSON.stringify(savedProjects));
    
    if (onSaveProject) {
      onSaveProject(projectData);
    }
    
    toast({
      title: "Project saved!",
      description: `"${projectName}" has been saved to your browser.`,
    });
  };

  const handleExport = () => {
    const combinedCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
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
</html>`;

    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported!",
      description: "Your project has been downloaded as an HTML file.",
    });
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#shared=${btoa(JSON.stringify(code))}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "Share this link to let others view your code.",
      });
      setShareDialogOpen(false);
    });
  };

  return (
    <div className="bg-editor-toolbar border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Code Playground</span>
        </div>
        
        <Select onValueChange={(templateId) => {
          const template = templates.find(t => t.id === templateId);
          if (template && onTemplateSelect) {
            onTemplateSelect(template.code);
            toast({
              title: "Template loaded!",
              description: `"${template.name}" template has been loaded.`,
            });
          }
        }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Choose template..." />
          </SelectTrigger>
          <SelectContent>
            {templates.map(template => (
              <SelectItem key={template.id} value={template.id}>
                <div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-muted-foreground">{template.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLayoutChange(layout === 'horizontal' ? 'vertical' : 'horizontal')}
        >
          <Layout className="h-4 w-4 mr-2" />
          {layout === 'horizontal' ? 'Vertical' : 'Horizontal'}
        </Button>

        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Project</DialogTitle>
              <DialogDescription>
                Generate a shareable link for your code project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="share-name">Project Name</Label>
                <Input
                  id="share-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name..."
                />
              </div>
              <Button onClick={handleShare} className="w-full">
                Copy Share Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>

        <Button variant="ghost" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;