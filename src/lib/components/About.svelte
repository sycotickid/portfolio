<script lang="ts">
	import { fadeIn } from '$lib/actions/fadeIn';

	export let summary: string;
</script>

<section id="about" class="section-pad">
	<div use:fadeIn class="section-inner">
		<h2 class="section-heading">About</h2>

		<div
			style="display: grid; grid-template-columns: 1fr 256px; gap: 48px; align-items: center;"
			class="about-grid"
		>
			<p style="color: #f0ede8; line-height: 1.8; font-size: 1.05rem; margin: 0;">
				{summary}
			</p>

			<img
				src="/headshot.jpg"
				alt="Javier Gonzalez"
				width="256"
				height="256"
				style="width: 256px; height: 256px; border-radius: 8px;
				       border: 2px solid #1a3a6a; object-fit: cover; display: block; flex-shrink: 0;"
				onerror={(e: Event) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
			/>
		</div>
	</div>
</section>

<style>
	@media (max-width: 639px) {
		.about-grid {
			grid-template-columns: 1fr !important;
		}
	}
</style>
