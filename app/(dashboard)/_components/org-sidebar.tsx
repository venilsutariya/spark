"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

export const OrgSidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites")

    return (
        <div className=" hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
            <Link href={"/"}>
                <div className=" flex items-center gap-x-2">
                    <Image alt="logo" src={"/images/logo.png"} height={60} width={40} />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className
                    )}>Spark</span>
                </div>
            </Link>
            <OrganizationSwitcher 
            hidePersonal
            appearance={{
                elements: {
                    rootBox: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    },
                    organizationSwitcherTrigger: {
                        padding: "6px",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                    }
                }
            }}
            />
            <div className="space-y-1 w-full">
                <Button
                 variant={favorites ? "ghost": "secondary"}
                 asChild
                 size={"lg"}
                 className=" font-normal justify-start px-2 w-full"
                >
                    <Link href={"/"}>
                        <LayoutDashboard className="h-4 w-4 mr-2"/>
                        Team Spark
                    </Link>
                </Button>
                <Button
                 variant={favorites ? "secondary": "ghost"}
                 asChild
                 size={"lg"}
                 className=" font-normal justify-start px-2 w-full"
                >
                    <Link href={{
                        pathname: "/",
                        query: { favorites: true }
                    }}>
                        <Sparkles className="h-4 w-4 mr-2"/>
                        Favorite Spark
                    </Link>
                </Button>
            </div>
        </div>
    )
}