"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wouter_1 = require("wouter");
const queryClient_1 = require("./lib/queryClient");
const react_query_1 = require("@tanstack/react-query");
const toaster_1 = require("@/components/ui/toaster");
const tooltip_1 = require("@/components/ui/tooltip");
const theme_provider_1 = require("@/components/theme-provider");
const home_1 = __importDefault(require("@/pages/home"));
const project_detail_1 = __importDefault(require("@/pages/project-detail"));
const blog_post_1 = __importDefault(require("@/pages/blog-post"));
const not_found_1 = __importDefault(require("@/pages/not-found"));
function Router() {
    return (<wouter_1.Switch>
      <wouter_1.Route path="/" component={home_1.default}/>
      <wouter_1.Route path="/project/:id" component={project_detail_1.default}/>
      <wouter_1.Route path="/blog/:slug" component={blog_post_1.default}/>
      <wouter_1.Route component={not_found_1.default}/>
    </wouter_1.Switch>);
}
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient_1.queryClient}>
      <theme_provider_1.ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <tooltip_1.TooltipProvider>
          <toaster_1.Toaster />
          <Router />
        </tooltip_1.TooltipProvider>
      </theme_provider_1.ThemeProvider>
    </react_query_1.QueryClientProvider>);
}
exports.default = App;
