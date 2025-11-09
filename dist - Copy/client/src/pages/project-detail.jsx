"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectDetail;
const wouter_1 = require("wouter");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("@/components/navigation");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function ProjectDetail() {
    const { id } = (0, wouter_1.useParams)();
    const { data: project, isLoading, error } = (0, react_query_1.useQuery)({
        queryKey: ["/api/projects", id],
        enabled: !!id,
    });
    const goBack = () => {
        window.history.back();
    };
    if (isLoading) {
        return (<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <navigation_1.Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    if (error || !project) {
        return (<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <navigation_1.Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <card_1.Card>
              <card_1.CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Project Not Found
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  The project you're looking for doesn't exist or has been removed.
                </p>
                <button_1.Button onClick={goBack}>
                  <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
                  Go Back
                </button_1.Button>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <navigation_1.Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button_1.Button variant="ghost" onClick={goBack} className="mb-6">
            <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
            Back to Projects
          </button_1.Button>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            {project.imageUrl && (<img src={project.imageUrl} alt={project.title} className="w-full h-64 md:h-96 object-cover"/>)}
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <badge_1.Badge className="px-3 py-1 text-sm rounded-full">
                  {project.category}
                </badge_1.Badge>
                <div className="flex space-x-3">
                  {project.githubUrl && (<button_1.Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <lucide_react_1.Github className="h-4 w-4 mr-2"/>
                        Code
                      </a>
                    </button_1.Button>)}
                  {project.liveUrl && (<button_1.Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <lucide_react_1.ExternalLink className="h-4 w-4 mr-2"/>
                        Live Demo
                      </a>
                    </button_1.Button>)}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {project.title}
              </h1>
              {project.subtitle && (<p className="text-xl text-slate-500 dark:text-slate-400 mb-4">
                  {project.subtitle}
                </p>)}
              
              <div className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {project.description.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                // Bold text
                const boldText = paragraph.slice(2, -2);
                return (<p key={index} className="font-bold text-slate-900 dark:text-slate-100 mt-4 mb-2">
                        {boldText}
                      </p>);
            }
            else if (paragraph.trim()) {
                // Regular paragraph
                return (<p key={index} className="mb-3">
                        {paragraph}
                      </p>);
            }
            return null;
        })}
              </div>
              
              {project.additionalImages && project.additionalImages.length > 0 && (<div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Project Gallery
                  </h3>
                  <div className="space-y-4">
                    {project.additionalImages.map((imageUrl, index) => (<div key={index} className="rounded-lg overflow-hidden shadow-md">
                        <img src={imageUrl} alt={`${project.title} - Image ${index + 1}`} className="w-full hover:scale-105 transition-transform duration-300"/>
                      </div>))}
                  </div>
                </div>)}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (<badge_1.Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </badge_1.Badge>))}
                </div>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Created on {new Date(project.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
