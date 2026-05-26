<script lang="ts">
	import { fadeIn } from "$lib/actions/fadeIn";
	import type { Experience } from "$lib/data/seed";
	import ISS from "$lib/components/internal/ISS.svelte";

	export let experiences: Experience[];

	function bullets(description: string): string[] {
		return description.split("|").filter(Boolean);
	}
</script>

<section
	id="experience"
	class="section-pad"
	style="position: relative; overflow: clip;"
>
	<ISS />
	<div use:fadeIn class="section-inner" style="position: relative; z-index: 1;">
		<h2 class="section-heading" style="margin-bottom: 48px;">Experience</h2>

		<div style="position: relative;">
			<div
				class="exp-line"
				style="position: absolute; left: 5px; top: 10px; bottom: 24px;
				       width: 1px; background: #2a2a2a;"
			></div>

			<div style="display: flex; flex-direction: column; gap: 48px;">
				{#each experiences as exp}
					<article
						class="exp-item"
						style="position: relative; padding-left: 40px;"
					>
						<div
							class="exp-dot"
							style="position: absolute; left: 0; top: 10px;
							       width: 11px; height: 11px; border-radius: 50%;
							       background: #5a84e7; border: 2px solid #0d0d0d;
							       box-shadow: 0 0 0 1px #5a84e7;"
						></div>

						<div class="exp-header" style="margin-bottom: 12px;">
							<div
								style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; flex-wrap: nowrap;"
							>
								<h3
									class="exp-company"
									style="font-family: var(--font-display);
									       font-size: 1.2rem; color: #f0ede8; margin: 0;
									       font-weight: 700; min-width: 0; overflow: hidden;
									       text-overflow: ellipsis; white-space: nowrap;"
								>
									{#if exp.link}
										<a
											href={exp.link}
											target="_blank"
											rel="noopener noreferrer"
											style="color: inherit; text-decoration: none; border-bottom: 1px solid #2a2a2a;
											       transition: border-color 0.2s;"
											onmouseenter={(e) =>
												((e.currentTarget as HTMLElement).style.borderColor =
													"#5a84e7")}
											onmouseleave={(e) =>
												((e.currentTarget as HTMLElement).style.borderColor =
													"#2a2a2a")}>{exp.company}</a
										>
									{:else}
										{exp.company}
									{/if}
								</h3>
								<span
									class="mono-meta"
									style="white-space: nowrap; flex-shrink: 0; font-size: 0.7rem;"
								>
									{exp.start_date}–{exp.end_date}
								</span>
							</div>
							<p
								class="mono-meta"
								style="margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
							>
								{exp.title} · {exp.location}
							</p>
						</div>

						<ul
							style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px;"
						>
							{#each bullets(exp.description) as bullet}
								<li
									class="exp-bullet"
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

<style>
	@media (max-width: 639px) {
		.exp-line,
		.exp-dot {
			display: none;
		}

		.exp-item {
			padding-left: 0 !important;
		}

		.exp-bullet {
			padding-left: 0 !important;
			border-left: none !important;
		}
	}
</style>
