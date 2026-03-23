import { requireAdmin } from "@/lib/auth";
import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { parseJsonBody, parsePageParam, parseSizeParam, validateBody } from "@/lib/request";
import { categorySchema } from "@/lib/schemas";
import { createCategory, getAdminCategories } from "@/lib/services/category-service";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function GET(request) {
    return withErrorHandling(request, async () => {
        await requireAdmin(request);
        const searchParams = request.nextUrl.searchParams;
        const page = parsePageParam(searchParams.get("page"), 0);
        const size = parseSizeParam(searchParams.get("size"), 10);
        const search = searchParams.get("search") ?? "";
        const isActive = searchParams.get("isActive") ?? "";
        const data = await getAdminCategories({
            page,
            size,
            search,
            isActive,
        });
        return ok(request, data);
    });
}

export async function POST(request) {
    return withErrorHandling(request, async () => {
        const user = await requireAdmin(request);
        const body = await parseJsonBody(request);
        const input = validateBody(categorySchema, body);
        const category = await createCategory(user.id, input);
        return ok(request, category, "Category created successfully", 201);
    });
}
