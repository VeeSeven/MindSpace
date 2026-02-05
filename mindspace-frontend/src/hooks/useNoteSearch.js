import { useState, useMemo } from 'react';

export const useNoteSearch = (noteTree) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredTree = useMemo(() => {
    
    const noteMatches = (item) => {
      
      const matchesSearch = searchQuery === '' || 
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(selectedTag => {
          const tagName = typeof selectedTag === 'string' 
            ? selectedTag 
            : selectedTag.name || selectedTag;
          
          if (!item.tags || !Array.isArray(item.tags)) return false;
          
          return item.tags.some(itemTag => {
            const itemTagName = typeof itemTag === 'string'
              ? itemTag
              : itemTag.name || itemTag;
            
            return itemTagName.toLowerCase() === tagName.toLowerCase();
          });
        });

      return matchesSearch && matchesTags;
    };

    const filterTree = (items) => {
      const result = [];
      
      for (const item of items) {
        const currentItemMatches = noteMatches(item);
        
        const filteredChildren = filterTree(item.children || []);
        
        if (currentItemMatches || filteredChildren.length > 0) {
          result.push({
            ...item,
            children: filteredChildren
          });
        }
      }
      
      return result;
    };

    return filterTree(noteTree);
  }, [noteTree, searchQuery, selectedTags]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    filteredTree,
    clearFilters: () => {
      setSearchQuery('');
      setSelectedTags([]);
    }
  };
};