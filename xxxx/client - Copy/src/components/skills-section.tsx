import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@shared/schema";

export function SkillsSection() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
      brand: {
        bg: "bg-slate-50 dark:bg-slate-900",
        text: "text-brand-600 dark:text-brand-400",
        badge: "bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-300"
      },
      violet: {
        bg: "bg-slate-50 dark:bg-slate-900",
        text: "text-violet-600 dark:text-violet-400",
        badge: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300"
      },
      emerald: {
        bg: "bg-slate-50 dark:bg-slate-900",
        text: "text-emerald-600 dark:text-emerald-400",
        badge: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
      },
      amber: {
        bg: "bg-slate-50 dark:bg-slate-900",
        text: "text-amber-600 dark:text-amber-400",
        badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
      }
    };
    return colorMap[color] || colorMap.brand;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Technical Expertise
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Comprehensive experience in machine learning frameworks, computer vision libraries, and deployment technologies
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills?.map((skill) => {
            const colors = getColorClasses(skill.color);
            return (
              <Card key={skill.id} className={`${colors.bg} border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6">
                  <div className={`${colors.text} text-3xl mb-4`}>
                    <span className={skill.icon}></span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.slice(0, 2).map((tech) => (
                      <Badge key={tech} className={`${colors.badge} text-xs`}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
