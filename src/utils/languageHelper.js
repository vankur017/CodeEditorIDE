import { 
  FileCode, FileJson, FileText, Code2, Terminal, Hash, 
  Layout, Database, Settings, Info 
} from "lucide-react";

// 1. Map extensions to Monaco language IDs
const extensionToLanguageMap = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  html: 'html',
  css: 'css',
  json: 'json',
  py: 'python',
  java: 'java',
  c: 'c',
  cpp: 'cpp',
  cs: 'csharp',
  go: 'go',
  rs: 'rust',
  php: 'php',
  rb: 'ruby',
  md: 'markdown',
  sql: 'sql',
  yaml: 'yaml',
  xml: 'xml'
};

// 2. Export the Language Detection Utility
export const getLanguageByExtension = (filename) => {
  if (!filename || !filename.includes('.')) {
    return 'plaintext';
  }
  const parts = filename.split('.');
  const ext = parts.pop().toLowerCase();
  
  return extensionToLanguageMap[ext] || 'plaintext';
};

// 3. Export the Icon Mapping Utility
export const getFileIcon = (language) => {
  const iconMap = {
    javascript: { icon: FileCode, color: "text-yellow-400" },
    typescript: { icon: FileCode, color: "text-blue-400" },
    html: { icon: Layout, color: "text-orange-500" },
    css: { icon: Hash, color: "text-blue-300" },
    json: { icon: FileJson, color: "text-yellow-300" },
    python: { icon: Terminal, color: "text-blue-500" },
    java: { icon: Code2, color: "text-red-500" },
    c: { icon: FileCode, color: "text-gray-400" },
    cpp: { icon: FileCode, color: "text-blue-600" },
    csharp: { icon: Code2, color: "text-purple-500" },
    go: { icon: Terminal, color: "text-cyan-500" },
    rust: { icon: Settings, color: "text-orange-700" },
    php: { icon: FileCode, color: "text-indigo-400" },
    ruby: { icon: FileCode, color: "text-red-600" },
    sql: { icon: Database, color: "text-pink-500" },
    markdown: { icon: FileText, color: "text-blue-200" },
    yaml: { icon: Settings, color: "text-gray-300" },
    xml: { icon: Code2, color: "text-orange-300" },
    plaintext: { icon: FileText, color: "text-gray-500" },
  };

  return iconMap[language] || iconMap.plaintext;
};