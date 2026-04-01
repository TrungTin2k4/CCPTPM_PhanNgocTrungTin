import { requireAuth } from "@/lib/auth";
import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { parsePageParam, parseSizeParam } from "@/lib/request";
import { listMySessions, revokeAllUserSessions } from "@/lib/services/user-session-service";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function GET(request) {
    return withErrorHandling(request, async () => {
        const user = await requireAuth(request);
        const searchParams = request.nextUrl.searchParams;
        const page = parsePageParam(searchParams.get("page"), 0);
        const size = parseSizeParam(searchParams.get("size"), 10);
        const sessions = await listMySessions(user.id, {
            page,
            size,
        });
        return ok(request, sessions);
    });
}

export async function DELETE(request) {
    return withErrorHandling(request, async () => {
        const user = await requireAuth(request);
        await revokeAllUserSessions(user.id, "Revoked by user");
        return ok(request, null, "All sessions revoked successfully");
    });
}
