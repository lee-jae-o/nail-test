import type { SupabaseClient } from "@supabase/supabase-js";

export const IMAGES_BUCKET = "images";

/** Signed URLs are valid for 1 hour. */
const SIGNED_URL_TTL_SECONDS = 60 * 60;

export type Thumbnail = {
  id: string;
  user_id: string;
  prompt: string;
  /** Path inside the private `images` bucket: "<user_id>/<file>" */
  storage_path: string;
  reference_path: string | null;
  model: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
};

/** Builds the owner-scoped storage path the bucket policies require. */
export function buildImagePath(userId: string, fileName: string) {
  return `${userId}/${fileName}`;
}

/**
 * The `images` bucket is private, so images are never shown via a public URL.
 * Returns a map of storage_path → temporary signed URL.
 */
export async function getSignedUrls(
  supabase: SupabaseClient,
  paths: string[],
): Promise<Record<string, string>> {
  if (paths.length === 0) return {};
  const { data, error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);
  if (error) throw error;

  const urls: Record<string, string> = {};
  for (const item of data) {
    if (item.path && item.signedUrl) urls[item.path] = item.signedUrl;
  }
  return urls;
}

export async function getSignedUrl(supabase: SupabaseClient, path: string) {
  const { data, error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
  if (error) throw error;
  return data.signedUrl;
}
