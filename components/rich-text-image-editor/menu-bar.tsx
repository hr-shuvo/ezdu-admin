import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter, ImageIcon,
    Italic,
    List,
    ListOrdered, Minus, MinusSquare, Plus, PlusIcon, PlusSquare,
    Strikethrough, TableIcon, Trash, TrashIcon,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null;
    }

    const Options = [
        {
            icon: <ImageIcon className="size-4" />, // replace with your Lucide icon
            onClick: () => {
                const url = window.prompt("Enter image URL");
                if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            },
            preesed: false, // images aren't toggles
        },


        {
            icon: <TableIcon className="size-4" />,
            onClick: () => {
                editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
            },
            preesed: false,
        },
        {
            icon: <PlusSquare className="size-4" />, // Lucide icon for "add row"
            onClick: () => editor.chain().focus().addRowAfter().run(),
            preesed: false,
        },
        {
            icon: <MinusSquare className="size-4" />, // Lucide icon for "delete row"
            onClick: () => editor.chain().focus().deleteRow().run(),
            preesed: false,
        },
        {
            icon: <Plus className="size-4" />, // Lucide icon for "add column"
            onClick: () => editor.chain().focus().addColumnAfter().run(),
            preesed: false,
        },
        {
            icon: <Minus className="size-4" />, // Lucide icon for "delete column"
            onClick: () => editor.chain().focus().deleteColumn().run(),
            preesed: false,
        },
        {
            icon: <Trash className="size-4" />, // Lucide icon for "delete entire table"
            onClick: () => editor.chain().focus().deleteTable().run(),
            preesed: false,
        },




        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            preesed: editor.isActive("highlight"),
        },
    ];

    return (
        <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
            {Options.map((option, index) => (
                <Toggle
                    className="cursor-pointer"
                    key={index}
                    pressed={option.preesed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}
        </div>
    );
}