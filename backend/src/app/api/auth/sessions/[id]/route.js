import { requireAuth } from "@/lib/auth";
import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { revokeMySessionById } from "@/lib/services/user-session-service";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function DELETE(request, context) {
    return withErrorHandling(request, async () => {
        const user = await requireAuth(request);
        const { id } = await context.params;
        const session = await revokeMySessionById(user.id, id);
        return ok(request, session, "Session revoked successfully");
    });
}
