<script lang="ts">
	import { fadeIn } from "$lib/actions/fadeIn";
	import type { Experience } from "$lib/data/seed";

	export let experiences: Experience[];

	function bullets(description: string): string[] {
		return description.split("|").filter(Boolean);
	}
</script>

<section id="experience" class="section-pad">
	<div use:fadeIn class="section-inner">
		<h2 class="section-heading" style="margin-bottom: 48px;">Experience</h2>

		<div style="position: relative;">
			<div
				style="position: absolute; left: 5px; top: 10px; bottom: 24px;
				       width: 1px; background: #2a2a2a;"
			></div>

			<div style="display: flex; flex-direction: column; gap: 48px;">
				{#each experiences as exp}
					<article style="position: relative; padding-left: 40px;">
						<div
							style="position: absolute; left: 0; top: 10px;
							       width: 11px; height: 11px; border-radius: 50%;
							       background: #5a84e7; border: 2px solid #0d0d0d;
							       box-shadow: 0 0 0 1px #5a84e7;"
						></div>

						<div
							style="display: flex; flex-wrap: wrap; justify-content: space-between;
							       align-items: flex-start; gap: 8px; margin-bottom: 12px;"
						>
							<div>
								<h3
									style="font-family: 'Playfair Display Variable', Georgia, serif;
									       font-size: 1.2rem; color: #f0ede8; margin: 0 0 4px 0;
									       font-weight: 700;"
								>
									{exp.company}
								</h3>
								<p class="mono-meta">{exp.title} · {exp.location}</p>
							</div>
							<span
								class="mono-meta"
								style="white-space: nowrap; padding-top: 2px; font-size: 0.7rem;"
							>
								{exp.start_date}–{exp.end_date}
							</span>
						</div>

						<ul
							style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px;"
						>
							{#each bullets(exp.description) as bullet}
								<li
									style="font-size: 0.9rem; line-height: 1.7; color: #c8c5c0;
									       padding-left: 12px; border-left: 1px solid #2a2a2a;"
								>
									{bullet}
								</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
