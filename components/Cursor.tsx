"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    const label = document.querySelector<HTMLElement>(".cursor-label");
    if (!dot || !ring || !label) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      label.style.transform = `translate3d(${x + 18}px,${y + 18}px,0)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.14; ry += (y - ry) * 0.14;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      document.body.classList.add("cursor-active");
      label.textContent = el.dataset.cursor || "EXPLORE";
      label.style.opacity = "1";
    };
    const leave = () => { document.body.classList.remove("cursor-active"); label.style.opacity = "0"; };
    const targets = document.querySelectorAll<HTMLElement>("a, button, [data-cursor]");
    targets.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    window.addEventListener("mousemove", move, { passive: true });
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      targets.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
    };
  }, []);
  return <><div className="cursor-dot" /><div className="cursor-ring" /><div className="cursor-label">EXPLORE</div></>;
}
