import { sanityClient } from "./sanity";
import type { SanityProduct, SanityTestimonial, SanitySiteSettings } from "./sanity-schemas";

// Product queries
export async function getProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(`*[_type == "product"] | order(_createdAt desc)`);
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(`*[_type == "product" && featured == true] | order(_createdAt desc)[0...4]`);
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return sanityClient.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });
}

export async function getProductsByCategory(category: string): Promise<SanityProduct[]> {
  return sanityClient.fetch(`*[_type == "product" && category == $category] | order(_createdAt desc)`, { category });
}

// Testimonial queries
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return sanityClient.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`);
}

// Site settings queries
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}
