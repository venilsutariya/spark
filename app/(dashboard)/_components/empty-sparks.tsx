"use client";

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const EmptySpark = () => {
    const router = useRouter();

    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Spark created");
            router.push(`/board/${id}`);
        })
        .catch(() => {
            toast.error("Failed to create spark");
        })
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image alt="image" src={"/images/note.svg"} height={110} width={110} />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first spark
            </h2>
            <p className=" text-muted-foreground text-sm mt-2">
                start by creating spark for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size={"lg"}>
                    Create Spark
                </Button>
            </div>
        </div>
    )
}