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
				src="/headshot.png"
				alt="Javier Gonzalez"
				width="256"
				height="256"
				style="width: 256px; height: 256px;
				       object-fit: cover; display: block; flex-shrink: 0; backdrop-filter: blur(4px);
					   background: rgba(255, 255, 255, 0.02); border: 1px solid #2a2a2a;"
				onerror={(e: Event) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
			/>
			<!---->
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
