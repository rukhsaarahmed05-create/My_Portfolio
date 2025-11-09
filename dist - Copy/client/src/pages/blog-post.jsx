"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostPage;
const wouter_1 = require("wouter");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("@/components/navigation");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function BlogPostPage() {
    const { slug } = (0, wouter_1.useParams)();
    const { data: blogPost, isLoading, error } = (0, react_query_1.useQuery)({
        queryKey: ["/api/blog-posts/slug", slug],
        enabled: !!slug,
    });
    const goBack = () => {
        window.history.back();
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
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
    if (error || !blogPost) {
        return (<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <navigation_1.Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <card_1.Card>
              <card_1.CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Blog Post Not Found
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  The blog post you're looking for doesn't exist or has been removed.
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
            Back to Blog
          </button_1.Button>
          
          <article className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            {blogPost.imageUrl && (<img src={blogPost.imageUrl} alt={blogPost.title} className="w-full h-64 md:h-96 object-cover"/>)}
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <badge_1.Badge className="px-3 py-1 text-sm rounded-full">
                  {blogPost.category}
                </badge_1.Badge>
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <lucide_react_1.Clock className="h-4 w-4"/>
                    <span>{blogPost.readTime} min read</span>
                  </div>
                  <span>{formatDate(blogPost.publishedAt)}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                {blogPost.title}
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {blogPost.excerpt}
              </p>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br>') }}/>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-8">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Published on {formatDate(blogPost.publishedAt)}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>);
}
