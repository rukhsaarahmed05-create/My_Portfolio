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
              I'm a passionate Machine Learning Engineer with over 5 years of experience developing cutting-edge computer vision and deep learning solutions. My expertise spans from research and development to production deployment of AI systems.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              I specialize in creating robust, scalable AI solutions that solve real-world problems across industries including healthcare, automotive, and manufacturing. My work focuses on bridging the gap between advanced research and practical applications.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Work Experience</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-brand-600 pl-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">Senior ML Engineer</h4>
                    <p className="text-slate-600 dark:text-slate-400">TechCorp AI • 2021 - Present</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                      Leading computer vision projects for autonomous systems and medical imaging applications.
                    </p>
                  </div>
                  <div className="border-l-4 border-slate-300 dark:border-slate-600 pl-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">Computer Vision Engineer</h4>
                    <p className="text-slate-600 dark:text-slate-400">VisionTech Solutions • 2019 - 2021</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                      Developed real-time object detection systems and image processing pipelines.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Education</h3>
                <div className="border-l-4 border-brand-600 pl-4">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">M.S. Computer Science</h4>
                  <p className="text-slate-600 dark:text-slate-400">Stanford University • 2019</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    Specialization in Artificial Intelligence and Machine Learning
                  </p>
                </div>
              </div>
            </div>
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
