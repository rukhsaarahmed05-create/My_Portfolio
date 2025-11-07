import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    description: text("description").notNull(),
    category: text("category").notNull(),
    technologies: json("technologies").$type().notNull(),
    imageUrl: text("image_url"),
    additionalImages: json("additional_images").$type(),
    githubUrl: text("github_url"),
    liveUrl: text("live_url"),
    featured: boolean("featured").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});
export const blogPosts = pgTable("blog_posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    category: text("category").notNull(),
    imageUrl: text("image_url"),
    readTime: integer("read_time").notNull(),
    published: boolean("published").default(false),
    publishedAt: timestamp("published_at").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const contacts = pgTable("contacts", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const skills = pgTable("skills", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    icon: text("icon").notNull(),
    description: text("description").notNull(),
    technologies: json("technologies").$type().notNull(),
    color: text("color").notNull(),
});
export const insertProjectSchema = createInsertSchema(projects).omit({
    id: true,
    createdAt: true,
});
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
    id: true,
    createdAt: true,
});
export const insertContactSchema = createInsertSchema(contacts).omit({
    id: true,
    createdAt: true,
});
export const insertSkillSchema = createInsertSchema(skills).omit({
    id: true,
});
