/**
 * Sanity Schema Definitions for Country Coffee CMS
 *
 * To set up Sanity:
 * 1. Create a project at sanity.io/manage
 * 2. Copy your project ID to .env.local as NEXT_PUBLIC_SANITY_PROJECT_ID
 * 3. Create these schemas in your Sanity Studio
 *
 * These type definitions mirror the Sanity schemas for type safety.
 */

// Product schema for Sanity Studio
export const productSchema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } },
    { name: "description", title: "Description", type: "text" },
    { name: "price", title: "Price", type: "number", validation: (r: { required: () => { min: (n: number) => unknown } }) => r.required().min(0) },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Coffee Beans", value: "beans" },
          { title: "Mugs & Tumblers", value: "mugs" },
          { title: "Equipment", value: "equipment" },
          { title: "Merch", value: "merch" },
        ],
      },
    },
    { name: "badge", title: "Badge", type: "string", description: "e.g. Bestseller, New, Limited" },
    { name: "origin", title: "Origin", type: "string" },
    {
      name: "roast",
      title: "Roast Level",
      type: "string",
      options: { list: ["light", "medium", "dark"] },
    },
    { name: "weight", title: "Weight", type: "string" },
    { name: "details", title: "Details", type: "array", of: [{ type: "string" }] },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
  ],
};

// Testimonial schema
export const testimonialSchema = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "text", title: "Testimonial Text", type: "text" },
    { name: "rating", title: "Rating", type: "number", validation: (r: { min: (n: number) => { max: (n: number) => unknown } }) => r.min(1).max(5) },
  ],
};

// Site settings schema
export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Hero Title", type: "string" },
    { name: "heroSubtitle", title: "Hero Subtitle", type: "text" },
    { name: "aboutText", title: "About Text", type: "text" },
    { name: "contactEmail", title: "Contact Email", type: "string" },
    { name: "contactPhone", title: "Contact Phone", type: "string" },
    { name: "contactAddress", title: "Contact Address", type: "text" },
  ],
};

// Gallery image schema
export const galleryImageSchema = {
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "alt", title: "Alt Text", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};

// TypeScript types matching schemas
export interface SanityProduct {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  image: { asset: { _ref: string } };
  category: "beans" | "mugs" | "equipment" | "merch";
  badge?: string;
  origin?: string;
  roast?: "light" | "medium" | "dark";
  weight?: string;
  details?: string[];
  featured?: boolean;
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface SanitySiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}
