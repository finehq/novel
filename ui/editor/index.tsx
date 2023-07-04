import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TiptapExtensions } from './extensions';
import { isYoutubeLink, extractYoutubeId } from './utils';

function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ...TiptapExtensions,
    ],
    content: '',
  });

  editor.on('paste', (event) => {
    const pastedText = event.clipboardData.getData('text');
    if (isYoutubeLink(pastedText)) {
      event.preventDefault();
      const youtubeId = extractYoutubeId(pastedText);
      editor.commands.insertContent(`<div data-youtube-video><iframe src="https://www.youtube.com/embed/${youtubeId}?controls=0"></iframe></div>`);
    }
  });

  editor.on('select', (event) => {
    const selectedNode = event.selection.node;
    if (selectedNode.type.name === 'youtube') {
      showToolbar({
        options: [
          { label: 'Remove', action: () => editor.commands.deleteSelection() },
          { label: 'Replace', action: () => replaceYoutubeVideo() },
        ],
      });
    }
  });

  function replaceYoutubeVideo() {
    const newLink = prompt('Enter a new YouTube link');
    if (isYoutubeLink(newLink)) {
      const youtubeId = extractYoutubeId(newLink);
      editor.commands.replaceSelection(`<div data-youtube-video><iframe src="https://www.youtube.com/embed/${youtubeId}?controls=0"></iframe></div>`);
    }
  }

  return (
    <EditorContent editor={editor} />
  );
}

export default Editor;
