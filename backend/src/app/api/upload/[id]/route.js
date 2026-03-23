import { requireAuth } from "@/lib/auth";
import { corsPreflight } from "@/lib/cors";
import { ok, withErrorHandling } from "@/lib/http";
import { deleteMediaAssetById } from "@/lib/services/media-service";

export const runtime = "nodejs";

export async function OPTIONS(request) {
    return corsPreflight(request);
}

export async function DELETE(request, context) {
    return withErrorHandling(request, async () => {
        const user = await requireAuth(request);
        const { id } = await context.params;
        const deletedMediaAsset = await deleteMediaAssetById(user, id);
        return ok(request, deletedMediaAsset, "Media asset deleted successfully");
    });
}
