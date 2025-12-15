import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Box, 
  Button, 
  HStack, 
  IconButton, 
  ButtonGroup,
  Divider,
  useToast,
  Text,
  Heading,
  Spinner,
  Badge
} from "@chakra-ui/react";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List, 
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Strikethrough,
  Save,
  Type,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Table,
  Undo,
  Redo
} from "lucide-react";
import { useEffect, useState } from "react";
import useAxios from "../api/axios";

export default function NoteEditor({ note, onSaved }) {
  const api = useAxios();
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const toast = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1,2,3] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Placeholder.configure({ placeholder: 'Start typing here... or press / for commands' }),
    ],
    content: note?.content || "<p></p>",
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const words = text.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
      setCharacterCount(text.length);
    },
  });

  // when note changes, set editor content (force replace)
  useEffect(() => {
    if (!editor) return;
    const html = note?.content || "<p></p>";
    // always replace editor content with server content when switching notes
    editor.commands.setContent(html, false);
    const text = editor.getText();
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharacterCount(text.length);
  }, [note, editor]);

  const handleSave = async () => {
    if (!note || !editor) return;
    setSaving(true);
    try {
      const content = editor.getHTML();
      const res = await api.put(`notes/${note.id}/`, {
        title: note.title,
        content,
      });
      onSaved && onSaved(res.data);
      toast({ 
        title: "✓ Note saved", 
        status: "success", 
        duration: 1500, 
        isClosable: true,
        position: "top-right"
      });
    } catch (e) {
      console.error("Save error:", e);
      toast({ 
        title: "Save failed", 
        description: e.message || "Please try again",
        status: "error", 
        duration: 2500, 
        isClosable: true,
        position: "top-right"
      });
    } finally {
      setSaving(false);
    }
  };

  // autosave every 30s
  useEffect(() => {
    if (!note || !editor) return;
    const id = setInterval(() => {
      if (editor.getHTML() !== (note.content || "<p></p>")) {
        handleSave();
      }
    }, 30000);
    return () => clearInterval(id);
  }, [note, editor]);

  if (!note) {
    return (
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        height="100%" 
        bgGradient="linear(to-br, gray.50, blue.50)"
      >
        <Box 
          textAlign="center" 
          p={10} 
          borderRadius="2xl" 
          bg="white" 
          boxShadow="xl"
          maxW="500px"
          mx={4}
        >
          <Heading size="xl" color="gray.700" mb={3} fontWeight="800">
            Welcome to MindSpace
          </Heading>
          <Text color="gray.500" fontSize="lg" mb={6}>
            Select a note from the sidebar or create a new one to begin
          </Text>
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            gap={3} 
            color="gray.400"
          >
            <Text>✨</Text>
            <Text fontSize="sm">Tip: Your notes are auto-saved every 30 seconds</Text>
            <Text>✨</Text>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      width="100%" 
      height="100%" 
      display="flex" 
      flexDirection="column" 
      bg="white"
      overflow="hidden"
    >
      {/* Enhanced Toolbar with Gradient */}
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
              onClick={handleSave}
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

        {/* Enhanced Toolbar with Sections */}
        <HStack spacing={2} overflowX="auto" py={2} css={{
          '&::-webkit-scrollbar': { height: '4px' },
          '&::-webkit-scrollbar-track': { background: '#f1f1f1' },
          '&::-webkit-scrollbar-thumb': { 
            background: 'linear-gradient(to right, #4299E1, #3182CE)', 
            borderRadius: '2px' 
          },
        }}>
          {/* History Controls */}
          <ButtonGroup size="sm" variant="ghost" spacing={1}>
            <IconButton 
              icon={<Undo size={16} />} 
              onClick={() => editor?.chain().focus().undo().run()} 
              aria-label="Undo"
              isDisabled={!editor?.can().undo()}
              color="gray.600"
            />
            <IconButton 
              icon={<Redo size={16} />} 
              onClick={() => editor?.chain().focus().redo().run()} 
              aria-label="Redo"
              isDisabled={!editor?.can().redo()}
              color="gray.600"
            />
          </ButtonGroup>

          <Divider orientation="vertical" height="20px" />

          {/* Text Styles */}
          <ButtonGroup size="sm" variant="ghost" spacing={1}>
            <IconButton 
              icon={<Type size={16} />} 
              onClick={() => editor?.chain().focus().setParagraph().run()} 
              aria-label="Paragraph"
              color={editor?.isActive('paragraph') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('paragraph') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Heading2 size={16} />} 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
              aria-label="Heading 2"
              color={editor?.isActive('heading', { level: 2 }) ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('heading', { level: 2 }) ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Heading3 size={16} />} 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
              aria-label="Heading 3"
              color={editor?.isActive('heading', { level: 3 }) ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('heading', { level: 3 }) ? 'blue.50' : 'transparent'}
            />
          </ButtonGroup>

          <Divider orientation="vertical" height="20px" />

          {/* Text Formatting */}
          <ButtonGroup size="sm" variant="ghost" spacing={1}>
            <IconButton 
              icon={<Bold size={16} />} 
              onClick={() => editor?.chain().focus().toggleBold().run()} 
              aria-label="Bold"
              color={editor?.isActive('bold') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('bold') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Italic size={16} />} 
              onClick={() => editor?.chain().focus().toggleItalic().run()} 
              aria-label="Italic"
              color={editor?.isActive('italic') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('italic') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<UnderlineIcon size={16} />} 
              onClick={() => editor?.chain().focus().toggleUnderline().run()} 
              aria-label="Underline"
              color={editor?.isActive('underline') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('underline') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Strikethrough size={16} />} 
              onClick={() => editor?.chain().focus().toggleStrike().run()} 
              aria-label="Strikethrough"
              color={editor?.isActive('strike') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('strike') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Highlighter size={16} />} 
              onClick={() => editor?.chain().focus().toggleHighlight().run()} 
              aria-label="Highlight"
              color={editor?.isActive('highlight') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('highlight') ? 'blue.50' : 'transparent'}
            />
          </ButtonGroup>

          <Divider orientation="vertical" height="20px" />

          {/* Lists & Blocks */}
          <ButtonGroup size="sm" variant="ghost" spacing={1}>
            <IconButton 
              icon={<List size={16} />} 
              onClick={() => editor?.chain().focus().toggleBulletList().run()} 
              aria-label="Bullet List"
              color={editor?.isActive('bulletList') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('bulletList') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<ListOrdered size={16} />} 
              onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
              aria-label="Numbered List"
              color={editor?.isActive('orderedList') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('orderedList') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Quote size={16} />} 
              onClick={() => editor?.chain().focus().toggleBlockquote().run()} 
              aria-label="Blockquote"
              color={editor?.isActive('blockquote') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('blockquote') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Code size={16} />} 
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()} 
              aria-label="Code Block"
              color={editor?.isActive('codeBlock') ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive('codeBlock') ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<Minus size={16} />} 
              onClick={() => editor?.chain().focus().setHorizontalRule().run()} 
              aria-label="Horizontal Rule"
              color="gray.600"
            />
          </ButtonGroup>

          <Divider orientation="vertical" height="20px" />

          {/* Alignment */}
          <ButtonGroup size="sm" variant="ghost" spacing={1}>
            <IconButton 
              icon={<AlignLeft size={16} />} 
              onClick={() => editor?.chain().focus().setTextAlign('left').run()} 
              aria-label="Align Left"
              color={editor?.isActive({ textAlign: 'left' }) ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive({ textAlign: 'left' }) ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<AlignCenter size={16} />} 
              onClick={() => editor?.chain().focus().setTextAlign('center').run()} 
              aria-label="Align Center"
              color={editor?.isActive({ textAlign: 'center' }) ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive({ textAlign: 'center' }) ? 'blue.50' : 'transparent'}
            />
            <IconButton 
              icon={<AlignRight size={16} />} 
              onClick={() => editor?.chain().focus().setTextAlign('right').run()} 
              aria-label="Align Right"
              color={editor?.isActive({ textAlign: 'right' }) ? 'blue.500' : 'gray.600'}
              bg={editor?.isActive({ textAlign: 'right' }) ? 'blue.50' : 'transparent'}
            />
          </ButtonGroup>
        </HStack>
      </Box>

      {/* Enhanced Editor Container */}
      <Box
        flex="1"
        overflowY="auto"
        width="100%"
        bg="gray.50"
        position="relative"
      >
        <Box
          maxW="900px"
          mx="auto"
          px={{ base: 4, md: 8, lg: 12 }}
          py={10}
          minHeight="calc(100vh - 160px)"
          bg="white"
          boxShadow="0 0 40px rgba(0, 0, 0, 0.02)"
          borderRadius="lg"
          marginTop="4"
          marginBottom="10"
        >
          {editor ? (
            <Box
              sx={{
                "& .tiptap": {
                  minHeight: "500px",
                  outline: "none",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  "& > * + *": {
                    marginTop: "1.25em",
                  },
                  "& h1": {
                    fontSize: "2.75em",
                    fontWeight: "800",
                    lineHeight: 1.2,
                    marginTop: "1.5em",
                    marginBottom: "0.5em",
                    color: "gray.800",
                    letterSpacing: "-0.02em",
                    borderBottom: "2px solid",
                    borderColor: "blue.100",
                    paddingBottom: "0.3em",
                  },
                  "& h2": {
                    fontSize: "2.25em",
                    fontWeight: "700",
                    lineHeight: 1.3,
                    marginTop: "1.5em",
                    marginBottom: "0.5em",
                    color: "gray.800",
                    letterSpacing: "-0.01em",
                  },
                  "& h3": {
                    fontSize: "1.75em",
                    fontWeight: "600",
                    lineHeight: 1.4,
                    marginTop: "1.5em",
                    marginBottom: "0.5em",
                    color: "gray.700",
                  },
                  "& p": {
                    fontSize: "1.125em",
                    lineHeight: 1.8,
                    marginBottom: "1.25em",
                    color: "gray.700",
                  },
                  "& ul, & ol": {
                    paddingLeft: "1.75em",
                    marginBottom: "1.25em",
                    "& li": {
                      marginBottom: "0.5em",
                      lineHeight: 1.7,
                      "& p": {
                        margin: 0,
                      },
                      "&::marker": {
                        color: "#4299E1",
                      },
                    },
                  },
                  "& blockquote": {
                    borderLeft: "4px solid",
                    borderColor: "blue.300",
                    paddingLeft: "1.5em",
                    fontStyle: "italic",
                    margin: "2em 0",
                    color: "gray.600",
                    backgroundColor: "blue.50",
                    padding: "1.5em",
                    borderRadius: "8px",
                    "& p": {
                      fontSize: "1.2em",
                      lineHeight: 1.6,
                      margin: 0,
                    },
                  },
                  "& code": {
                    backgroundColor: "gray.100",
                    padding: "0.2em 0.4em",
                    borderRadius: "6px",
                    fontFamily: "'SF Mono', Monaco, 'Courier New', monospace",
                    fontSize: "0.9em",
                    color: "gray.800",
                    border: "1px solid",
                    borderColor: "gray.200",
                  },
                  "& pre": {
                    backgroundColor: "gray.900",
                    color: "gray.100",
                    padding: "1.5em",
                    borderRadius: "12px",
                    overflow: "auto",
                    margin: "2em 0",
                    fontSize: "0.95em",
                    lineHeight: 1.6,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    "& code": {
                      backgroundColor: "transparent",
                      padding: 0,
                      color: "inherit",
                      fontSize: "inherit",
                      border: "none",
                    },
                  },
                  "& hr": {
                    border: "none",
                    borderTop: "2px dashed",
                    borderColor: "gray.300",
                    margin: "3em 0",
                  },
                  "& .ProseMirror": {
                    padding: "1em 0",
                    "& > *:first-child": {
                      marginTop: 0,
                    },
                  },
                  "& .ProseMirror-focused": {
                    outline: "none",
                  },
                },
              }}
            >
              <EditorContent editor={editor} />
            </Box>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center" height="500px">
              <Spinner size="xl" color="blue.500" thickness="3px" />
            </Box>
          )}
          
          {/* Editor Footer */}
          <Box 
            mt={10} 
            pt={6} 
            borderTop="1px solid" 
            borderColor="gray.200" 
            fontSize="sm" 
            color="gray.500"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>
              Last edited: {note.updated_at ? new Date(note.updated_at).toLocaleDateString() : 'Just now'}
            </Text>
            <Text>
              Auto-saves every 30 seconds
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}