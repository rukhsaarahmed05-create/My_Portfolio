// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  projects;
  blogPosts;
  contacts;
  skills;
  currentProjectId;
  currentBlogPostId;
  currentContactId;
  currentSkillId;
  constructor() {
    this.projects = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.skills = /* @__PURE__ */ new Map();
    this.currentProjectId = 1;
    this.currentBlogPostId = 1;
    this.currentContactId = 1;
    this.currentSkillId = 1;
    this.seedInitialData();
  }
  seedInitialData() {
    const initialSkills = [
      {
        name: "Computer Vision",
        category: "Machine Learning",
        icon: "fas fa-eye",
        description: "OpenCV, PIL, Scikit-image, Object Detection, Image Segmentation",
        technologies: ["OpenCV", "YOLO", "PIL", "Scikit-image"],
        color: "brand"
      },
      {
        name: "Deep Learning",
        category: "AI",
        icon: "fas fa-brain",
        description: "TensorFlow, PyTorch, Keras, Neural Networks, CNN, RNN",
        technologies: ["PyTorch", "TensorFlow", "Keras", "CNN", "RNN"],
        color: "violet"
      },
      {
        name: "Programming",
        category: "Development",
        icon: "fas fa-code",
        description: "Python, C++, CUDA, NumPy, Pandas, Matplotlib",
        technologies: ["Python", "CUDA", "NumPy", "Pandas"],
        color: "emerald"
      },
      {
        name: "Deployment",
        category: "MLOps",
        icon: "fas fa-server",
        description: "Docker, AWS, Flask, FastAPI, MLOps, Model Optimization",
        technologies: ["Docker", "AWS", "Flask", "FastAPI"],
        color: "amber"
      }
    ];
    initialSkills.forEach((skill) => this.createSkill(skill));
    const initialProjects = [
      {
        title: "Medical Image Analysis",
        description: "CNN-based system for automated detection of pneumonia in chest X-rays with 95% accuracy using transfer learning.",
        category: "Medical AI",
        technologies: ["PyTorch", "ResNet", "OpenCV"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/medical-ai",
        liveUrl: "https://medical-ai-demo.com",
        featured: true
      },
      {
        title: "Autonomous Vehicle Vision",
        description: "Real-time object detection and lane tracking system for autonomous vehicles using YOLO and advanced filtering algorithms.",
        category: "Computer Vision",
        technologies: ["YOLO", "OpenCV", "ROS"],
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/autonomous-vision",
        featured: true
      },
      {
        title: "Quality Control System",
        description: "Automated defect detection system for manufacturing lines using deep learning to identify product anomalies in real-time.",
        category: "Industrial AI",
        technologies: ["TensorFlow", "CNN", "EdgeAI"],
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/quality-control",
        featured: true
      },
      {
        title: "OCR System for Automotive EIN/VIN Recognition",
        description: "PaddleOCR-based system for extracting and matching Engine Identification Numbers (EIN) and Vehicle Identification Numbers (VIN) from automotive parts with high accuracy validation.",
        category: "Computer Vision",
        technologies: ["PaddleOCR", "Python", "OpenCV", "Text Recognition"],
        imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },
      {
        title: "Barcode Detection & Quality Control",
        description: "Automated barcode scanning and validation system with OK/NG status flagging. Implements real-time barcode matching with quality assessment for manufacturing workflows.",
        category: "Industrial AI",
        technologies: ["OpenCV", "ZBar", "Python", "Image Processing"],
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/barcode-qc",
        featured: false
      },
      {
        title: "Pharmaceutical Blister Pack Inspection",
        description: "Computer vision system for pharmaceutical blister packaging verification. Automatically validates printing labels including batch codes, lot numbers, MRP, and expiry dates with OCR technology.",
        category: "Medical AI",
        technologies: ["PaddleOCR", "OpenCV", "Python", "Quality Control"],
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/pharma-inspection",
        featured: false
      },
      {
        title: "Multi-Domain OCR Pipeline",
        description: "Comprehensive OCR solution supporting multiple document types and text recognition scenarios. Built with PaddleOCR for robust text extraction across various industrial applications.",
        category: "Computer Vision",
        technologies: ["PaddleOCR", "Flask", "API", "Text Processing"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/multi-ocr",
        featured: false
      }
    ];
    initialProjects.forEach((project) => this.createProject(project));
    const initialBlogPosts = [
      {
        title: "Understanding Transformer Architecture in Computer Vision",
        slug: "transformer-architecture-computer-vision",
        excerpt: "A comprehensive guide to Vision Transformers (ViTs) and how they're revolutionizing image classification tasks with attention mechanisms.",
        content: "# Understanding Transformer Architecture in Computer Vision\n\nVision Transformers (ViTs) have revolutionized the field of computer vision...",
        category: "Deep Learning",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=300&fit=crop",
        readTime: 8,
        published: true
      },
      {
        title: "Building Real-time Object Detection with YOLO and OpenCV",
        slug: "real-time-object-detection-yolo-opencv",
        excerpt: "Step-by-step tutorial on implementing a real-time object detection system using YOLOv8 and OpenCV with Python.",
        content: "# Building Real-time Object Detection with YOLO and OpenCV\n\nReal-time object detection is a crucial component...",
        category: "Tutorial",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=300&fit=crop",
        readTime: 12,
        published: true
      },
      {
        title: "Deploying ML Models at Scale: Docker, Kubernetes, and Beyond",
        slug: "deploying-ml-models-scale-docker-kubernetes",
        excerpt: "Best practices for deploying machine learning models in production environments with containerization and orchestration.",
        content: "# Deploying ML Models at Scale\n\nDeploying machine learning models in production requires careful consideration...",
        category: "MLOps",
        imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=300&fit=crop",
        readTime: 15,
        published: true
      },
      {
        title: "Advanced OCR with PaddleOCR: From Text Detection to Industrial Applications",
        slug: "advanced-ocr-paddleocr-industrial-applications",
        excerpt: "Exploring PaddleOCR capabilities for automotive VIN/EIN recognition, pharmaceutical label validation, and barcode processing in production environments.",
        content: "# Advanced OCR with PaddleOCR: From Text Detection to Industrial Applications\n\nOptical Character Recognition (OCR) has become a cornerstone technology in industrial automation and quality control. In this comprehensive guide, we'll explore how PaddleOCR can be leveraged for complex real-world applications including automotive part identification, pharmaceutical packaging validation, and automated quality control systems.\n\n## Why PaddleOCR?\n\nPaddleOCR stands out in the OCR landscape due to its exceptional accuracy, multilingual support, and lightweight architecture that makes it ideal for edge deployment. Unlike traditional OCR solutions, PaddleOCR combines text detection and recognition in a unified pipeline that delivers superior performance across various document types and image qualities.\n\n## Automotive Industry Applications\n\n### VIN and EIN Recognition\n\nIn automotive manufacturing, accurate identification of Vehicle Identification Numbers (VIN) and Engine Identification Numbers (EIN) is critical for quality control and traceability. Our implementation using PaddleOCR achieves 98.5% accuracy in extracting these alphanumeric codes from various surfaces including metal stampings, etched plates, and printed labels.\n\n### Implementation Strategy\n\n1. **Preprocessing Pipeline**: Image enhancement using OpenCV for noise reduction and contrast optimization\n2. **Text Detection**: PaddleOCR's DB (Differentiable Binarization) model for precise text localization\n3. **Recognition**: CRNN (Convolutional Recurrent Neural Network) for character sequence recognition\n4. **Validation**: Pattern matching against standard VIN/EIN formats with checksum verification\n\n## Pharmaceutical Quality Control\n\n### Blister Pack Inspection\n\nPharmaceutical manufacturing requires stringent quality control to ensure patient safety. Our PaddleOCR-based solution validates critical information on blister packaging:\n\n- **Batch Codes**: Ensuring traceability throughout the supply chain\n- **Lot Numbers**: Maintaining manufacturing batch integrity\n- **Expiry Dates**: Preventing distribution of expired products\n- **MRP (Maximum Retail Price)**: Regulatory compliance verification\n\n### Technical Implementation\n\nThe system processes high-resolution images of blister packs using a multi-stage approach:\n\n1. **Region of Interest Detection**: Automated identification of text regions using computer vision\n2. **OCR Processing**: PaddleOCR extracts text with confidence scoring\n3. **Data Validation**: Rule-based verification against regulatory standards\n4. **Quality Flagging**: Automatic OK/NG status determination\n\n## Barcode Integration and Quality Control\n\n### Hybrid Approach\n\nCombining traditional barcode scanning with OCR creates a robust identification system:\n\n- **Primary**: Barcode scanning for rapid identification\n- **Secondary**: OCR for human-readable verification\n- **Validation**: Cross-referencing both methods for maximum accuracy\n\n### Quality Control Workflow\n\n1. **Image Acquisition**: High-resolution capture of product labels\n2. **Dual Processing**: Simultaneous barcode and OCR analysis\n3. **Data Correlation**: Matching extracted information\n4. **Status Determination**: OK flag for matches, NG for discrepancies\n5. **Reporting**: Detailed logs for quality assurance\n\n## Performance Optimization\n\n### Edge Deployment\n\nFor real-time industrial applications, we've optimized PaddleOCR for edge computing:\n\n- **Model Quantization**: Reducing model size while maintaining accuracy\n- **GPU Acceleration**: Leveraging CUDA for faster inference\n- **Batch Processing**: Optimizing throughput for high-volume scenarios\n\n### Accuracy Metrics\n\nOur implementations achieve industry-leading performance:\n\n- **VIN Recognition**: 98.5% accuracy across various surface types\n- **Pharmaceutical Labels**: 99.2% accuracy with regulatory compliance\n- **Barcode Validation**: 99.8% match rate with OCR verification\n\n## Future Developments\n\n### AI-Powered Enhancement\n\nWe're exploring integration with large language models for:\n\n- **Context Understanding**: Improved validation through semantic analysis\n- **Error Correction**: Intelligent correction of OCR misreads\n- **Adaptive Learning**: Continuous improvement through feedback loops\n\n## Conclusion\n\nPaddleOCR's versatility and accuracy make it an excellent choice for industrial OCR applications. From automotive part tracking to pharmaceutical quality control, the technology enables automated, reliable text recognition that meets stringent industry standards.\n\nThe combination of advanced preprocessing, robust recognition algorithms, and intelligent validation creates systems that not only match but often exceed human performance in text recognition tasks, while providing the consistency and speed required for modern manufacturing environments.",
        category: "Tutorial",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop",
        readTime: 18,
        published: true
      }
    ];
    initialBlogPosts.forEach((post) => this.createBlogPost(post));
  }
  async getProjects(category) {
    const allProjects = Array.from(this.projects.values());
    if (category && category !== "All") {
      return allProjects.filter((project) => project.category === category);
    }
    return allProjects;
  }
  async getProject(id) {
    return this.projects.get(id);
  }
  async createProject(insertProject) {
    const id = this.currentProjectId++;
    const project = {
      id,
      title: insertProject.title,
      description: insertProject.description,
      category: insertProject.category,
      technologies: insertProject.technologies,
      imageUrl: insertProject.imageUrl || null,
      githubUrl: insertProject.githubUrl || null,
      liveUrl: insertProject.liveUrl || null,
      featured: insertProject.featured || false,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.projects.set(id, project);
    return project;
  }
  async getBlogPosts(published) {
    const allPosts = Array.from(this.blogPosts.values());
    if (published !== void 0) {
      return allPosts.filter((post) => post.published === published);
    }
    return allPosts;
  }
  async getBlogPost(id) {
    return this.blogPosts.get(id);
  }
  async getBlogPostBySlug(slug) {
    return Array.from(this.blogPosts.values()).find((post) => post.slug === slug);
  }
  async searchBlogPosts(query) {
    const searchTerm = query.toLowerCase();
    return Array.from(this.blogPosts.values()).filter(
      (post) => post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm) || post.category.toLowerCase().includes(searchTerm)
    );
  }
  async createBlogPost(insertBlogPost) {
    const id = this.currentBlogPostId++;
    const blogPost = {
      ...insertBlogPost,
      id,
      publishedAt: /* @__PURE__ */ new Date(),
      createdAt: /* @__PURE__ */ new Date(),
      published: insertBlogPost.published || false,
      imageUrl: insertBlogPost.imageUrl || null
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  async getContacts() {
    return Array.from(this.contacts.values());
  }
  async createContact(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      subject: insertContact.subject || null
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getSkills() {
    return Array.from(this.skills.values());
  }
  async createSkill(insertSkill) {
    const id = this.currentSkillId++;
    const skill = {
      id,
      name: insertSkill.name,
      category: insertSkill.category,
      icon: insertSkill.icon,
      description: insertSkill.description,
      technologies: insertSkill.technologies,
      color: insertSkill.color
    };
    this.skills.set(id, skill);
    return skill;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  technologies: json("technologies").$type().notNull(),
  imageUrl: text("image_url"),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var blogPosts = pgTable("blog_posts", {
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
  createdAt: timestamp("created_at").defaultNow()
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  technologies: json("technologies").$type().notNull(),
  color: text("color").notNull()
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
});
var insertSkillSchema = createInsertSchema(skills).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category;
      const projects2 = await storage.getProjects(category);
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  app2.get("/api/blog-posts", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const query = req.query.q;
      let blogPosts2;
      if (query) {
        blogPosts2 = await storage.searchBlogPosts(query);
      } else {
        blogPosts2 = await storage.getBlogPosts(published);
      }
      res.json(blogPosts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const blogPost = await storage.getBlogPost(id);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  app2.get("/api/blog-posts/slug/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const blogPost = await storage.getBlogPostBySlug(slug);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  app2.get("/api/skills", async (req, res) => {
    try {
      const skills2 = await storage.getSkills();
      res.json(skills2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({
        message: "Contact form submitted successfully",
        id: contact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
