<script lang="ts">
	import { mouseGlow } from '$lib/actions/mouseGlow';
	import { brandIcons } from '$lib/icons';

	export let name: string;
	export let title: string;
	export let email: string;
	export let linkedin: string;
</script>

<section
	id="hero"
	style="min-height: 100vh; display: flex; align-items: center; padding-top: 56px; position: relative;"
>
	<div style="max-width: 1100px; margin: 0 auto; padding: 96px 24px;">
		<h1 class="hero-name" use:mouseGlow>
			{name}
		</h1>
		<p
			style="font-family: 'JetBrains Mono', monospace; color: #888580;
			       font-size: 1rem; margin: 0 0 40px 0; letter-spacing: 0.05em;"
		>
			{title}
		</p>

		<div style="display: flex; align-items: center; gap: 20px;">
			<a
				href="mailto:{email}"
				title="Email"
				aria-label="Email"
				class="hero-btn"
			>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
					<rect x="2" y="4" width="20" height="16" rx="2" />
					<path d="m2 7 10 7 10-7" />
				</svg>
			</a>

			<a
				href={linkedin}
				target="_blank"
				rel="noopener noreferrer"
				title="LinkedIn"
				aria-label="LinkedIn"
				class="hero-btn"
			>
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
					<rect x="2" y="9" width="4" height="12" />
					<circle cx="4" cy="4" r="2" />
				</svg>
			</a>

			<a
				href="https://github.com/sycotickid"
				target="_blank"
				rel="noopener noreferrer"
				title="GitHub"
				aria-label="GitHub"
				class="hero-btn"
			>
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d={brandIcons.github.path} />
				</svg>
			</a>

			<a
				href="/resume-javier-gonzalez.pdf"
				download
				title="Download Resume"
				aria-label="Download Resume"
				class="hero-btn"
			>
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M13.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L13.5 2zM9 14.5L12 17.5l3-3h-2V10h-2v4.5H9z"/>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.hero-name {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: clamp(44px, 7vw, 72px);
		line-height: 1;
		letter-spacing: -0.02em;
		color: #f0ede8;
		margin: 0 0 12px 0;
		position: relative;
		text-shadow:
			0 0 20px rgba(240, 237, 232, 0.18),
			0 0 40px rgba(240, 237, 232, 0.08);
  		transition: 0.3s;
	}

	.hero-name:hover {
		text-shadow:
			0 0 30px rgba(240, 237, 232, 0.25),
			0 0 50px rgba(240, 237, 232, 0.12);
	}

	.hero-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		color: #888580;
		text-decoration: none;
		transition: color 0.2s, transform 0.2s;
	}

	.hero-btn svg {
		width: 100%;
		height: 100%;
	}

	.hero-btn::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle 18px at var(--gx, 50%) var(--gy, 50%),
			rgba(90, 132, 231, 0.5) 0%,
			transparent 100%
		);
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
	}

	.hero-btn:hover {
		color: #5a84e7;
		transform: translateY(-2px);
		filter: drop-shadow(0 0 6px rgba(90, 132, 231, 0.6));
	}

	.hero-btn:hover::after {
		opacity: 1;
	}
</style>
