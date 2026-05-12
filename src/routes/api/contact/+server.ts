import { json } from "@sveltejs/kit";
import { Resend } from "resend";
import type { RequestHandler } from "./$types";

export const prerender = false;

export const POST: RequestHandler = async ({ request, platform }) => {
	const env = platform?.env as { RESEND_API_KEY?: string } | undefined;
	const apiKey = env?.RESEND_API_KEY;

	if (!apiKey) {
		return json({ error: "Mail service not configured." }, { status: 500 });
	}

	const { name, email, message } = await request.json();

	if (!name || !email || !message) {
		return json({ error: "All fields are required." }, { status: 400 });
	}

	const resend = new Resend(apiKey);

	const { error } = await resend.emails.send({
		from: "Portfolio <portfolio@contact.javiergonzalez.dev>",
		to: "javier@javiergonzalez.dev",
		replyTo: email,
		subject: `Portfolio message from ${name}`,
		text: `From: ${name} <${email}>\n\n${message}`,
	});

	if (error) {
		return json(
			{ error: "Failed to send message." + error.message },
			{ status: 500 },
		);
	}

	return json({ ok: true });
};
