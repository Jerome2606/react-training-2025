import { useEffect, useState, useRef, useLayoutEffect } from 'react';

type LogEntry = {
  type: 'log' | 'warn' | 'error' | 'info';
  message: string;
  timestamp: string;
};

interface PlaygroundProps {
  children: React.ReactNode;
}

// Global console capture setup - runs before any component renders
let logCallbackRef: ((entries: LogEntry[]) => void) | null = null;
const logsBuffer: LogEntry[] = [];
let pendingFlush = false;

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;
const originalInfo = console.info;

const formatArgs = (...args: any[]) => {
  return args.map(arg => {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return String(arg);
      }
    }
    return String(arg);
  }).join(' ');
};

const addLog = (type: LogEntry['type'], ...args: any[]) => {
  const message = formatArgs(...args);
  const timestamp = new Date().toLocaleTimeString('fr-FR');
  const entry = { type, message, timestamp };

  // Always buffer logs first
  logsBuffer.push(entry);

  // Schedule a flush outside of the current render cycle
  if (logCallbackRef && !pendingFlush) {
    pendingFlush = true;
    setTimeout(() => {
      if (logCallbackRef && logsBuffer.length > 0) {
        const logsToFlush = [...logsBuffer];
        logsBuffer.length = 0;
        logCallbackRef(logsToFlush);
      }
      pendingFlush = false;
    }, 0);
  }
};

// Intercept console methods globally
console.log = (...args) => {
  originalLog(...args);
  addLog('log', ...args);
};

console.warn = (...args) => {
  originalWarn(...args);
  addLog('warn', ...args);
};

console.error = (...args) => {
  originalError(...args);
  addLog('error', ...args);
};

console.info = (...args) => {
  originalInfo(...args);
  addLog('info', ...args);
};

export const Playground = ({ children }: PlaygroundProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Use useLayoutEffect to set up the callback before child components render
  useLayoutEffect(() => {
    // Set up the callback to receive new logs (batched)
    logCallbackRef = (entries: LogEntry[]) => {
      setLogs(prev => [...prev, ...entries]);
    };

    // Flush any buffered logs
    if (logsBuffer.length > 0) {
      setLogs(prev => [...prev, ...logsBuffer]);
      logsBuffer.length = 0; // Clear buffer
    }

    return () => {
      logCallbackRef = null;
    };
  }, []);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => setLogs([]);

  return (
    <>
      <div className="header">
        <h1>Arsia React Playground - Local CodeSandbox</h1>
      </div>
      <div className="container">
        <div className="preview-panel">
          {children}
        </div>
        <div className="console-panel" ref={consoleRef}>
          <div className="console-header">
            <h2>📋 Console</h2>
            <button className="clear-btn" onClick={clearLogs}>Clear</button>
          </div>
          <div className="logs">
            {logs.length === 0 ? (
              <div style={{ color: '#888', fontStyle: 'italic' }}>
                Pas de logs pour le moment...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`log-entry ${log.type}`}>
                  <span className="log-timestamp">[{log.timestamp}]</span>
                  <span>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
