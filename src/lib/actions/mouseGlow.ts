export function mouseGlow(node: HTMLElement) {
	function onMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--gx', `${e.clientX - rect.left}px`);
		node.style.setProperty('--gy', `${e.clientY - rect.top}px`);
		node.style.setProperty('--tx', `${e.clientX - rect.left - rect.width / 2}px`);
		node.style.setProperty('--ty', `${e.clientY - rect.top - rect.height / 2}px`);
	}

	node.addEventListener('mousemove', onMove);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
		}
	};
}
