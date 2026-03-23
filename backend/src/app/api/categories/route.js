import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { getActiveCategories } from "@/lib/services/category-service";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function GET(request) {
    return withErrorHandling(request, async () => {
        const categories = await getActiveCategories();
        return ok(request, categories);
    });
}
