import { useEffect, useRef, useState } from "react";

export default function LazyOnVisible({
  children,
  fallback = null,
  rootMargin = "300px",
}) {
  const wrapperRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element || shouldRender) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={wrapperRef} style={shouldRender ? { display: "contents" } : undefined}>
      {shouldRender ? children : fallback}
    </div>
  );
}
