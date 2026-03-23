import { requireAuth } from "@/lib/auth";
import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { parseJsonBody, validateBody } from "@/lib/request";
import { reviewSchema } from "@/lib/schemas";
import { upsertMyReview } from "@/lib/services/review-service";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function POST(request) {
    return withErrorHandling(request, async () => {
        const user = await requireAuth(request);
        const body = await parseJsonBody(request);
        const input = validateBody(reviewSchema, body);
        const result = await upsertMyReview(user, input);
        const message = result.created ? "Review created successfully" : "Review updated successfully";
        return ok(request, result.review, message, result.created ? 201 : 200);
    });
}
