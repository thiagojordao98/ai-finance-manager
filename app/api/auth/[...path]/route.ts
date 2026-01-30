type AuthRouteContext = {
	params: {
		path: string[];
	};
};

async function getAuthHandlers() {
	const { authApiHandler } = await import("@neondatabase/auth/next/server");
	return authApiHandler();
}

export async function GET(request: Request, context: AuthRouteContext) {
	const { GET } = await getAuthHandlers();
	return GET(request, context as any);
}

export async function POST(request: Request, context: AuthRouteContext) {
	const { POST } = await getAuthHandlers();
	return POST(request, context as any);
}
