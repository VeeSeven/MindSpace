import { Box, VStack } from "@chakra-ui/react";
import { useNoteTree } from "../../hooks/useNoteTree";
import { useNoteSearch } from "../../hooks/useNoteSearch";
import { SearchBar } from "./Search";
import { TagFilter } from "./Tags/TagFilter";
import { TagManager } from "./Tags/TagManager";
import { SidebarHeader } from "./Header";
import { NoteTree } from "./Notes/NoteTree";
import { EmptyState } from "./Notes/EmptyState";
import { Section } from "./Layout/Section";

export default function Sidebar({
  notes,
  loading,
  onCreateNote,
  onSelectNote,
  selectedNoteId,
  onRenameNote,
  onDeleteNote,
  onTagCreated,
  onTagDeleted,
}) {
  const { noteTree, expandedFolders, toggleExpand } = useNoteTree(notes);
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedTags, 
    setSelectedTags, 
    filteredTree, 
    clearFilters 
  } = useNoteSearch(noteTree);

  const handleTagClick = (tag) => {
    const tagName = typeof tag === 'object' ? tag.name : tag;
    
    setSelectedTags(prev => {
      const isAlreadySelected = prev.includes(tagName);
      return isAlreadySelected 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName];
    });
  };

  const handleTagCreated = (newTag) => {
    const tagName = typeof newTag === 'object' ? newTag.name : newTag;
    setSelectedTags(prev => [...prev, tagName]);
    if (onTagCreated) onTagCreated(newTag);
  };

  const handleTagDeleted = (deletedTag) => {
    const tagName = typeof deletedTag === 'object' ? deletedTag.name : deletedTag;
    setSelectedTags(prev => prev.filter(tag => tag !== tagName));
    if (onTagDeleted) onTagDeleted(deletedTag);
  };

  return (
    <Box
      width="320px"
      height="calc(100vh - 60px)"
      borderRight="1px solid"
      borderColor="gray.200"
      bg="gray.50"
      position="fixed"
      top="60px"
      left="0"
      overflowY="auto"
      zIndex="10"
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          bg: "gray.100",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "gray.300",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          bg: "gray.400",
        },
      }}
    >
      <VStack spacing={4} align="stretch" p={4}>

        <Section title="Search">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        </Section>

        <Section title="Tags" collapsible defaultCollapsed={false}>
          <TagManager 
            notes={notes}
            onTagCreated={handleTagCreated}
            onTagDeleted={handleTagDeleted}
          />
        </Section>

        <Section title="Filter by Tags">
          <TagFilter 
            notes={notes} 
            selectedTags={selectedTags} 
            setSelectedTags={setSelectedTags} 
          />
        </Section>

        <Section title=""> 
          <SidebarHeader onCreateNote={onCreateNote} />
        </Section>

        <Section title="" flex="1" minHeight="200px">
          <EmptyState 
            loading={loading}
            notes={notes}
            filteredTree={filteredTree}
            clearFilters={clearFilters}
          />

          <span style={{
            display: "block",
            fontSize: "12px",
            color: "#718096",
            marginBottom: "8px"
          }}>
            {selectedTags.length > 0 
              ? `Filtering by: ${selectedTags.join(', ')}` 
              : 'Showing all notes'}
          </span>

          <NoteTree
            filteredTree={filteredTree}
            selectedNoteId={selectedNoteId}
            onSelectNote={onSelectNote}
            onRenameNote={onRenameNote}
            onDeleteNote={onDeleteNote}
            expandedFolders={expandedFolders}
            onToggleExpand={toggleExpand}
            onCreateNote={onCreateNote}
            onTagClick={handleTagClick}
          />
        </Section>
      </VStack>
    </Box>
  );
}