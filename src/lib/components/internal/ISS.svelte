<script lang="ts">
	import { onMount } from "svelte";

	let el: HTMLImageElement;

	onMount(() => {
		const DURATION = 128000;
		let elapsed = 1;
		let last = performance.now();
		let raf: number;

		function tick(now: number) {
			elapsed = (elapsed + (now - last)) % DURATION;
			last = now;

			const t = elapsed / DURATION;
			const vw = window.innerWidth;
			const sh = el.parentElement!.offsetHeight;

			const x = vw + 80 - (vw + 160) * t;

			const yEased = 1 - Math.cos(t * Math.PI);
			const y = sh * 0.75 + (sh * 0.15 - sh * 0.45) * yEased;

			el.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`;
			raf = requestAnimationFrame(tick);
		}

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
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
