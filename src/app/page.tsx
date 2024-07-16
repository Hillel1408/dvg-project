"use client";

import { useEffect, useState } from "react";
import { setCookie } from "nookies";
import { useMutation } from "@tanstack/react-query";
import { GarageList } from "@/app/components";
import { authService } from "@/app/services";
import type { IUsers } from "@/app/types/global";

export default function Home() {
    const [visibleContent, setVisibleContent] = useState(false);

    const mutation = useMutation({
        mutationFn: (arg: IUsers) => {
            return authService.auth(arg);
        },
        onSuccess: async (data) => {
            setCookie(null, "token", data.data.access, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            setVisibleContent((prev) => !prev);
        },
    });

    useEffect(() => {
        mutation.mutate({
            username: "DVG",
            password: "123",
        });
    }, []);

    return <main className="">{visibleContent && <GarageList />}</main>;
}
