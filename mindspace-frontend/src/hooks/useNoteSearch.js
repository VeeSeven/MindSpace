import { useMemo, useState } from 'react';

export const useNoteSearch = (noteTree) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  
  const filterTree = (tree, query, tags) => {
    if (!query && tags.length === 0) return tree;
    
    const filterItems = (items) => {
      return items.filter(item => {
        const matchesSearch = !query || 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase());
        
        const matchesTags = tags.length === 0 || 
          (item.tags && tags.some(tag => 
            item.tags.some(noteTag => 
              (typeof noteTag === 'object' ? noteTag.name : noteTag).toLowerCase() === tag.toLowerCase()
            )
          ));
        
        const childrenMatch = filterItems(item.children || []);
        
        return matchesSearch && matchesTags || childrenMatch.length > 0;
      }).map(item => ({
        ...item,
        children: filterItems(item.children || [])
      }));
    };
    
    return filterItems(tree);
  };
  
  const filteredTree = useMemo(() => {
    return filterTree(noteTree, searchQuery, selectedTags);
  }, [noteTree, searchQuery, selectedTags]);
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };
  
  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    filteredTree,
    clearFilters
  };
};