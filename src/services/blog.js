import { categories, posts } from "../data/blog";

// Urut terbaru dulu.
export async function getPosts() {
  return { categories, posts: [...posts].sort((a, b) => b.date.localeCompare(a.date)) };
}

// + `related`: 3 artikel lain, kategori sama didahulukan lalu terbaru.
export async function getPost(slug) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  const related = posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === post.category) - (a.category === post.category) || b.date.localeCompare(a.date))
    .slice(0, 3);
  return { ...post, related };
}

// Perkiraan waktu baca (±200 kata/menit), minimal 1 menit.
export const readMinutes = (body) => Math.max(1, Math.round(body.join(" ").split(/\s+/).length / 200));
