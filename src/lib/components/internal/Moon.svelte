<script lang="ts">
	import { onMount } from "svelte";

	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);
	const SYNODIC_MS = 29.53058867 * 86400000;

	function getMoonPhase(): number {
		const elapsed = Date.now() - KNOWN_NEW_MOON;
		return (((elapsed % SYNODIC_MS) + SYNODIC_MS) % SYNODIC_MS) / SYNODIC_MS;
	}

	function drawPhase(phase: number) {
		const ctx = canvas.getContext("2d")!;
		const size = canvas.width;
		const r = size / 2;

		ctx.clearRect(0, 0, size, size);

		if (Math.abs(phase - 0.5) < 0.005) return;

		const phi = phase * 2 * Math.PI;
		const termX = Math.cos(phi) * r;

		ctx.save();
		ctx.beginPath();
		ctx.arc(r, r, r, 0, Math.PI * 2);
		ctx.clip();
		ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
		ctx.beginPath();

		if (phase < 0.5) {
			// Waxing: dark on left side
			ctx.arc(r, r, r, -Math.PI / 2, Math.PI / 2, true);
			ctx.ellipse(
				r,
				r,
				Math.max(0.5, Math.abs(termX)),
				r,
				0,
				Math.PI / 2,
				-Math.PI / 2,
				termX < 0,
			);
		} else {
			// Waning: dark on right side
			ctx.arc(r, r, r, -Math.PI / 2, Math.PI / 2, false);
			ctx.ellipse(
				r,
				r,
				Math.max(0.5, Math.abs(termX)),
				r,
				0,
				Math.PI / 2,
				-Math.PI / 2,
				termX > 0,
			);
		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	onMount(() => {
		const DURATION = 300000;
		const LERP = 0.08;
		const MAX_DT = 100;
		let elapsed = 1;
		let last = performance.now();
		let raf: number;
		let vw = window.innerWidth;
		let vh = window.innerHeight;

		drawPhase(getMoonPhase());

		function target(e: number) {
			const t = e / DURATION;
			const x = -150 + (vw + 320) * t;
			const yStart = vh * 0.5;
			const yPeak = vh * -0.1;
			const yEnd = vh * 0.3;
			const mt = 1 - t;
			const y = mt * mt * yStart + 2 * mt * t * yPeak + t * t * yEnd;
			return { x, y };
		}

		const init = target(elapsed);
		let smoothX = init.x;
		let smoothY = init.y;

		function tick(now: number) {
			const dt = Math.min(now - last, MAX_DT);
			last = now;
			const wrapped = elapsed + dt >= DURATION;
			elapsed = (elapsed + dt) % DURATION;

			const { x, y } = target(elapsed);
			if (wrapped) {
				smoothX = x;
				smoothY = y;
			} else {
				const alpha = 1 - Math.pow(1 - LERP, dt / 16.67);
				smoothX += (x - smoothX) * alpha;
				smoothY += (y - smoothY) * alpha;
			}

			container.style.transform = `translate(${smoothX}px, ${smoothY}px)`;
			raf = requestAnimationFrame(tick);
		}

		const onResize = () => { vw = window.innerWidth; vh = window.innerHeight; };
		window.addEventListener("resize", onResize);

		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", onResize);
		};
	});
</script>

<div
	bind:this={container}
	style="position: absolute; top: 0; left: 0; width: 140px; height: 140px;
	       pointer-events: none; will-change: transform; z-index: 0;"
>
	<img
		src="/moon.png"
		alt=""
		aria-hidden="true"
		style="width: 100%; height: 100%; display: block;
		       filter: drop-shadow(0 0 8px rgba(200, 215, 255, 0.35));"
	/>
	<canvas
		bind:this={canvas}
		width="140"
		height="140"
		style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
	></canvas>
</div>
