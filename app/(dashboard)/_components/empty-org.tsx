import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center pt-20">
            <Image alt="gif" src={"/images/empty.gif"} className=" mix-blend-multiply" height={200} width={200} />
            <h2 className=" text-2xl font-semibold mt-6">
                Welcome to Spark
            </h2>
            <p className=" text-muted-foreground text-sm mt-2">Create an organization to get started</p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={"lg"} className=" hover:scale-105 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                            Create an organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[500px]">
                        <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}