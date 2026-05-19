<script lang="ts">
	import { onMount } from "svelte";

	let el: HTMLImageElement;

	onMount(() => {
		const DURATION = 128000;
		const LERP = 0.08;
		const MAX_DT = 100;
		let elapsed = 1;
		let last = performance.now();
		let raf: number;
		let vw = window.innerWidth;
		let sh = el.parentElement!.offsetHeight;

		function target(e: number) {
			const t = e / DURATION;
			const x = vw + 80 - (vw + 160) * t;
			const yEased = 1 - Math.cos(t * Math.PI);
			const y = sh * 0.75 + (sh * 0.15 - sh * 0.45) * yEased;
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

			el.style.transform = `translate(${smoothX}px, ${smoothY}px) scaleX(-1)`;
			raf = requestAnimationFrame(tick);
		}

		const onResize = () => {
			vw = window.innerWidth;
			sh = el.parentElement!.offsetHeight;
		};
		window.addEventListener("resize", onResize);

		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", onResize);
		};
	});
</script>

<img
	bind:this={el}
	src="/iss.png"
	alt=""
	aria-hidden="true"
	style="position: absolute; top: 0; left: 0; width: 56px; height: auto;
	       pointer-events: none; opacity: 1; will-change: transform; z-index: 0;
	       filter: drop-shadow(0 0 6px rgba(180, 200, 255, 0.3));"
/>
