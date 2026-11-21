import { createSignal, onSettled } from "solid-js";
import { createSnake404, type Snake404Direction, type Snake404Instance } from "../engines/snake-404";
import "./support.css";

const directions: ReadonlyArray<{ label: string; icon: string; direction: Snake404Direction }> = [
  { label: "Left", icon: "←", direction: 2 },
  { label: "Up", icon: "↑", direction: 3 },
  { label: "Down", icon: "↓", direction: 1 },
  { label: "Right", icon: "→", direction: 0 },
];

export default function Missing() {
  let canvas!: HTMLCanvasElement;
  let board!: HTMLDivElement;
  let game: Snake404Instance | null = null;
  const [ready, setReady] = createSignal(false);

  onSettled(() => {
    game = createSnake404(board, canvas, {
      code: "404",
      color: "#eeb641",
      cellSize: 10,
      speed: 12,
      theme: "dark",
      playable: true,
      score: true,
    });
    setReady(game !== null);
    return () => game?.destroy();
  });

  return (
    <main class="hive-missing">
      <div class="hive-missing-copy">
        <span class="hive-missing-code">HTTP 404</span>
        <h1>Off the trail.</h1>
        <p>Play a round of Snake or head back to Hive.</p>
        <a class="hive-home-link" href="/">← Back to Hive</a>
      </div>

      <div class="hive-game">
        <div class="hive-board-frame">
          <div
            class="hive-board"
            data-slot="snake-404"
            ref={board}
            role="application"
            tabindex={0}
            aria-label="Snake game. Use arrow keys, WASD, or swipe to steer."
          >
            <canvas ref={canvas} />
          </div>
        </div>
        <div class="hive-game-tools">
          <span>ARROWS · WASD · SWIPE</span>
          <div class="hive-dpad" aria-label="Snake controls" role="group">
            {directions.map(({label, icon, direction}) => (
              <button
                type="button"
                aria-label={label}
                disabled={!ready()}
                onClick={() => game?.steer(direction)}
              >{icon}</button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
