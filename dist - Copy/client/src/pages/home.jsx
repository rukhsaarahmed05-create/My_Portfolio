"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const navigation_1 = require("@/components/navigation");
const hero_section_1 = require("@/components/hero-section");
const skills_section_1 = require("@/components/skills-section");
const projects_section_1 = require("@/components/projects-section");
const blog_section_1 = require("@/components/blog-section");
const about_section_1 = require("@/components/about-section");
const contact_section_1 = require("@/components/contact-section");
const footer_1 = require("@/components/footer");
function Home() {
    return (<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <navigation_1.Navigation />
      <hero_section_1.HeroSection />
      <skills_section_1.SkillsSection />
      <projects_section_1.ProjectsSection />
      <blog_section_1.BlogSection />
      <about_section_1.AboutSection />
      <contact_section_1.ContactSection />
      <footer_1.Footer />
    </div>);
}
