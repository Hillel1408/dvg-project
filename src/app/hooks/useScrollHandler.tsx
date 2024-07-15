import { useEffect } from "react";

export default function useScrollHandler(observerTarget: any, scrollHandler: () => void) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    scrollHandler();
                }
            },
            { threshold: 1 },
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget]);
}
