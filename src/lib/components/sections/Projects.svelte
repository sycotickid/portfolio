<script lang="ts">
	import { fadeIn } from "$lib/actions/fadeIn";
	import { skillIcons } from "$lib/icons";
	import type { Project } from "$lib/data/seed";

	export let projects: Project[];
</script>

<section id="projects" class="section-pad">
	<div use:fadeIn class="section-inner">
		<h2 class="section-heading" style="margin-bottom: 48px;">Projects</h2>

		<div class="projects-grid">
			{#each projects as project}
				<article class="project-card">
					<img
						src={project.thumbnail}
						alt=""
						aria-hidden="true"
						style="width: 100%; height: 160px; object-fit: cover; display: block; margin-bottom: 16px;"
					/>
					<div style="margin-bottom: 12px;">
						<h3
							style="font-family: var(--font-display);
							       font-size: 1.1rem; color: #f0ede8; margin: 0 0 8px 0; font-weight: 700;"
						>
							{#if project.link}
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									style="color: inherit; text-decoration: none; border-bottom: 1px solid #2a2a2a;
									       transition: border-color 0.2s;"
									onmouseenter={(e) =>
										((e.currentTarget as HTMLElement).style.borderColor =
											"#5a84e7")}
									onmouseleave={(e) =>
										((e.currentTarget as HTMLElement).style.borderColor =
											"#2a2a2a")}>{project.title}</a
								>
							{:else}
								{project.title}
							{/if}
						</h3>
						<p
							style="font-size: 0.875rem; line-height: 1.7; color: #c8c5c0; margin: 0;"
						>
							{project.description}
						</p>
					</div>

					{#if project.tech.length > 0}
						<div
							style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto;"
						>
							{#each project.tech as t}
								{@const icon = skillIcons[t]}
								<span class="tech-pill">
									{#if icon}
										<svg
											width="10"
											height="10"
											viewBox="0 0 24 24"
											fill="currentColor"
											aria-hidden="true"
											style="flex-shrink: 0;"
										>
											<path d={icon.path} />
										</svg>
									{/if}
									{t}
								</span>
							{/each}
						</div>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		padding: 24px;
		border: 1px solid #2a2a2a;
		background: rgba(255, 255, 255, 0.01);
		transition: border-color 0.2s;
	}

	.project-card:hover {
		border-color: #3a3a3a;
	}

	.tech-pill {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		padding: 4px 8px;
		border: 1px solid #2a2a2a;
		color: #888580;
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	@media (max-width: 767px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
