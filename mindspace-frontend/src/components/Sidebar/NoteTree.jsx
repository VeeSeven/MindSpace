import { VStack } from "@chakra-ui/react";
import { NoteListItem } from "./NoteListItem";

export const NoteTree = ({
  filteredTree,
  selectedNoteId,
  onSelectNote,
  onRenameNote,
  onDeleteNote,
  expandedFolders,
  onToggleExpand,
  onCreateNote,
}) => {
  if (filteredTree.length === 0) return null;

  return (
    <VStack align="stretch" spacing={1}>
      {filteredTree.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          isSelected={selectedNoteId === note.id}
          onSelect={onSelectNote}
          onRename={onRenameNote}
          onDelete={onDeleteNote}
          depth={0}
          isExpanded={expandedFolders.has(note.id)}
          onToggleExpand={onToggleExpand}
          children={note.children || []}
          onAddChildNote={onCreateNote}
          isFolder={note.children && note.children.length > 0}
        />
      ))}
    </VStack>
  );
};