import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Machine Vision & 
              <span className="text-brand-600 dark:text-brand-400"> Deep Learning</span>
              Expert
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Developing cutting-edge computer vision solutions and deep learning models 
              to solve complex real-world problems. Specializing in image processing, 
              neural networks, and AI-driven automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToProjects}
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-medium"
              >
                View Projects
              </Button>
              <Button 
                variant="outline"
                className="border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-3 rounded-lg font-medium"
              >
                Download Resume
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-brand-500 to-violet-600 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 h-full">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border-r border-white/20 h-full"></div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl text-white/30">
                  🧠
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
