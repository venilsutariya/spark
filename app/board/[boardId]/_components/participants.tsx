"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {

    const users = useOthers();
    const currentuser = useSelf();
    const hasMoreUsers = users.length > MAX_SHOWN_USERS;

    return (
        <div className=" absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md p-3">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOWN_USERS)
                    .map(({ connectionId, info }) => {
                        return (
                            <UserAvatar
                                borderColor={connectionIdColor(connectionId)}
                                key={connectionId}
                                src={info?.picture}
                                name={info?.name}
                                fallback={info?.name?.[0] || "A"}
                            />
                        )
                    })}

                {currentuser && (
                    <UserAvatar
                        borderColor={connectionIdColor(currentuser.connectionId)}
                        src={currentuser.info?.picture}
                        name={`${currentuser.info?.name} (You)`}
                        fallback={currentuser.info?.name?.[0]}
                    />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${users.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
        </div>
    );
};

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md p-3 w-[100px]" />
    )
}