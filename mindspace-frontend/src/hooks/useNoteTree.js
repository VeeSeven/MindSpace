import { useState, useMemo } from 'react';

export const useNoteTree = (notes = []) => {
  const [expandedFolders, setExpandedFolders] = useState([]);

  const noteTree = useMemo(() => {
    if (!Array.isArray(notes)) return [];
    
    const noteMap = {};
    const tree = [];
    
    notes.forEach(note => {
      noteMap[note.id] = { ...note, children: [] };
    });
    
    notes.forEach(note => {
      const noteWithChildren = noteMap[note.id];
      if (note.parent && noteMap[note.parent]) {
        noteMap[note.parent].children.push(noteWithChildren);
      } else {
        tree.push(noteWithChildren);
      }
    });
    
    return tree;
  }, [notes]);

  const toggleExpand = (noteId) => {
    setExpandedFolders(prev => {
      if (prev.includes(noteId)) {
        return prev.filter(id => id !== noteId);
      } else {
        return [...prev, noteId];
      }
    });
  };

  return {
    noteTree,
    expandedFolders,
    toggleExpand
  };
};