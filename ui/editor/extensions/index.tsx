import { Extension } from '@tiptap/core';
import Youtube from "@tiptap/extension-youtube";

export const TiptapExtensions = [
  // other extensions...
  Youtube.configure({
    inline: false,
    width: 640,
    height: 480,
    controls: true,
  }),
];
