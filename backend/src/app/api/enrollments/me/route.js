import { requireAuth } from "@/lib/auth";
import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { parsePageParam, parseSizeParam } from "@/lib/request";
import { getMyEnrollments } from "@/lib/services/enrollment-service";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function GET(request) {
    return withErrorHandling(request, async () => {
        const user = await requireAuth(request);
        const searchParams = request.nextUrl.searchParams;
        const page = parsePageParam(searchParams.get("page"), 0);
        const size = parseSizeParam(searchParams.get("size"), 10);
        const status = searchParams.get("status") ?? "";
        const data = await getMyEnrollments(user.id, {
            page,
            size,
            status,
        });
        return ok(request, data);
    });
}
