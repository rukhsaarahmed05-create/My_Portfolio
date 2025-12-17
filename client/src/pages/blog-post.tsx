// import { useParams } from "wouter";
// import { useQuery } from "@tanstack/react-query";
// import { Navigation } from "@/components/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Clock } from "lucide-react";
// import type { BlogPost } from "@shared/schema";

// export default function BlogPostPage() {
//   const { slug } = useParams<{ slug: string }>();
//   const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
//   queryKey: [`/api/blog-posts/${slug}`],  // Clean URL
//   enabled: !!slug,
// });
  


//   const goBack = () => {
//     window.history.back();
//   };

//   const formatDate = (date: Date | string) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric"
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//         <Navigation />
//         <div className="pt-24 pb-16">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="animate-pulse">
//               <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
//               <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
//               <div className="space-y-4">
//                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
//                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
//                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !blogPost) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//         <Navigation />
//         <div className="pt-24 pb-16">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <Card>
//               <CardContent className="p-8 text-center">
//                 <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
//                   Blog Post Not Found
//                 </h1>
//                 <p className="text-slate-600 dark:text-slate-400 mb-6">
//                   The blog post you're looking for doesn't exist or has been removed.
//                 </p>
//                 <Button onClick={goBack}>
//                   <ArrowLeft className="h-4 w-4 mr-2" />
//                   Go Back
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//       <Navigation />
//       <div className="pt-24 pb-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Button 
//             variant="ghost" 
//             onClick={goBack}
//             className="mb-6"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Blog
//           </Button>
          
//           <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
//             {blogPost.imageUrl && (
//               <img 
//                 src={blogPost.imageUrl} 
//                 alt={blogPost.title}
//                 className="w-full h-64 md:h-96 object-cover"
//               />
//             )}
            
//             <div className="p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <Badge className="px-3 py-1 text-sm rounded-full">
//                   {blogPost.category}
//                 </Badge>
//                 <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
//                   <div className="flex items-center space-x-1">
//                     <Clock className="h-4 w-4" />
//                     <span>{blogPost.readTime} min read</span>
//                   </div>
//                   <span>{formatDate(blogPost.publishedAt!)}</span>
//                 </div>
//               </div>
              
//               <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
//                 {blogPost.title}
//               </h1>
              
//               <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
//                 {blogPost.excerpt}
//               </p>
              
//               <div className="prose prose-lg dark:prose-invert max-w-none">
//                 <div 
//                   className="text-slate-700 dark:text-slate-300 leading-relaxed"
//                   dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br>') }}
//                 />
//               </div>
              
//               <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-8">
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Published on {formatDate(blogPost.publishedAt!)}
//                 </p>
//               </div>
//             </div>
//           </article>
//         </div>
//       </div>
//     </div>
//   );
// }







// import { useParams } from "wouter";
// import { useQuery } from "@tanstack/react-query";
// import { Navigation } from "@/components/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Clock } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import type { BlogPost } from "@shared/schema";

// export default function BlogPostPage() {
//   const { slug } = useParams<{ slug: string }>();
//   const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
//     queryKey: [`/api/blog-posts/${slug}`],  // Clean URL
//     enabled: !!slug,
//     queryFn: async () => {
//       const res = await fetch(`/api/blog-posts/${slug}`);
//       if (!res.ok) throw new Error("Blog post not found");
//       return res.json();
//     },
//   });

//   const goBack = () => {
//     window.history.back();
//   };

//   const formatDate = (date: Date | string) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//         <Navigation />
//         <div className="pt-24 pb-16">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="animate-pulse">
//               <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
//               <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
//               <div className="space-y-4">
//                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
//                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
//                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !blogPost) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//         <Navigation />
//         <div className="pt-24 pb-16">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <Card>
//               <CardContent className="p-8 text-center">
//                 <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
//                   Blog Post Not Found
//                 </h1>
//                 <p className="text-slate-600 dark:text-slate-400 mb-6">
//                   The blog post you're looking for doesn't exist or has been removed.
//                 </p>
//                 <Button onClick={goBack}>
//                   <ArrowLeft className="h-4 w-4 mr-2" />
//                   Go Back
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//       <Navigation />
//       <div className="pt-24 pb-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Button
//             variant="ghost"
//             onClick={goBack}
//             className="mb-6"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Blog
//           </Button>

//           <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
//             {blogPost.imageUrl && (
//               <img
//                 src={blogPost.imageUrl}
//                 alt={blogPost.title}
//                 className="w-full h-64 md:h-96 object-cover"
//               />
//             )}

//             <div className="p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <Badge className="px-3 py-1 text-sm rounded-full">
//                   {blogPost.category}
//                 </Badge>
//                 <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
//                   <div className="flex items-center space-x-1">
//                     <Clock className="h-4 w-4" />
//                     <span>{blogPost.readTime} min read</span>
//                   </div>
//                   <span>{formatDate(blogPost.publishedAt!)}</span>
//                 </div>
//               </div>

//               <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
//                 {blogPost.title}
//               </h1>

//               <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
//                 {blogPost.excerpt}
//               </p>

//               <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
//                 <ReactMarkdown>
//                   {blogPost.content}
//                 </ReactMarkdown>
//               </div>

//               <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-8">
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Published on {formatDate(blogPost.publishedAt!)}
//                 </p>
//               </div>
//             </div>
//           </article>
//         </div>
//       </div>
//     </div>
//   );
// }











import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import type { BlogPost } from "@shared/schema";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${slug}`],
    enabled: !!slug,
  });

  const goBack = () => window.history.back();

  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navigation />
        <div className="pt-24 text-center">Loading...</div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navigation />
        <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
              <Button onClick={goBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Button variant="ghost" onClick={goBack} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            {blogPost.imageUrl && (
              <img
                src={blogPost.imageUrl}
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}

            <div className="p-8">
              <div className="flex justify-between mb-6">
                <Badge>{blogPost.category}</Badge>
                <div className="text-sm text-slate-500 flex items-center gap-3">
                  <Clock className="h-4 w-4" />
                  {blogPost.readTime} min read ·{" "}
                  {formatDate(blogPost.publishedAt!)}
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-6">
                {blogPost.title}
              </h1>

              {/* ✅ MARKDOWN RENDERER */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        className="w-full rounded-lg my-6 border bg-white"
                        loading="lazy"
                      />
                    ),
                  }}
                >
                  {blogPost.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

