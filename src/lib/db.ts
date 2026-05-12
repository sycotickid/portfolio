import { profileData, experienceData, educationData, skillsData } from './data/seed';
import type { Profile, Experience, Education, Skill } from './data/seed';

let db: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

export async function initDB(): Promise<void> {
	try {
		const { default: initSqlJs } = await import('sql.js');
		const SQL = await initSqlJs({ locateFile: (file: string) => `/${file}` });
		db = new SQL.Database();
		createTables();
		seedDB();
	} catch (e) {
		console.warn('sql.js WASM unavailable, using fallback data', e);
		db = null;
	}
}

function createTables() {
	if (!db) return;
	db.run(`
		CREATE TABLE IF NOT EXISTS profile (
			id INTEGER PRIMARY KEY, name TEXT, title TEXT,
			summary TEXT, email TEXT, linkedin TEXT, phone TEXT
		);
		CREATE TABLE IF NOT EXISTS experience (
			id INTEGER PRIMARY KEY, company TEXT, title TEXT,
			location TEXT, start_date TEXT, end_date TEXT, description TEXT
		);
		CREATE TABLE IF NOT EXISTS education (
			id INTEGER PRIMARY KEY, degree TEXT, institution TEXT, year INTEGER
		);
		CREATE TABLE IF NOT EXISTS skill (
			id INTEGER PRIMARY KEY, name TEXT, category TEXT, icon TEXT
		);
	`);
}

function seedDB() {
	if (!db) return;
	db.run('INSERT OR IGNORE INTO profile VALUES (?,?,?,?,?,?,?)', [
		profileData.id,
		profileData.name,
		profileData.title,
		profileData.summary,
		profileData.email,
		profileData.linkedin,
		profileData.phone
	]);
	for (const e of experienceData) {
		db.run('INSERT OR IGNORE INTO experience VALUES (?,?,?,?,?,?,?)', [
			e.id, e.company, e.title, e.location, e.start_date, e.end_date, e.description
		]);
	}
	for (const e of educationData) {
		db.run('INSERT OR IGNORE INTO education VALUES (?,?,?,?)', [
			e.id, e.degree, e.institution, e.year
		]);
	}
	for (const s of skillsData) {
		db.run('INSERT OR IGNORE INTO skill VALUES (?,?,?,?)', [s.id, s.name, s.category, s.icon ?? null]);
	}
}

export function getProfile(): Profile {
	if (db) {
		const res = db.exec('SELECT * FROM profile LIMIT 1');
		if (res.length && res[0].values.length) {
			const [id, name, title, summary, email, linkedin, phone] = res[0].values[0];
			return { id, name, title, summary, email, linkedin, phone } as Profile;
		}
	}
	return profileData;
}

export function getExperience(): Experience[] {
	if (db) {
		const res = db.exec('SELECT * FROM experience ORDER BY id');
		if (res.length) {
			return res[0].values.map(
				([id, company, title, location, start_date, end_date, description]: unknown[]) =>
					({ id, company, title, location, start_date, end_date, description }) as Experience
			);
		}
	}
	return experienceData;
}

export function getEducation(): Education[] {
	if (db) {
		const res = db.exec('SELECT * FROM education ORDER BY id');
		if (res.length) {
			return res[0].values.map(
				([id, degree, institution, year]: unknown[]) =>
					({ id, degree, institution, year }) as Education
			);
		}
	}
	return educationData;
}

export function getSkills(): Skill[] {
	if (db) {
		const res = db.exec('SELECT * FROM skill ORDER BY category, id');
		if (res.length) {
			return res[0].values.map(
				([id, name, category, icon]: unknown[]) =>
					({ id, name, category, icon: icon ?? undefined }) as Skill
			);
		}
	}
	return skillsData;
}
