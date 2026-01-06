import {
  HStack,
  IconButton,
  ButtonGroup,
  Divider,
  Text,
  Badge,
  Button,
  Box  // Added Box import
} from "@chakra-ui/react";
import {
  Bold, Italic, Underline as UnderlineIcon,
  Heading2, Heading3, List, ListOrdered,
  Quote, Code, AlignLeft, AlignCenter, AlignRight,
  Highlighter, Strikethrough, Save, Type,
  Minus, Undo, Redo
} from "lucide-react";

const TOOLBAR_SECTIONS = {
  history: [
    { icon: <Undo size={16} />, action: 'undo', label: 'Undo' },
    { icon: <Redo size={16} />, action: 'redo', label: 'Redo' }
  ],
  textStyles: [
    { icon: <Type size={16} />, action: 'setParagraph', label: 'Paragraph', activeCheck: 'paragraph' },
    { icon: <Heading2 size={16} />, action: 'toggleHeading2', label: 'Heading 2', activeCheck: 'heading2' },
    { icon: <Heading3 size={16} />, action: 'toggleHeading3', label: 'Heading 3', activeCheck: 'heading3' }
  ],
  formatting: [
    { icon: <Bold size={16} />, action: 'toggleBold', label: 'Bold', activeCheck: 'bold' },
    { icon: <Italic size={16} />, action: 'toggleItalic', label: 'Italic', activeCheck: 'italic' },
    { icon: <UnderlineIcon size={16} />, action: 'toggleUnderline', label: 'Underline', activeCheck: 'underline' },
    { icon: <Strikethrough size={16} />, action: 'toggleStrike', label: 'Strikethrough', activeCheck: 'strike' },
    { icon: <Highlighter size={16} />, action: 'toggleHighlight', label: 'Highlight', activeCheck: 'highlight' }
  ],
  listsAndBlocks: [
    { icon: <List size={16} />, action: 'toggleBulletList', label: 'Bullet List', activeCheck: 'bulletList' },
    { icon: <ListOrdered size={16} />, action: 'toggleOrderedList', label: 'Numbered List', activeCheck: 'orderedList' },
    { icon: <Quote size={16} />, action: 'toggleBlockquote', label: 'Blockquote', activeCheck: 'blockquote' },
    { icon: <Code size={16} />, action: 'toggleCodeBlock', label: 'Code Block', activeCheck: 'codeBlock' },
    { icon: <Minus size={16} />, action: 'setHorizontalRule', label: 'Horizontal Rule' }
  ],
  alignment: [
    { icon: <AlignLeft size={16} />, action: 'alignLeft', label: 'Align Left', activeCheck: 'alignLeft' },
    { icon: <AlignCenter size={16} />, action: 'alignCenter', label: 'Align Center', activeCheck: 'alignCenter' },
    { icon: <AlignRight size={16} />, action: 'alignRight', label: 'Align Right', activeCheck: 'alignRight' }
  ]
};

const getEditorCommand = (editor, action) => {
  const commandMap = {
    undo: () => editor.chain().focus().undo().run(),
    redo: () => editor.chain().focus().redo().run(),
    setParagraph: () => editor.chain().focus().setParagraph().run(),
    toggleHeading2: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    toggleHeading3: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleStrike: () => editor.chain().focus().toggleStrike().run(),
    toggleHighlight: () => editor.chain().focus().toggleHighlight().run(),
    toggleBulletList: () => editor.chain().focus().toggleBulletList().run(),
    toggleOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    toggleBlockquote: () => editor.chain().focus().toggleBlockquote().run(),
    toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    setHorizontalRule: () => editor.chain().focus().setHorizontalRule().run(),
    alignLeft: () => editor.chain().focus().setTextAlign('left').run(),
    alignCenter: () => editor.chain().focus().setTextAlign('center').run(),
    alignRight: () => editor.chain().focus().setTextAlign('right').run()
  };
  
  return commandMap[action] || (() => {});
};

const checkIsActive = (editor, activeCheck) => {
  const activeMap = {
    paragraph: () => editor.isActive('paragraph'),
    heading2: () => editor.isActive('heading', { level: 2 }),
    heading3: () => editor.isActive('heading', { level: 3 }),
    bold: () => editor.isActive('bold'),
    italic: () => editor.isActive('italic'),
    underline: () => editor.isActive('underline'),
    strike: () => editor.isActive('strike'),
    highlight: () => editor.isActive('highlight'),
    bulletList: () => editor.isActive('bulletList'),
    orderedList: () => editor.isActive('orderedList'),
    blockquote: () => editor.isActive('blockquote'),
    codeBlock: () => editor.isActive('codeBlock'),
    alignLeft: () => editor.isActive({ textAlign: 'left' }),
    alignCenter: () => editor.isActive({ textAlign: 'center' }),
    alignRight: () => editor.isActive({ textAlign: 'right' })
  };
  
  return activeMap[activeCheck] ? activeMap[activeCheck]() : false;
};

const ToolbarButton = ({ editor, item }) => {
  const isDisabled = ['undo', 'redo'].includes(item.action) 
    ? (item.action === 'undo' ? !editor?.can().undo() : !editor?.can().redo())
    : false;
  
  const isActive = item.activeCheck ? checkIsActive(editor, item.activeCheck) : false;
  
  return (
    <IconButton
      icon={item.icon}
      onClick={() => getEditorCommand(editor, item.action)()}
      aria-label={item.label}
      isDisabled={isDisabled}
      color={isActive ? 'blue.500' : 'gray.600'}
      bg={isActive ? 'blue.50' : 'transparent'}
      size="sm"
      variant="ghost"
      _hover={{ bg: isActive ? 'blue.100' : 'gray.100' }}
    />
  );
};

export const Toolbar = ({ editor, wordCount, characterCount, saving, onSave, note }) => { // Added note prop
  return (
    <Box
      bg="white"
      px={6}
      py={3}
      position="sticky"
      top="0"
      zIndex="20"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <HStack justify="space-between" mb={3}>
        <HStack spacing={4}>
          <Text fontSize="xl" fontWeight="700" color="gray.800">
            {note.title}
          </Text>
          <Badge 
            colorScheme="blue" 
            variant="subtle" 
            fontSize="xs" 
            borderRadius="full" 
            px={2}
          >
            Editing
          </Badge>
        </HStack>
        
        <HStack spacing={4}>
          <HStack spacing={2}>
            <Box textAlign="right">
              <Text fontSize="xs" color="gray.500" fontWeight="500">
                {wordCount} words
              </Text>
              <Text fontSize="xs" color="gray.400">
                {characterCount} chars
              </Text>
            </Box>
          </HStack>
          
          <Divider orientation="vertical" height="24px" />
          
          <Button
            leftIcon={<Save size={18} />}
            colorScheme="blue"
            size="sm"
            onClick={onSave}
            isLoading={saving}
            loadingText="Saving..."
            variant="solid"
            fontWeight="600"
            borderRadius="md"
            px={4}
            _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            Save
          </Button>
        </HStack>
      </HStack>

      <HStack spacing={2} overflowX="auto" py={2} css={{
        '&::-webkit-scrollbar': { height: '4px' },
        '&::-webkit-scrollbar-track': { background: '#f1f1f1' },
        '&::-webkit-scrollbar-thumb': { 
          background: 'linear-gradient(to right, #4299E1, #3182CE)', 
          borderRadius: '2px' 
        },
      }}>
        {Object.entries(TOOLBAR_SECTIONS).map(([sectionName, buttons], index) => (
          <>
            <ButtonGroup key={sectionName} size="sm" variant="ghost" spacing={1}>
              {buttons.map((button) => (
                <ToolbarButton key={button.action} editor={editor} item={button} />
              ))}
            </ButtonGroup>
            {index < Object.keys(TOOLBAR_SECTIONS).length - 1 && (
              <Divider orientation="vertical" height="20px" />
            )}
          </>
        ))}
      </HStack>
    </Box>
  );
};