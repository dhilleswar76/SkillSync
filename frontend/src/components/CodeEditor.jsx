import { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ problem, onClose }) => {
  const [code, setCode] = useState(problem?.starterCode || getDefaultCode(problem?.language || 'javascript'));
  const [language, setLanguage] = useState(problem?.language || 'javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('vs-dark');

  function getDefaultCode(lang) {
    const templates = {
      javascript: `// Solve: ${problem?.title || 'Problem'}\nfunction solution() {\n  // Write your code here\n  \n}\n\n// Test your solution\nconsole.log(solution());`,
      python: `# Solve: ${problem?.title || 'Problem'}\ndef solution():\n    # Write your code here\n    pass\n\n# Test your solution\nprint(solution())`,
      java: `// Solve: ${problem?.title || 'Problem'}\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `// Solve: ${problem?.title || 'Problem'}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`,
    };
    return templates[lang] || templates.javascript;
  }

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    setTimeout(() => {
      try {
        // Simple JavaScript execution (in production, use a proper sandbox/API)
        if (language === 'javascript') {
          const logs = [];
          const originalLog = console.log;
          console.log = (...args) => logs.push(args.join(' '));
          
          try {
            eval(code);
            setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully!');
          } catch (error) {
            setOutput(`Error: ${error.message}`);
          } finally {
            console.log = originalLog;
          }
        } else {
          setOutput(`⚠️ Online execution for ${language} coming soon!\n\nFor now, copy your code and run it locally.\n\nTip: You can test your solution on LeetCode, GeeksforGeeks, or CodeChef.`);
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => {
    setCode(getDefaultCode(language));
    setOutput('');
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {problem?.title || 'Code Editor'}
            </h2>
            {problem?.difficulty && (
              <span className={`text-sm font-medium ${
                problem.difficulty === 'easy' ? 'text-green-600' :
                problem.difficulty === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode(getDefaultCode(e.target.value));
                setOutput('');
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
              <option value="hc-black">High Contrast</option>
            </select>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Editor + Problem Description Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Problem Description */}
          {problem && (
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Problem Description</h3>
              <div className="prose dark:prose-invert prose-sm max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {problem.description || 'Solve this coding challenge using your preferred programming language.'}
                </p>
                
                {problem.examples && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples:</h4>
                    {problem.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-3 rounded mb-2 text-sm">
                        <div><strong>Input:</strong> {example.input}</div>
                        <div><strong>Output:</strong> {example.output}</div>
                        {example.explanation && (
                          <div className="mt-1 text-gray-600 dark:text-gray-400">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Constraints:</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300">
                      {problem.constraints.map((constraint, idx) => (
                        <li key={idx}>• {constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {problem.link && (
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-sm"
                  >
                    🔗 View on {problem.platform || 'Platform'} →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Code Editor */}
          <div className={`${problem ? 'w-2/3' : 'w-full'} flex flex-col`}>
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme={theme}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </div>

            {/* Output Panel */}
            {output && (
              <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 max-h-48 overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Output:</h4>
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex gap-2">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition flex items-center gap-2"
            >
              {isRunning ? '⏳ Running...' : '▶ Run Code'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              🔄 Reset
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                alert('Code copied to clipboard!');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              📋 Copy Code
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
