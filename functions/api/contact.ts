interface ContactBody {
	name: string;
	email: string;
	message: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
	let body: ContactBody;

	try {
		body = await context.request.json<ContactBody>();
	} catch {
		return Response.json({ error: 'Invalid request body' }, { status: 400 });
	}

	const { name, email, message } = body;

	if (!name?.trim() || !email?.trim() || !message?.trim()) {
		return Response.json({ error: 'All fields are required' }, { status: 400 });
	}

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: 'Portfolio Contact <contact@javiergonzalez.dev>',
			to: 'javier@javiergonzalez.dev',
			reply_to: email,
			subject: `Portfolio Contact: ${name}`,
			text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
		}),
	});

	if (!res.ok) {
		const err = await res.text();
		console.error('Resend error:', err);
		return Response.json({ error: 'Failed to send message' }, { status: 500 });
	}

	return Response.json({ ok: true });
};
