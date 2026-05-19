export interface Profile {
	id: number;
	name: string;
	title: string;
	summary: string;
	email: string;
	linkedin: string;
}

export interface Experience {
	id: number;
	company: string;
	title: string;
	location: string;
	start_date: string;
	end_date: string;
	description: string;
	link?: string;
}

export interface Education {
	id: number;
	degree: string;
	institution: string;
	year: number;
	link?: string;
}

export interface Skill {
	id: number;
	name: string;
	category: string;
	icon?: string;
	link?: string;
}

export interface Project {
	id: number;
	title: string;
	description: string;
	thumbnail?: string;
	link?: string;
	tech: string[];
}

export const profileData: Profile = {
	id: 1,
	name: "Javier Gonzalez",
	title: "Senior Software Engineer",
	summary:
		'🖥️ I am a full-stack engineer - Miami born, Dallas based - and I have been developing software for over ten years. I specialize in building and refactoring enterprise systems with modern tech stacks. There is something in every part of the "stack" that I enjoy: creating sleek and intuitive front-ends, architecting robust and clean back-ends, designing a data layer that almost sings with simplicity. ✨Recently I have enjoyed using AI tools to accelerate my development and explore things I haven\'t been able to before.\n🕹️ I enjoy spending my free-time as a hobby game developer, combining my technical skills with my interest in the arts, not to mention my love for video games themselves.',
	email: "javier@javiergonzalez.dev",
	linkedin: "https://linkedin.com/in/javiergonzalezdev",
};

export const experienceData: Experience[] = [
	{
		id: 1,
		company: "Paycom",
		title: "Senior Software Engineer",
		location: "Grapevine, TX",
		start_date: "Mar 2022",
		end_date: "May 2026",
		description:
			"Delivered full-stack features across internal tools and customer-facing applications for a payroll platform serving over 6M employees globally, working within a cross-functional team of 7 engineers.|Drove ground-up rewrites of 3-5 major front-end applications, migrating legacy codebases to modern React/TypeScript and redesigning their APIs and data models, reducing technical debt and improving maintainability across the platform.|Contributed front-end engineering to Paycom International, helping deliver localized product experiences across 4 international markets as part of the company's global expansion initiative.|Adopted OpenCode with Kimi v2.6 to accelerate development workflows, leveraging agentic AI to scaffold, refactor, and ship production features with significantly reduced cycle time.",
	},
	{
		id: 2,
		company: "Word on Fire Catholic Ministries",
		title: "Contract Software Engineer",
		location: "Irving, TX",
		start_date: "Oct 2021",
		end_date: "Jul 2024",
		description:
			"Built and shipped new feature pages for wordonfire.org using WordPress.|Developed features for the internal web application in Laravel and React.|Designed large-scale internal dashboard sections with Laravel Filament and Tailwind CSS.",
	},
	{
		id: 3,
		company: "Revature",
		title: "Full-Stack Software Engineer",
		location: "Remote",
		start_date: "Nov 2020",
		end_date: "Feb 2022",
		description:
			"Built and delivered full-stack client applications using Spring Boot and Angular.|Led teams through greenfield application development and live client presentations.",
	},
	{
		id: 4,
		company: "Drive Studio",
		title: "Unreal Developer",
		location: "Vista, CA",
		start_date: "Apr 2019",
		end_date: "Oct 2020",
		description:
			"Created photorealistic virtual sets for major global sporting events broadcast to millions.|Authored versatile HLSL material shaders deployed across all studio environments.|Redesigned production delivery workflows, significantly reducing asset turnaround time by 30%.",
	},
	{
		id: 5,
		company: "PantherSoft @ FIU",
		title: "Front-End Developer",
		location: "Miami, FL",
		start_date: "Oct 2014",
		end_date: "Sep 2015",
		description:
			"Designed and built UI for internal university web applications and form systems.|Reduced page latency and resolved critical bugs in legacy codebases.",
	},
];

export const educationData: Education[] = [
	{
		id: 1,
		degree: "B.S. Computer Science",
		institution: "Florida International University",
		year: 2015,
	},
	{
		id: 2,
		degree: "B.S. Game Art and Design",
		institution: "John Paul the Great Catholic University",
		year: 2018,
	},
];

export const skillsData: Skill[] = [
	{ id: 1, name: "PHP / Laravel", category: "backend", icon: "php" },
	{ id: 2, name: ".NET / C#", category: "backend", icon: "dotnet" },
	{ id: 3, name: "Golang", category: "backend", icon: "go" },
	{ id: 4, name: "Node.js", category: "backend", icon: "nodedotjs" },
	{ id: 5, name: "Spring Boot", category: "backend", icon: "springboot" },
	{ id: 6, name: "MySQL", category: "backend", icon: "mysql" },
	{ id: 7, name: "PostgreSQL", category: "backend", icon: "postgresql" },
	{ id: 8, name: "SQLite", category: "backend", icon: "sqlite" },
	{ id: 9, name: "Typescript", category: "frontend", icon: "typescript" },
	{ id: 10, name: "React", category: "frontend", icon: "react" },
	{ id: 11, name: "Svelte", category: "frontend", icon: "svelte" },
	{ id: 12, name: "Angular", category: "frontend", icon: "angular" },
	{ id: 13, name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
	{ id: 14, name: "WordPress", category: "frontend", icon: "wordpress" },
	{ id: 15, name: "Docker", category: "devops", icon: "docker" },
	{ id: 16, name: "Kubernetes", category: "devops", icon: "kubernetes" },
	{ id: 17, name: "REST API Design", category: "devops" },
	{ id: 18, name: "Claude Code / OpenCode", category: "tools", icon: "claude" },
	{ id: 19, name: "Datastar", category: "frontend", icon: "datastar" },
	{ id: 20, name: "Figma", category: "tools", icon: "figma" },
	{ id: 21, name: "Unreal Engine", category: "gamedev", icon: "unrealengine" },
	{ id: 22, name: "Godot", category: "gamedev", icon: "godot" },
	{ id: 23, name: "Blender", category: "gamedev", icon: "blender" },
];

export const projectsData: Project[] = [
	{
		id: 1,
		title: "Dungeon Crawler",
		description:
			"A procedurally generated dungeon crawler with hand-crafted pixel art assets and emergent gameplay systems.",
		tech: ["godot", "blender"],
	},
	{
		id: 2,
		title: "Dev Portfolio",
		description:
			"This portfolio — SvelteKit with an in-browser SQLite database powered by sql.js WASM.",
		tech: ["svelte", "typescript"],
	},
	{
		id: 3,
		title: "Inventory API",
		description:
			"RESTful inventory management service with JWT auth, built on Go with PostgreSQL and containerized via Docker.",
		tech: ["go", "postgresql", "docker"],
	},
];
