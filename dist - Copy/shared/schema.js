"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSkillSchema = exports.insertContactSchema = exports.insertBlogPostSchema = exports.insertProjectSchema = exports.skills = exports.contacts = exports.blogPosts = exports.projects = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.projects = (0, pg_core_1.pgTable)("projects", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    subtitle: (0, pg_core_1.text)("subtitle"),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.text)("category").notNull(),
    technologies: (0, pg_core_1.json)("technologies").$type().notNull(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    additionalImages: (0, pg_core_1.json)("additional_images").$type(),
    githubUrl: (0, pg_core_1.text)("github_url"),
    liveUrl: (0, pg_core_1.text)("live_url"),
    featured: (0, pg_core_1.boolean)("featured").default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.blogPosts = (0, pg_core_1.pgTable)("blog_posts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    slug: (0, pg_core_1.text)("slug").notNull().unique(),
    excerpt: (0, pg_core_1.text)("excerpt").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    category: (0, pg_core_1.text)("category").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    readTime: (0, pg_core_1.integer)("read_time").notNull(),
    published: (0, pg_core_1.boolean)("published").default(false),
    publishedAt: (0, pg_core_1.timestamp)("published_at").defaultNow(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.contacts = (0, pg_core_1.pgTable)("contacts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    subject: (0, pg_core_1.text)("subject"),
    message: (0, pg_core_1.text)("message").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.skills = (0, pg_core_1.pgTable)("skills", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    category: (0, pg_core_1.text)("category").notNull(),
    icon: (0, pg_core_1.text)("icon").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    technologies: (0, pg_core_1.json)("technologies").$type().notNull(),
    color: (0, pg_core_1.text)("color").notNull(),
});
exports.insertProjectSchema = (0, drizzle_zod_1.createInsertSchema)(exports.projects).omit({
    id: true,
    createdAt: true,
});
exports.insertBlogPostSchema = (0, drizzle_zod_1.createInsertSchema)(exports.blogPosts).omit({
    id: true,
    createdAt: true,
});
exports.insertContactSchema = (0, drizzle_zod_1.createInsertSchema)(exports.contacts).omit({
    id: true,
    createdAt: true,
});
exports.insertSkillSchema = (0, drizzle_zod_1.createInsertSchema)(exports.skills).omit({
    id: true,
});
