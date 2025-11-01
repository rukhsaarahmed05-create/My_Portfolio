// import { useState } from "react";
// import { Link } from "wouter";
// import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Github, ExternalLink } from "lucide-react";
// import type { Project } from "@shared/schema";

// export function ProjectsSection() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
  
//   const { data: projects, isLoading } = useQuery<Project[]>({
//     queryKey: ["/api/projects", selectedCategory !== "All" ? selectedCategory : undefined],
//   });

//   const categories = ["All", "Computer Vision", "Deep Learning", "Medical AI", "Industrial AI"];

//   const getCategoryColor = (category: string) => {
//     const colorMap: Record<string, string> = {
//       "Medical AI": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
//       "Computer Vision": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
//       "Industrial AI": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
//       "Deep Learning": "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300"
//     };
//     return colorMap[category] || "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300";
//   };

//   if (isLoading) {
//     return (
//       <section id="projects" className="py-16 lg:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
//               Featured Projects
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//             {Array.from({ length: 3 }).map((_, i) => (
//               <Card key={i} className="animate-pulse">
//                 <div className="h-48 bg-slate-200 dark:bg-slate-700"></div>
//                 <CardContent className="p-6">
//                   <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
//                   <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
//                   <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="projects" className="py-16 lg:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
//             Featured Projects
//           </h2>
//           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
//             Showcasing real-world applications of machine vision and deep learning technologies
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             {categories.map((category) => (
//               <Button
//                 key={category}
//                 variant={selectedCategory === category ? "default" : "secondary"}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   selectedCategory === category
//                     ? "bg-brand-600 text-white"
//                     : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
//                 }`}
//               >
//                 {category}
//               </Button>
//             ))}
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//           {projects?.map((project) => (
//             <Card key={project.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
//               {project.imageUrl && (
//                 <img 
//                   src={project.imageUrl} 
//                   alt={project.title}
//                   className="w-full h-48 object-cover"
//                 />
//               )}
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <Badge className={getCategoryColor(project.category)}>
//                     {project.category}
//                   </Badge>
//                   <div className="flex space-x-2">
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
//                       >
//                         <Github className="h-4 w-4" />
//                       </a>
//                     )}
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
//                       >
//                         <ExternalLink className="h-4 w-4" />
//                       </a>
//                     )}
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
//                   {project.title}
//                 </h3>
//                 {project.subtitle && (
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
//                     {project.subtitle}
//                   </p>
//                 )}
//                 <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
//                   {project.description.length > 150 
//                     ? `${project.description.substring(0, 150)}...` 
//                     : project.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.technologies.map((tech) => (
//                     <Badge key={tech} variant="secondary" className="text-xs">
//                       {tech}
//                     </Badge>
//                   ))}
//                 </div>
//                 <Button 
//                   className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg font-medium transition-colors"
//                   asChild
//                 >
//                   <Link href={`/project/${project.id}`}>
//                     View Details
//                   </Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
        
//         <div className="text-center mt-12">
//           <Button 
//             variant="secondary"
//             className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 px-8 py-3 rounded-lg font-medium transition-colors"
//           >
//             View All Projects
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }




import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Add the fetch function to actually call your API
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", selectedCategory !== "All" ? selectedCategory : undefined],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const categories = ["All", "Computer Vision", "Deep Learning", "Medical AI", "Industrial AI"];

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "Medical AI": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      "Computer Vision": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      "Industrial AI": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      "Deep Learning": "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300",
    };
    return colorMap[category] || "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300";
  };

  // ✅ Loading skeleton
  if (isLoading) {
    return (
      <section id="projects" className="py-16 lg:py-24 text-center">
        <h2 className="text-3xl font-bold mb-8">Loading projects...</h2>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Showcasing real-world applications of machine vision and deep learning technologies
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id}>
              {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}



