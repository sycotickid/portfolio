import {
	profileData,
	experienceData,
	educationData,
	skillsData,
	projectsData,
} from "./data/seed";
import type { Profile, Experience, Education, Skill, Project } from "./data/seed";

let db: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

export async function initDB(): Promise<void> {
	try {
		const { default: initSqlJs } = await import("sql.js");
		const SQL = await initSqlJs({ locateFile: (file: string) => `/${file}` });
		db = new SQL.Database();
		createTables();
		seedDB();
	} catch (e) {
		console.warn("sql.js WASM unavailable, using fallback data", e);
		db = null;
	}
}

function createTables() {
	if (!db) return;
	db.run(`
		CREATE TABLE IF NOT EXISTS profile (
			id INTEGER PRIMARY KEY, name TEXT, title TEXT,
			summary TEXT, email TEXT, linkedin TEXT
		);
		CREATE TABLE IF NOT EXISTS experience (
			id INTEGER PRIMARY KEY, company TEXT, title TEXT,
			location TEXT, start_date TEXT, end_date TEXT, description TEXT, link TEXT
		);
		CREATE TABLE IF NOT EXISTS education (
			id INTEGER PRIMARY KEY, degree TEXT, institution TEXT, year INTEGER, link TEXT
		);
		CREATE TABLE IF NOT EXISTS skill (
			id INTEGER PRIMARY KEY, name TEXT, category TEXT, icon TEXT, link TEXT
		);
		CREATE TABLE IF NOT EXISTS project (
			id INTEGER PRIMARY KEY, title TEXT, description TEXT,
			thumbnail TEXT, link TEXT, tech TEXT
		);
	`);
}

function seedDB() {
	if (!db) return;
	db.run("INSERT OR IGNORE INTO profile VALUES (?,?,?,?,?,?,?)", [
		profileData.id,
		profileData.name,
		profileData.title,
		profileData.summary,
		profileData.email,
		profileData.linkedin,
	]);
	for (const e of experienceData) {
		db.run("INSERT OR IGNORE INTO experience VALUES (?,?,?,?,?,?,?,?)", [
			e.id,
			e.company,
			e.title,
			e.location,
			e.start_date,
			e.end_date,
			e.description,
			e.link ?? null,
		]);
	}
	for (const e of educationData) {
		db.run("INSERT OR IGNORE INTO education VALUES (?,?,?,?,?)", [
			e.id,
			e.degree,
			e.institution,
			e.year,
			e.link ?? null,
		]);
	}
	for (const s of skillsData) {
		db.run("INSERT OR IGNORE INTO skill VALUES (?,?,?,?,?)", [
			s.id,
			s.name,
			s.category,
			s.icon ?? null,
			s.link ?? null,
		]);
	}
	for (const p of projectsData) {
		db.run("INSERT OR IGNORE INTO project VALUES (?,?,?,?,?,?)", [
			p.id,
			p.title,
			p.description,
			p.thumbnail ?? null,
			p.link ?? null,
			JSON.stringify(p.tech),
		]);
	}
}

export function getProfile(): Profile {
	if (db) {
		const res = db.exec("SELECT * FROM profile LIMIT 1");
		if (res.length && res[0].values.length) {
			const [id, name, title, summary, email, linkedin] = res[0].values[0];
			return { id, name, title, summary, email, linkedin } as Profile;
		}
	}
	return profileData;
}

export function getExperience(): Experience[] {
	if (db) {
		const res = db.exec("SELECT * FROM experience ORDER BY id");
		if (res.length) {
			return res[0].values.map(
				([id, company, title, location, start_date, end_date, description, link]: unknown[]) =>
					({
						id,
						company,
						title,
						location,
						start_date,
						end_date,
						description,
						link: link ?? undefined,
					}) as Experience,
			);
		}
	}
	return experienceData;
}

export function getEducation(): Education[] {
	if (db) {
		const res = db.exec("SELECT * FROM education ORDER BY id");
		if (res.length) {
			return res[0].values.map(
				([id, degree, institution, year, link]: unknown[]) =>
					({ id, degree, institution, year, link: link ?? undefined }) as Education,
			);
		}
	}
	return educationData;
}

export function getSkills(): Skill[] {
	if (db) {
		const res = db.exec("SELECT * FROM skill ORDER BY category, id");
		if (res.length) {
			return res[0].values.map(
				([id, name, category, icon, link]: unknown[]) =>
					({ id, name, category, icon: icon ?? undefined, link: link ?? undefined }) as Skill,
			);
		}
	}
	return skillsData;
}

export function getProjects(): Project[] {
	if (db) {
		const res = db.exec("SELECT * FROM project ORDER BY id");
		if (res.length) {
			return res[0].values.map(
				([id, title, description, thumbnail, link, tech]: unknown[]) =>
					({
						id,
						title,
						description,
						thumbnail: thumbnail ?? undefined,
						link: link ?? undefined,
						tech: JSON.parse(tech as string),
					}) as Project,
			);
		}
	}
	return projectsData;
}
