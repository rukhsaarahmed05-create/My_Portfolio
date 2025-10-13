import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", id],
    enabled: !!id,
  });

  const goBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navigation />
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
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Project Not Found
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  The project you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={goBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={goBack}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            {project.imageUrl && (
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Badge className="px-3 py-1 text-sm rounded-full">
                  {project.category}
                </Badge>
                <div className="flex space-x-3">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                {project.title}
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Created on {new Date(project.createdAt!).toLocaleDateString("en-US", {
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
    </div>
  );
}
