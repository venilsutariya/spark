"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { userRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

const TabSeparator = () => {
    return (
        <div className=" text-neutral-300 p-1.5">
            |
        </div>
    )
}

export const Info = ({
    boardId
}: InfoProps) => {
    const { onOpen } = userRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    if (!data) return <InfoSkeleton />

    return (
        <div className=" absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Got to sparks" side="bottom" sideOffset={10}>
                <Button asChild variant={"board"} className=" flex items-center justify-center">
                    <Link href={"/"} className="pe-5">
                        <Image alt="logo" height={40} width={40} src={"/images/logo.png"} />
                        <span className={cn(
                            " font-semibold text-xl ml-2 text-black",
                            font.className
                        )}>Spark</span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label="Edit title" side="bottom" sideOffset={10}>
            <Button
                variant={"board"}
                className=" font-normal px-2"
                onClick={() => onOpen(data._id, data.title)}>
                <span className=" text-black">{data.title}</span>
            </Button>
            </Hint>
            <TabSeparator />
            <Actions 
             id={data._id}
             title={data.title}
             side="bottom"
             sideOffset={10}
            >
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size={"icon"}  variant={"board"}>
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className=" absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
    )
}