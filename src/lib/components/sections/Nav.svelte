<script lang="ts">
	import { onMount } from "svelte";

	let activeSection = "";
	let mobileOpen = false;

	function handleDocClick(e: MouseEvent) {
		if (!mobileOpen) return;
		const header = document.querySelector("header");
		if (header && !header.contains(e.target as Node)) {
			mobileOpen = false;
		}
	}

	const links = [
		{ href: "#about", label: "About" },
		{ href: "#skills", label: "Skills" },
		// { href: "#projects", label: "Projects" },
		{ href: "#experience", label: "Experience" },
		{ href: "#education", label: "Education" },
		{ href: "#contact", label: "Contact" },
	];

	onMount(() => {
		const sections = [
			document.querySelector("#hero"),
			...links.map((l) => document.querySelector(l.href)),
		].filter(Boolean) as Element[];

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = "#" + entry.target.id;
					}
				}
			},
			{ rootMargin: "-40% 0px -55% 0px" },
		);

		sections.forEach((s) => observer.observe(s));

		document.addEventListener("click", handleDocClick);
		return () => {
			observer.disconnect();
			document.removeEventListener("click", handleDocClick);
		};
	});
</script>

<header
	style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; height: 56px;
	       background: rgba(13,13,13,0.85); backdrop-filter: blur(12px);
	       border-bottom: 1px solid #1a1a1a;"
>
	<nav
		style="max-width: 1100px; margin: 0 auto; height: 100%; padding: 0 24px;
		       display: flex; align-items: center; justify-content: space-between;"
	>
		<a
			href="#hero"
			style="font-family: 'Playfair Display', Georgia, serif; color: #f0ede8;
			       font-size: 1.1rem; text-decoration: none; letter-spacing: -0.02em;
			       transition: color 0.2s;"
			onmouseenter={(e) => (e.currentTarget.style.color = "#5a84e7")}
			onmouseleave={(e) => (e.currentTarget.style.color = "#f0ede8")}
		>
			Javier Gonzalez
		</a>

		<ul
			class="nav-links"
			style="display: flex; align-items: center; gap: 32px; list-style: none; margin: 0; padding: 0;"
		>
			{#each links as link}
				<li>
					<a
						href={link.href}
						style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
						       text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none;
						       position: relative; padding-bottom: 4px; transition: color 0.2s;
						       color: {activeSection === link.href ? '#5a84e7' : '#888580'};"
					>
						{link.label}
						{#if activeSection === link.href}
							<span
								style="position: absolute; bottom: -2px; left: 0; right: 0;
								       height: 1px; background: #5a84e7;"
							></span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>

		<button
			class="hamburger"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
			style="background: none; border: none; cursor: pointer; padding: 8px;
			       display: none; flex-direction: column; gap: 5px;"
		>
			<span
				style="display: block; width: 20px; height: 1px; background: #f0ede8;
				       transition: transform 0.2s; transform: {mobileOpen
					? 'rotate(45deg) translate(4px, 4px)'
					: 'none'};"
			></span>
			<span
				style="display: block; width: 20px; height: 1px; background: #f0ede8;
				       transition: opacity 0.2s; opacity: {mobileOpen ? 0 : 1};"
			></span>
			<span
				style="display: block; width: 20px; height: 1px; background: #f0ede8;
				       transition: transform 0.2s; transform: {mobileOpen
					? 'rotate(-45deg) translate(4px, -4px)'
					: 'none'};"
			></span>
		</button>
	</nav>

	{#if mobileOpen}
		<div
			style="border-top: 1px solid #1a1a1a; background: #0d0d0d; padding: 16px 24px;"
			class="mobile-menu"
		>
			<ul
				style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 16px;"
			>
				{#each links as link}
					<li>
						<a
							href={link.href}
							onclick={() => (mobileOpen = false)}
							style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
							       text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none;
							       color: {activeSection === link.href ? '#5a84e7' : '#888580'};"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</header>

<style>
	@media (max-width: 767px) {
		.nav-links {
			display: none !important;
		}
		.hamburger {
			display: flex !important;
		}
	}
</style>
