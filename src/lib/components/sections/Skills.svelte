<script lang="ts">
	import { fadeIn } from "$lib/actions/fadeIn";
	import { mouseGlow } from "$lib/actions/mouseGlow";
	import { skillIcons } from "$lib/icons";
	import type { Skill } from "$lib/data/seed";

	export let skills: Skill[];

	const categoryLabels: Record<string, string> = {
		backend: "Backend",
		frontend: "Frontend",
		devops: "DevOps / Infra",
		tools: "Tools & AI",
		gamedev: "Game Dev",
	};

	const categoryOrder = ["backend", "frontend", "devops", "tools", "gamedev"];

	$: grouped = categoryOrder
		.map((cat) => ({
			category: cat,
			label: categoryLabels[cat],
			items: skills.filter((s) => s.category === cat),
		}))
		.filter((g) => g.items.length > 0);
</script>

<section id="skills" class="section-pad">
	<div use:fadeIn class="section-inner">
		<h2 class="section-heading">Skills</h2>

		<div
			style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;"
			class="skills-grid"
		>
			{#each grouped as group}
				<div class="skill-group">
					<h3 class="mono-label" style="margin-bottom: 16px;">{group.label}</h3>
					<div
						class="skill-pills"
						style="display: flex; flex-wrap: wrap; gap: 8px;"
					>
						{#each group.items as skill}
							{@const icon = skill.icon ? skillIcons[skill.icon] : undefined}
							<svelte:element
								this={skill.link ? "a" : "span"}
								href={skill.link ?? undefined}
								target={skill.link ? "_blank" : undefined}
								rel={skill.link ? "noopener noreferrer" : undefined}
								class="skill-pill"
								use:mouseGlow
							>
								{#if icon}
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
										style="flex-shrink: 0; vertical-align: middle; margin-bottom: 1px;"
									>
										<path d={icon.path} />
									</svg>
								{/if}
								{skill.name}
							</svelte:element>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skill-pill {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		background: rgba(255, 255, 255, 0.02);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 6px 12px;
		border: 1px solid #2a2a2a;
		color: #f0ede8;
		border-radius: 2px;
		cursor: default;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		position: relative;
		overflow: hidden;
	}

	.skill-pill::after {
		content: "";
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle 40px at var(--gx, 50%) var(--gy, 50%),
			rgba(255, 255, 255, 0.25) 0%,
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
	}

	.skill-pill:hover {
		border-color: #5a84e7;
		background: #5a84e7;
		color: #0d0d0d;
		box-shadow:
			0 0 14px rgba(90, 132, 231, 0.5),
			0 0 28px rgba(90, 132, 231, 0.2);
	}

	.skill-pill:hover::after {
		opacity: 1;
	}

	@media (max-width: 639px) {
		.skills-grid {
			grid-template-columns: 1fr !important;
		}

		.skill-group {
			text-align: center;
		}

		.skill-pills {
			justify-content: center;
		}
	}
</style>
