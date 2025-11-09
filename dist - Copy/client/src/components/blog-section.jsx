"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSection = BlogSection;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
function BlogSection() {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    // const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    //   queryKey: ["/api/blog-posts", { published: true, q: searchQuery }],
    // });
    // const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    //   queryKey: ["/api/blog-posts", { published: true, q: searchQuery }],
    // });
    const fetchBlogPosts = async ({ queryKey }) => {
        const [_key, params] = queryKey;
        const url = new URL(_key, window.location.origin);
        if (params && typeof params === "object") {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== "") {
                    url.searchParams.append(k, String(v));
                }
            });
        }
        const res = await fetch(url.toString());
        if (!res.ok)
            throw new Error("Failed to fetch blog posts");
        return res.json();
    };
    const { data: blogPosts, isLoading } = (0, react_query_1.useQuery)({
        queryKey: ["/api/blog-posts", { published: true, q: searchQuery }],
        queryFn: fetchBlogPosts
    });
    const getCategoryColor = (category) => {
        const colorMap = {
            "Deep Learning": "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300",
            "Tutorial": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
            "MLOps": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
        };
        return colorMap[category] || "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300";
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
    if (isLoading) {
        return (<section id="blog" className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Latest Blog Posts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (<card_1.Card key={i} className="animate-pulse">
                <div className="h-48 bg-slate-200 dark:bg-slate-700"></div>
                <card_1.CardContent className="p-6">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                </card_1.CardContent>
              </card_1.Card>))}
          </div>
        </div>
      </section>);
    }
    return (<section id="blog" className="py-16 lg:py-24 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Technical insights, tutorials, and deep dives into machine learning and computer vision
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input_1.Input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-3 pl-10 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"/>
              <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4"/>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post) => (<article key={post.id} className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow">
              {post.imageUrl && (<img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover"/>)}
              <card_1.CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <badge_1.Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </badge_1.Badge>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <a href={`/blog/${post.slug}`}>
                    {post.title}
                  </a>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <lucide_react_1.Clock className="h-4 w-4 text-slate-400"/>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {post.readTime} min read
                    </span>
                  </div>
                  <a href={`/blog/${post.slug}`} className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium text-sm transition-colors">
                    Read More →
                  </a>
                </div>
              </card_1.CardContent>
            </article>))}
        </div>
        
        <div className="text-center mt-12">
          <button_1.Button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Posts
          </button_1.Button>
        </div>
      </div>
    </section>);
}
