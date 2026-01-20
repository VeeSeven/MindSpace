import { Box, VStack } from "@chakra-ui/react";
import { useNoteTree } from "../../hooks/useNoteTree";
import { useNoteSearch } from "../../hooks/useNoteSearch";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarEmptyState } from "./SidebarEmptyState";
import { NoteTree } from "./NoteTree";

export default function Sidebar({
  notes,
  loading,
  onCreateNote,
  onSelectNote,
  selectedNoteId,
  onRenameNote,
  onDeleteNote,
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

  return (
    <Box
      width="280px"
      height="calc(100vh - 60px)"
      borderRight="1px solid"
      borderColor="gray.200"
      bg="gray.50"
      position="fixed"
      top="60px"
      left="0"
      overflowY="auto"
      zIndex="10"
    >
      <VStack spacing={2} align="stretch" p={4}>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <TagFilter 
          notes={notes} 
          selectedTags={selectedTags} 
          setSelectedTags={setSelectedTags} 
        />
        
        <SidebarHeader onCreateNote={onCreateNote} />
        
        <SidebarEmptyState 
          loading={loading}
          notes={notes}
          filteredTree={filteredTree}
          clearFilters={clearFilters}
        />
        
        <NoteTree
          filteredTree={filteredTree}
          selectedNoteId={selectedNoteId}
          onSelectNote={onSelectNote}
          onRenameNote={onRenameNote}
          onDeleteNote={onDeleteNote}
          expandedFolders={expandedFolders}
          onToggleExpand={toggleExpand}
          onCreateNote={onCreateNote}
        />
      </VStack>
    </Box>
  );
}