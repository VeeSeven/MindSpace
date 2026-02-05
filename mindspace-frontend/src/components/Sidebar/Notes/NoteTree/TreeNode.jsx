import { Box } from "@chakra-ui/react";
import { NoteListItem } from "../NoteListItem";

export const TreeNode = ({ 
  note, 
  depth = 0,
  selectedNoteId,
  onSelectNote,
  onRenameNote,
  onDeleteNote,
  expandedFolders,
  onToggleExpand,
  onCreateNote,
  onTagClick,
}) => {
  const isExpanded = expandedFolders.has(note.id);
  const hasChildren = note.children && note.children.length > 0;

  return (
    <Box>
      <NoteListItem
        note={note}
        isSelected={selectedNoteId === note.id}
        onSelect={onSelectNote}
        onRename={onRenameNote}
        onDelete={onDeleteNote}
        depth={depth}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
        children={note.children || []}
        onAddChildNote={onCreateNote}
        isFolder={hasChildren}
        onTagClick={onTagClick}
      />
      
      {isExpanded && hasChildren && (
        <Box ml={`${(depth + 1) * 20}px`} mt={1}>
          {note.children.map(child => (
            <TreeNode
              key={child.id}
              note={child}
              depth={depth + 1}
              selectedNoteId={selectedNoteId}
              onSelectNote={onSelectNote}
              onRenameNote={onRenameNote}
              onDeleteNote={onDeleteNote}
              expandedFolders={expandedFolders}
              onToggleExpand={onToggleExpand}
              onCreateNote={onCreateNote}
              onTagClick={onTagClick}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};