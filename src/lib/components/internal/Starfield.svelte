<script lang="ts">
	import { onMount } from "svelte";

	const STAR_COUNT = 2048;
	const STAR_SIZE_MIN = 0.4;
	const STAR_SIZE_SPREAD = 1.2;
	const STAR_OPACITY_MIN = 0.25;
	const STAR_OPACITY_SPREAD = 0.6;
	const STAR_SPEED_MIN = 0.2;
	const STAR_SPEED_SPREAD = 0.8;
	const STAR_COLOR = "180, 200, 255";

	const FLICKER_RATIO = 0.125;
	const FLICKER_SPEED_MIN = 6;
	const FLICKER_SPEED_SPREAD = 10;
	const FLICKER_EXPONENT = 0.3;

	const PARALLAX = 0.25;
	const MOUSE_PARALLAX = 0.04;
	const MOUSE_PARALLAX_Y = 0.02;
	const MOUSE_LERP = 0.06;
	const FRAME_DELTA = 0.016;

	const SHOOTER_ANGLE_MIN = Math.PI / 5;
	const SHOOTER_ANGLE_SPREAD = Math.PI / 8;
	const SHOOTER_SPEED_MIN = 10;
	const SHOOTER_SPEED_SPREAD = 8;
	const SHOOTER_SPAWN_X = 0.55;
	const SHOOTER_SPAWN_Y = 0.45;
	const SHOOTER_LENGTH_MIN = 90;
	const SHOOTER_LENGTH_SPREAD = 70;
	const SHOOTER_DECAY_MIN = 0.01;
	const SHOOTER_DECAY_SPREAD = 0.008;
	const SHOOTER_INTERVAL_MIN = 5000;
	const SHOOTER_INTERVAL_SPREAD = 9000;
	const SHOOTER_LINE_WIDTH = 1.5;

	let canvas: HTMLCanvasElement;
	let mouseX = 0;
	let mouseY = 0;
	let smoothX = 0;
	let smoothY = 0;

	onMount(() => {
		const ctx = canvas.getContext("2d")!;
		type Star = {
			x: number;
			y: number;
			size: number;
			opacity: number;
			phase: number;
			speed: number;
			flicker: boolean;
		};
		const stars: Star[] = [];

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		function initStars() {
			stars.length = 0;
			for (let i = 0; i < STAR_COUNT; i++) {
				const flicker = Math.random() < FLICKER_RATIO;
				stars.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * STAR_SIZE_SPREAD + STAR_SIZE_MIN,
					opacity: Math.random() * STAR_OPACITY_SPREAD + STAR_OPACITY_MIN,
					phase: Math.random() * Math.PI * 2,
					speed: flicker
						? FLICKER_SPEED_MIN + Math.random() * FLICKER_SPEED_SPREAD
						: STAR_SPEED_MIN + Math.random() * STAR_SPEED_SPREAD,
					flicker,
				});
			}
		}

		type ShootingStar = {
			x: number;
			y: number;
			vx: number;
			vy: number;
			length: number;
			alpha: number;
			decay: number;
		};

		let shooter: ShootingStar | null = null;
		let shooterTimer: ReturnType<typeof setTimeout>;

		function spawnShooter() {
			const angle = SHOOTER_ANGLE_MIN + Math.random() * SHOOTER_ANGLE_SPREAD;
			const speed = SHOOTER_SPEED_MIN + Math.random() * SHOOTER_SPEED_SPREAD;
			shooter = {
				x: Math.random() * canvas.width * SHOOTER_SPAWN_X,
				y: Math.random() * canvas.height * SHOOTER_SPAWN_Y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				length: SHOOTER_LENGTH_MIN + Math.random() * SHOOTER_LENGTH_SPREAD,
				alpha: 1,
				decay: SHOOTER_DECAY_MIN + Math.random() * SHOOTER_DECAY_SPREAD,
			};
			scheduleShooter();
		}

		function scheduleShooter() {
			const delay =
				SHOOTER_INTERVAL_MIN + Math.random() * SHOOTER_INTERVAL_SPREAD;
			shooterTimer = setTimeout(spawnShooter, delay);
		}

		function drawShooter() {
			if (!shooter) return;
			const s = shooter;
			const spd = Math.hypot(s.vx, s.vy);
			const nx = s.vx / spd;
			const ny = s.vy / spd;

			const grad = ctx.createLinearGradient(
				s.x,
				s.y,
				s.x - nx * s.length,
				s.y - ny * s.length,
			);
			grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha.toFixed(3)})`);
			grad.addColorStop(
				0.3,
				`rgba(180, 210, 255, ${(s.alpha * 0.6).toFixed(3)})`,
			);
			grad.addColorStop(1, "rgba(180, 200, 255, 0)");

			ctx.beginPath();
			ctx.moveTo(s.x, s.y);
			ctx.lineTo(s.x - nx * s.length, s.y - ny * s.length);
			ctx.strokeStyle = grad;
			ctx.lineWidth = SHOOTER_LINE_WIDTH;
			ctx.lineCap = "round";
			ctx.stroke();

			s.x += s.vx;
			s.y += s.vy;
			s.alpha -= s.decay;

			if (
				s.alpha <= 0 ||
				s.x > canvas.width + s.length ||
				s.y > canvas.height + s.length
			) {
				shooter = null;
			}
		}

		let raf: number;
		let t = 0;

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			t += FRAME_DELTA;
			smoothX += (mouseX - smoothX) * MOUSE_LERP;
			smoothY += (mouseY - smoothY) * MOUSE_LERP;
			const scrollOffset = window.scrollY * PARALLAX;
			const mouseOffsetX = smoothX * (canvas.width * 0.5) * MOUSE_PARALLAX;
			const mouseOffsetY = smoothY * (canvas.height * 0.5) * MOUSE_PARALLAX_Y;
			for (const s of stars) {
				const x =
					(((s.x - mouseOffsetX) % canvas.width) + canvas.width) % canvas.width;
				const y =
					(((s.y - scrollOffset - mouseOffsetY) % canvas.height) +
						canvas.height) %
					canvas.height;
				const wave = Math.sin(t * s.speed + s.phase);
				const alpha = s.flicker
					? s.opacity * Math.pow(Math.abs(wave), FLICKER_EXPONENT)
					: s.opacity * (0.5 + 0.5 * wave);
				ctx.beginPath();
				ctx.arc(x, y, s.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${STAR_COLOR}, ${alpha.toFixed(3)})`;
				ctx.fill();
			}
			drawShooter();
			raf = requestAnimationFrame(draw);
		}

		resize();
		initStars();
		scheduleShooter();
		draw();

		const onResize = () => {
			resize();
			initStars();
		};
		const onMouse = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth) * 2 - 1;
			mouseY = (e.clientY / window.innerHeight) * 5 - 1;
		};

		window.addEventListener("resize", onResize);
		window.addEventListener("mousemove", onMouse, { passive: true });

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(shooterTimer);
			window.removeEventListener("resize", onResize);
			window.removeEventListener("mousemove", onMouse);
		};
	});
</script>

<canvas
	bind:this={canvas}
	aria-hidden="true"
	style="position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;"
></canvas>
