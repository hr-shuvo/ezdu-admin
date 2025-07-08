'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from "@tiptap/extension-table-row";

import { MenuBar } from './menu-bar';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

type Props = {
    value?: string
    onChange: (value: string) => void
    onBlur?: () => void
    name?: string
    disabled?:boolean
}

const CustomTable = Table.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    return attributes.class ? { class: attributes.class } : {};
                },
            },
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => {
                    return attributes.style ? { style: attributes.style } : {};
                },
            },
        };
    },
});

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

                Image.configure({
                    inline: true,
                    allowBase64: true,
                    HTMLAttributes: {
                        style: "display: block; max-width: 50%; height: auto; margin: 0 auto;"
                    }
                }),

                CustomTable.configure({
                    resizable: true,
                    // HTMLAttributes: {
                    //     class: " border-collapse border border-gray-300",
                    //     style: "border-collapse: collapse; width: 100%;"
                    // }
                }),
                TableRow,
                TableHeader,
                TableCell,

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

