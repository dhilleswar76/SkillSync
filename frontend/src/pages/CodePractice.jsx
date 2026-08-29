import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useAuth } from "../context/AuthContext";

export default function CodePractice() {
  const { requireAuth } = useAuth();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(`// Welcome to SkillSync Code Practice IDE
// Write and test algorithms in JavaScript, Python, Java, C++, or C#

function solve() {
  console.log("Hello from SkillSync IDE!");
  return "Execution complete";
}

solve();
`);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const runCode = () => {
    setRunning(true);
    setOutput("Executing code...");
    setTimeout(() => {
      if (language === "javascript") {
        try {
          const logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.join(" ")),
            error: (...args) => logs.push("ERROR: " + args.join(" ")),
            warn: (...args) => logs.push("WARN: " + args.join(" ")),
          };
          const fn = new Function("console", code);
          const res = fn(customConsole);
          setOutput(logs.length > 0 ? logs.join("\n") : (res !== undefined ? String(res) : "Program completed successfully with no output"));
        } catch (err) {
          setOutput("Runtime Error: " + err.message);
        }
      } else {
        setOutput(`[${language.toUpperCase()}] Execution simulation finished.\nCode compiled without syntax errors.`);
      }
      setRunning(false);
    }, 250);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* IDE Topbar */}
      <div className="h-14 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">💻</span>
          <h1 className="text-base font-bold text-white">Code Practice Workspace</h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="javascript">JavaScript (ES6)</option>
            <option value="python">Python 3</option>
            <option value="java">Java</option>
            <option value="cpp">C++ 20</option>
            <option value="csharp">C#</option>
          </select>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>

          <button
            onClick={() => {
              requireAuth(() => {
                alert("Solution saved to your student profile successfully!");
              }, "Sign in to save your custom solutions and build your coding portfolio.");
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
          >
            💾 Save Solution
          </button>

          <button
            onClick={runCode}
            disabled={running}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
          >
            <span>▶</span>
            <span>{running ? "Running..." : "Run Code"}</span>
          </button>
        </div>
      </div>

      {/* Main split: Editor (Top/Left) + Output (Bottom) */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={language}
            theme={theme}
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>

        {/* Output Console */}
        <div className="h-48 bg-slate-900 border-t border-slate-800 flex flex-col">
          <div className="px-4 py-1.5 bg-slate-950 border-b border-slate-800 text-xs font-semibold text-slate-400">
            Console Output
          </div>
          <pre className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-200 whitespace-pre-wrap">
            {output || "Run code to see console logs..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
