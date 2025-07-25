import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null;
    }

    const Options = [
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

    const MathOptions = [
        {
            icon: <span className="text-sm font-mono">∫</span>, // Example math icon or your own
            onClick: () => {
                const latex = prompt("Enter inline math (LaTeX):", "E = mc^2");
                if (latex) {
                    editor
                        .chain()
                        .focus()
                        .insertInlineMath({ latex })
                        .setTextSelection(editor.state.selection.to + 1) // Move cursor right after inserted node
                        .run();
                }
            },
            pressed: false,
        },
        {
            icon: <span className="text-sm font-mono">𝛴</span>, // Another math icon for block math
            onClick: () => {
                const latex = prompt("Enter block math (LaTeX):", "\\int_0^1 x^2 dx");
                if (latex) {
                    editor.chain().focus().insertBlockMath({ latex }).run();
                }
            },
            pressed: false,
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

            {MathOptions.map((option, index) => (
                <Toggle
                    className="cursor-pointer"
                    key={`math-${index}`}
                    pressed={option.pressed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}
        </div>
    );
}