import { useEffect, useState, useCallback } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';

export const useEditorSetup = (initialContent) => {
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  const updateCounts = useCallback((editorInstance) => {
    const text = editorInstance.getText();
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharacterCount(text.length);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Placeholder.configure({ 
        placeholder: 'Start typing here... or press / for commands' 
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor: editorInstance }) => {
      updateCounts(editorInstance);
    },
  });

  useEffect(() => {
    if (editor) {
      updateCounts(editor);
    }
  }, [editor, updateCounts]);

  return { editor, wordCount, characterCount };
};