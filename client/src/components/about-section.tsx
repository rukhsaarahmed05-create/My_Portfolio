export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              About Me
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              I'm a passionate Machine Vision Engineer with over 5+ years of Industrial Experience in developing cutting-edge computer vision and deep learning solutions. My expertise spans from research and development to production deployment of AI systems.
            </p>

            <p className="text-lg text-slate-600 dark:text-slate-400">
              I specialize in creating robust, scalable AI solutions that solve real-world problems across industries including healthcare, automotive, and manufacturing. My work focuses on bridging the gap between advanced research and practical applications.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional workspace with multiple monitors showing code and data"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
