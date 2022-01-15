import React from "react";

const useIntersectionObserver = ({
                                     target,
                                     onIntersect,
                                     threshold = 0,
                                     rootMargin = "500px",
                                 }) => {
    React.useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, {
            rootMargin,
            threshold,
        });
        const current = target.current;
        observer.observe(current);
        return () => {
            observer.unobserve(current);
        };
    });
};
export default useIntersectionObserver;
