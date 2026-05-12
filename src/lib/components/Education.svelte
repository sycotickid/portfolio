<script lang="ts">
	import { fadeIn } from '$lib/actions/fadeIn';
	import type { Education } from '$lib/data/seed';

	export let education: Education[];
</script>

<section id="education" class="section-pad">
	<div use:fadeIn class="section-inner">
		<h2 class="section-heading">Education</h2>

		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="edu-grid">
			{#each education as edu}
				<article
					class="edu-card"
					style="border: 1px solid #2a2a2a; padding: 24px; transition: border-color 0.2s;"
					onmouseenter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#5a84e7')}
					onmouseleave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a')}
				>
					<h3
						style="font-family: 'Playfair Display Variable', Georgia, serif; font-size: 1.15rem;
						       color: #f0ede8; margin: 0 0 8px 0; font-weight: 700;"
					>
						{edu.degree}
					</h3>
					<p class="mono-meta" style="margin-bottom: 4px;">{edu.institution}</p>
					<p class="mono-meta" style="font-size: 0.7rem;">{edu.year}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.edu-card {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		background: rgba(255, 255, 255, 0.02);
	}

	@media (max-width: 639px) {
		.edu-grid {
			grid-template-columns: 1fr !important;
		}
	}
</style>
