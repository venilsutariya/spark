"use client";

import { userRenameModal } from "@/store/use-rename-modal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {

    const { mutate, pending } = useApiMutation(api.board.update);

    const {
        isOpen,
        onClose,
        initialValues
    } = userRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => { 
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
        .then(() => {
            toast.success("Spark renamed");
            onClose();
        })
        .catch(() => toast.error("Failed to rename spark"))
     };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit spark title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this spark
                </DialogDescription>
                <form onSubmit={onSubmit}>
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Spark title"
                    />
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant={"outline"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className="mb-2" disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};