import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<div>
			<h1 className="font-bold text-3xl underline">Hello World!</h1>
		</div>
	);
}
