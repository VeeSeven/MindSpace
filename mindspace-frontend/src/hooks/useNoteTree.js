import { useMemo, useState } from 'react';

export const useNoteTree = (notes) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  
  const buildTree = (items, parentId = null) => {
    return items
      .filter(item => item.parent === parentId)
      .map(item => ({
        ...item,
        children: buildTree(items, item.id)
      }));
  };
  
  const noteTree = useMemo(() => {
    return buildTree(notes);
  }, [notes]);
  
  const toggleExpand = (noteId) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(noteId)) {
        next.delete(noteId);
      } else {
        next.add(noteId);
      }
      return next;
    });
  };
  
  const expandAll = () => {
    const allNoteIds = notes.map(note => note.id);
    setExpandedFolders(new Set(allNoteIds));
  };
  
  const collapseAll = () => {
    setExpandedFolders(new Set());
  };
  
  return {
    noteTree,
    expandedFolders,
    toggleExpand,
    expandAll,
    collapseAll,
    setExpandedFolders
  };
};