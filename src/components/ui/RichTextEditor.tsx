'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      padding: '8px',
      borderBottom: '1px solid var(--color-border)',
      background: 'var(--color-bg-secondary)',
      borderTopLeftRadius: 'var(--radius-md)',
      borderTopRightRadius: 'var(--radius-md)',
    }}>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`header-action-btn ${editor.isActive('bold') ? 'active' : ''}`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`header-action-btn ${editor.isActive('italic') ? 'active' : ''}`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`header-action-btn ${editor.isActive('strike') ? 'active' : ''}`}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`header-action-btn ${editor.isActive('code') ? 'active' : ''}`}
        title="Code"
      >
        <Code size={16} />
      </button>

      <div style={{ width: '1px', background: 'var(--color-border)', margin: '0 4px' }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`header-action-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`header-action-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`header-action-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      <div style={{ width: '1px', background: 'var(--color-border)', margin: '0 4px' }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`header-action-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`header-action-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`header-action-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
        title="Blockquote"
      >
        <Quote size={16} />
      </button>

      <div style={{ width: '1px', background: 'var(--color-border)', margin: '0 4px' }} />

      <button type="button" onClick={addImage} className="header-action-btn" title="Add Image">
        <ImageIcon size={16} />
      </button>
      <button type="button" onClick={setLink} className={`header-action-btn ${editor.isActive('link') ? 'active' : ''}`} title="Add Link">
        <LinkIcon size={16} />
      </button>

      <div style={{ flex: 1 }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="header-action-btn"
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="header-action-btn"
        title="Redo"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none min-h-[300px] max-w-none p-4',
      },
    },
  });

  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-card)', overflow: 'hidden' }}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <style dangerouslySetInnerHTML={{__html: `
        .header-action-btn.active {
          background: rgba(245, 158, 11, 0.15);
          color: var(--color-primary);
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--color-text-tertiary);
          pointer-events: none;
          height: 0;
        }
      `}} />
    </div>
  );
}
