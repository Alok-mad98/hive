import { onSettled } from "solid-js";
import { createStretchyFooter } from "../engines/stretchy-footer";
import "./support.css";

const stretchHeight = 176;

export function FooterContent() {
  return (
    <footer class="hive-footer">
      <span class="hive-footer-wordmark" aria-hidden="true">Hive</span>
      <a class="hive-footer-link" href="https://github.com/Alok-mad98/hive">
        View on GitHub <span aria-hidden="true">↗</span>
      </a>
    </footer>
  );
}

export default function Footer() {
  let canvas!: HTMLCanvasElement;
  onSettled(() => {
    const stretch = createStretchyFooter(
      { canvas, scroller: window, content: "[data-stretchy-page]" },
      {
        maxStretch: stretchHeight,
        colors: ["#f6f4eb", "#f7d370", "#f1ac16", "#b36315", "#2d2518"],
        columns: 13,
        stiffness: 380,
        damping: 32,
        blur: 20,
      },
    );
    return () => stretch?.destroy();
  });

  return (
    <div class="hive-overscroll" data-slot="stretchy-footer" style={{ height: `${stretchHeight}px` }} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
