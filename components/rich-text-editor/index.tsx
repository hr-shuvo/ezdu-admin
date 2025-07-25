'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight';
import Math, { migrateMathStrings } from '@tiptap/extension-mathematics'

import { MenuBar } from './menu-bar';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

type Props = {
    value?: string
    onChange: (value: string) => void
    onBlur?: () => void
    name?: string
    disabled?:boolean
}

export const RichTextEditor = forwardRef<HTMLDivElement, Props>(

    ({ value, onChange, onBlur }, ref) => {
        const editor = useEditor({
            extensions: [
                StarterKit.configure({
                    bulletList: {
                        HTMLAttributes: {
                            class: "list-disc ml-3",
                        },
                    },
                    orderedList: {
                        HTMLAttributes: {
                            class: "list-decimal ml-3",
                        },
                    },
                }),
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                }),
                Highlight,
                Math
            ],
            content: '',
            editorProps: {
                attributes: {
                    class: "min-h-[156px] border py-2 px-3"
                }
            },
            onUpdate: ({ editor }) => {
                onChange(editor.getHTML())
            }
        })

        useImperativeHandle(ref, () => document.createElement('div'), [])

        useEffect(() => {
            if (editor && value !== editor.getHTML()) {
                editor.commands.setContent(value || '')
            }
        }, [value])

        return (
            <div>
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
            </div>
        )
    })

