"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = Navigation;
const react_1 = require("react");
const wouter_1 = require("wouter");
const button_1 = require("@/components/ui/button");
const sheet_1 = require("@/components/ui/sheet");
const theme_provider_1 = require("@/components/theme-provider");
const lucide_react_1 = require("lucide-react");
function Navigation() {
    const [location] = (0, wouter_1.useLocation)();
    const { theme, setTheme } = (0, theme_provider_1.useTheme)();
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const navItems = [
        { href: "#home", label: "Home" },
        { href: "#projects", label: "Projects" },
        { href: "#blog", label: "Blog" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
    ];
    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
    };
    return (<nav className="fixed top-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <wouter_1.Link href="/">
                <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
                  Portfolio
                </span>
              </wouter_1.Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                {navItems.map((item) => (<button key={item.href} onClick={() => scrollToSection(item.href)} className={`px-3 py-2 text-sm font-medium transition-colors ${item.href === "#home"
                ? "text-slate-900 dark:text-slate-100"
                : "text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"}`}>
                    {item.label}
                  </button>))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button_1.Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">
              <lucide_react_1.Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
              <lucide_react_1.Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
              <span className="sr-only">Toggle theme</span>
            </button_1.Button>
            
            <sheet_1.Sheet open={isOpen} onOpenChange={setIsOpen}>
              <sheet_1.SheetTrigger asChild>
                <button_1.Button variant="ghost" size="icon" className="md:hidden">
                  <lucide_react_1.Menu className="h-6 w-6"/>
                  <span className="sr-only">Toggle menu</span>
                </button_1.Button>
              </sheet_1.SheetTrigger>
              <sheet_1.SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (<button key={item.href} onClick={() => scrollToSection(item.href)} className="text-left px-4 py-2 text-lg font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {item.label}
                    </button>))}
                </nav>
              </sheet_1.SheetContent>
            </sheet_1.Sheet>
          </div>
        </div>
      </div>
    </nav>);
}
