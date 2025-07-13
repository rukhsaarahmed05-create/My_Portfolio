import { projects, blogPosts, contacts, skills, type Project, type InsertProject, type BlogPost, type InsertBlogPost, type Contact, type InsertContact, type Skill, type InsertSkill } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(category?: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Blog Posts
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private contacts: Map<number, Contact>;
  private skills: Map<number, Skill>;
  private currentProjectId: number;
  private currentBlogPostId: number;
  private currentContactId: number;
  private currentSkillId: number;

  constructor() {
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    this.skills = new Map();
    this.currentProjectId = 1;
    this.currentBlogPostId = 1;
    this.currentContactId = 1;
    this.currentSkillId = 1;
    
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed skills
    const initialSkills: InsertSkill[] = [
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

    initialSkills.forEach(skill => this.createSkill(skill));

    // Seed projects
    const initialProjects: InsertProject[] = [
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
      }
    ];

    initialProjects.forEach(project => this.createProject(project));

    // Seed blog posts
    const initialBlogPosts: InsertBlogPost[] = [
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
      }
    ];

    initialBlogPosts.forEach(post => this.createBlogPost(post));
  }

  async getProjects(category?: string): Promise<Project[]> {
    const allProjects = Array.from(this.projects.values());
    if (category && category !== "All") {
      return allProjects.filter(project => project.category === category);
    }
    return allProjects;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const allPosts = Array.from(this.blogPosts.values());
    if (published !== undefined) {
      return allPosts.filter(post => post.published === published);
    }
    return allPosts;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.blogPosts.values()).filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = {
      ...insertBlogPost,
      id,
      publishedAt: new Date(),
      createdAt: new Date()
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = {
      ...insertSkill,
      id
    };
    this.skills.set(id, skill);
    return skill;
  }
}

export const storage = new MemStorage();
