import { useState, useCallback, useEffect } from 'react';

export function useTripPlan() {
  const [tripPlan, setTripPlanState] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save to history for undo/redo
  const saveToHistory = useCallback((plan) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(plan)));
      if (newHistory.length > 20) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 19));
  }, [historyIndex]);

  const setTripPlan = useCallback((updater) => {
    setTripPlanState(prev => {
      const newPlan = typeof updater === 'function' ? updater(prev) : updater;
      if (newPlan && newPlan !== prev) {
        saveToHistory(newPlan);
      }
      return newPlan;
    });
  }, [saveToHistory]);

  const resetTripPlan = useCallback((newPlan) => {
    setTripPlanState(newPlan);
    setHistory([JSON.parse(JSON.stringify(newPlan))]);
    setHistoryIndex(0);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setTripPlanState(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setTripPlanState(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return [tripPlan, setTripPlan, resetTripPlan, { undo, redo, canUndo, canRedo }];
}