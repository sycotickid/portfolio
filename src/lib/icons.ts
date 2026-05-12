import {
	siGithub,
	siPhp,
	siLaravel,
	siDotnet,
	siGo,
	siNodedotjs,
	siSpringboot,
	siMysql,
	siPostgresql,
	siSqlite,
	siReact,
	siSvelte,
	siAngular,
	siTailwindcss,
	siWordpress,
	siDocker,
	siKubernetes,
	siFigma,
	siUnrealengine,
	siClaude
} from 'simple-icons';

export type SI = { path: string; hex: string; title: string };

export const brandIcons = {
	github: siGithub
} satisfies Record<string, SI>;

export const skillIcons: Record<string, SI> = {
	php:          siPhp,
	dotnet:       siDotnet,
	go:           siGo,
	nodedotjs:    siNodedotjs,
	springboot:   siSpringboot,
	mysql:        siMysql,
	postgresql:   siPostgresql,
	sqlite:       siSqlite,
	react:        siReact,
	svelte:       siSvelte,
	angular:      siAngular,
	tailwindcss:  siTailwindcss,
	wordpress:    siWordpress,
	docker:       siDocker,
	kubernetes:   siKubernetes,
	figma:        siFigma,
	unrealengine: siUnrealengine,
	claude:       siClaude
};
