import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { parsePageParam, parseSizeParam } from "@/lib/request";
import { getCoursePublishedReviews } from "@/lib/services/review-service";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function GET(request, context) {
    return withErrorHandling(request, async () => {
        const { courseId } = await context.params;
        const searchParams = request.nextUrl.searchParams;
        const page = parsePageParam(searchParams.get("page"), 0);
        const size = parseSizeParam(searchParams.get("size"), 10);
        const data = await getCoursePublishedReviews(courseId, { page, size });
        return ok(request, data);
    });
}
