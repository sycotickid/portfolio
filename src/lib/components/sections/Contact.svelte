<script lang="ts">
	import { fadeIn } from "$lib/actions/fadeIn";
	import { mouseGlow } from "$lib/actions/mouseGlow";

	let name = "";
	let email = "";
	let message = "";
	let status: "idle" | "sending" | "sent" | "error" = "idle";
	let errorMsg = "";

	const currentYear = new Date().getFullYear();

	async function send(e: Event) {
		e.preventDefault();
		status = "sending";
		errorMsg = "";

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			});

			if (res.ok) {
				status = "sent";
				name = "";
				email = "";
				message = "";
			} else {
				const data = await res.json().catch(() => ({}));
				errorMsg = data.error ?? "Something went wrong. Please try again.";
				status = "error";
			}
		} catch {
			errorMsg = "Network error. Please try again.";
			status = "error";
		}
	}

	function focusIn(e: FocusEvent) {
		(e.currentTarget as HTMLElement).style.borderColor = "#5a84e7";
	}
	function focusOut(e: FocusEvent) {
		(e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
	}
</script>

<section id="contact" class="section-pad" style="padding-bottom: 0;">
	<div use:fadeIn class="section-inner">
		<h2 class="section-heading" style="margin-bottom: 8px; text-align: center;">
			Let's work together.
		</h2>
		<p class="mono-meta" style="text-align: center; margin-bottom: 48px;">
			Send a message or reach out at <a
				href="mailto:javier@javiergonzalez.dev"
				style="color: #5a84e7; text-decoration: none;"
				>javier@javiergonzalez.dev</a
			>
		</p>

		{#if status === "sent"}
			<p
				class="mono-meta"
				style="text-align: center; color: #5a84e7; font-size: 0.8rem;"
			>
				Message sent. I'll be in touch.
			</p>
		{:else}
			<form
				onsubmit={send}
				style="max-width: min(320px, 100%); margin: 0 auto; display: flex; flex-direction: column; gap: 20px;"
			>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<label for="c-name" class="mono-label">Name</label>
					<input
						id="c-name"
						type="text"
						bind:value={name}
						required
						disabled={status === "sending"}
						class="form-input"
						onfocus={focusIn}
						onblur={focusOut}
					/>
				</div>

				<div style="display: flex; flex-direction: column; gap: 6px;">
					<label for="c-email" class="mono-label">Email</label>
					<input
						id="c-email"
						type="email"
						bind:value={email}
						required
						disabled={status === "sending"}
						class="form-input"
						onfocus={focusIn}
						onblur={focusOut}
					/>
				</div>

				<div style="display: flex; flex-direction: column; gap: 6px;">
					<label for="c-msg" class="mono-label">Message</label>
					<textarea
						id="c-msg"
						bind:value={message}
						required
						rows="4"
						disabled={status === "sending"}
						class="form-input"
						style="resize: none;"
						onfocus={focusIn}
						onblur={focusOut}
					></textarea>
				</div>

				{#if status === "error"}
					<p
						class="mono-meta"
						style="color: #e07070; font-size: 0.7rem; margin: 0;"
					>
						{errorMsg}
					</p>
				{/if}

				<button
					type="submit"
					disabled={status === "sending"}
					class="submit-btn"
					use:mouseGlow
				>
					{status === "sending" ? "Sending…" : "Send Message →"}
				</button>
			</form>
		{/if}
	</div>

	<footer
		style="margin-top: 64px; padding: 24px; border-top: 1px solid #1a1a1a; text-align: center;"
	>
		<p class="mono-meta" style="font-size: 0.7rem;">
			Built with Svelte + SQLite · © {currentYear} Javier Gonzalez · Ad majorem
			Dei gloriam
		</p>
	</footer>
</section>

<style>
	.form-input {
		width: 100%;
		background: #111;
		border: 1px solid #2a2a2a;
		color: #f0ede8;
		padding: 10px 12px;
		font-family: "JetBrains Mono", monospace;
		font-size: 0.8rem;
		outline: none;
		transition: border-color 0.2s;
		box-sizing: border-box;
	}

	.form-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.submit-btn {
		width: 100%;
		border: 1px solid #5a84e7;
		color: #5a84e7;
		background: transparent;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		font-family: "JetBrains Mono", monospace;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		overflow: hidden;
	}

	.submit-btn::after {
		content: "";
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle 80px at var(--gx, 50%) var(--gy, 50%),
			rgba(255, 255, 255, 0.18) 0%,
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
	}

	.submit-btn:not(:disabled):hover {
		background: #5a84e7;
		color: #0d0d0d;
		box-shadow:
			0 0 20px rgba(90, 132, 231, 0.55),
			0 0 40px rgba(90, 132, 231, 0.2);
	}

	.submit-btn:not(:disabled):hover::after {
		opacity: 1;
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
