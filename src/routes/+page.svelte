<script lang="ts">
	import { onMount } from "svelte";
	import {
		initDB,
		getProfile,
		getExperience,
		getSkills,
		getEducation,
		getProjects,
	} from "$lib/db";
	import {
		profileData,
		experienceData,
		skillsData,
		educationData,
		projectsData,
	} from "$lib/data/seed";
	import type {
		Profile,
		Experience,
		Skill,
		Education,
		Project,
	} from "$lib/data/seed";

	import Nav from "$lib/components/sections/Nav.svelte";
	import Starfield from "$lib/components/internal/Starfield.svelte";
	import Hero from "$lib/components/sections/Hero.svelte";
	import About from "$lib/components/sections/About.svelte";
	import Skills from "$lib/components/sections/Skills.svelte";
	import ExperienceSection from "$lib/components/sections/Experience.svelte";
	import EducationSection from "$lib/components/sections/Education.svelte";
	import ProjectsSection from "$lib/components/sections/Projects.svelte";
	import Contact from "$lib/components/sections/Contact.svelte";

	let profile: Profile = profileData;
	let experiences: Experience[] = experienceData;
	let skills: Skill[] = skillsData;
	let education: Education[] = educationData;
	let projects: Project[] = projectsData;

	let showScrollTop = false;
	let imgMouseX = 0;
	let imgSmoothX = 0;
	let isTouchDevice = false;

	$: jsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		name: profile.name,
		jobTitle: profile.title,
		email: profile.email,
		url: "https://javiergonzalez.dev",
		sameAs: [profile.linkedin, "https://github.com/sycotickid"],
	});

	$: footerTransform = isTouchDevice
		? "translateX(-50%) scale(10)"
		: `translateX(calc(-50% + ${imgSmoothX * -1}vw))`;

	onMount(() => {
		initDB().then(() => {
			profile = getProfile();
			experiences = getExperience();
			skills = getSkills();
			education = getEducation();
			projects = getProjects();
		});

		isTouchDevice = "ontouchstart" in window;

		const onScroll = () => {
			showScrollTop = window.scrollY > window.innerHeight * 0.8;
		};
		window.addEventListener("scroll", onScroll, { passive: true });

		let mouseMoveHandler: ((e: MouseEvent) => void) | undefined;
		let raf: number | undefined;

		if (!isTouchDevice) {
			mouseMoveHandler = (e: MouseEvent) => {
				imgMouseX = (e.clientX / window.innerWidth) * 2 - 1;
			};
			window.addEventListener("mousemove", mouseMoveHandler, { passive: true });

			const tick = () => {
				imgSmoothX += (imgMouseX - imgSmoothX) * 0.06;
				raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
		}

		return () => {
			window.removeEventListener("scroll", onScroll);
			if (mouseMoveHandler)
				window.removeEventListener("mousemove", mouseMoveHandler);
			if (raf !== undefined) cancelAnimationFrame(raf);
		};
	});

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<svelte:head>
	<title>{profile.name} — {profile.title}</title>
	<meta name="description" content={profile.summary} />
	<meta property="og:title" content="{profile.name} — {profile.title}" />
	<meta property="og:description" content={profile.summary} />
	<meta property="og:type" content="website" />
	<meta name="robots" content="index, follow" />
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<Starfield />

<Nav />

<main style="position: relative; z-index: 1; overflow-x: clip;">
	<Hero
		name={profile.name}
		title={profile.title}
		email={profile.email}
		linkedin={profile.linkedin}
	/>
	<About summary={profile.summary} />
	<Skills {skills} />
	<!-- <ProjectsSection {projects} /> -->
	<ExperienceSection {experiences} />
	<EducationSection {education} />
	<Contact />

	<img
		src="/footer.png"
		alt=""
		aria-hidden="true"
		style="position: absolute; bottom: 0; left: 50%;
		       width: 105vw; max-width: none; height: auto;
		       display: block; pointer-events: none; z-index: -1;
		       transform-origin: center bottom;
		       transform: {footerTransform};"
	/>
</main>

{#if showScrollTop}
	<button
		onclick={scrollTop}
		aria-label="Scroll to top"
		style="position: fixed; bottom: calc(32px + env(safe-area-inset-bottom, 0px)); right: 32px; z-index: 40;
		       width: 40px; height: 40px; border: 1px solid #2a2a2a;
		       background: rgba(13,13,13,0.9); color: #888580; cursor: pointer;
		       display: flex; align-items: center; justify-content: center;
		       transition: all 0.2s; backdrop-filter: blur(4px);"
		onmouseenter={(e) => {
			(e.currentTarget as HTMLElement).style.borderColor = "#5a84e7";
			(e.currentTarget as HTMLElement).style.color = "#5a84e7";
		}}
		onmouseleave={(e) => {
			(e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
			(e.currentTarget as HTMLElement).style.color = "#888580";
		}}
	>
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<polyline points="18 15 12 9 6 15" />
		</svg>
	</button>
{/if}
