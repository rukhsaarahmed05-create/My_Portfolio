"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSection = ContactSection;
const react_query_1 = require("@tanstack/react-query");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const form_1 = require("@/components/ui/form");
const use_toast_1 = require("@/hooks/use-toast");
const queryClient_1 = require("@/lib/queryClient");
const schema_1 = require("@shared/schema");
const lucide_react_1 = require("lucide-react");
function ContactSection() {
    const { toast } = (0, use_toast_1.useToast)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schema_1.insertContactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });
    const contactMutation = (0, react_query_1.useMutation)({
        mutationFn: async (data) => {
            const response = await (0, queryClient_1.apiRequest)("POST", "/api/contact", data);
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "Message sent successfully!",
                description: "Thank you for your message. I'll get back to you soon.",
            });
            form.reset();
        },
        onError: (error) => {
            toast({
                title: "Failed to send message",
                description: error.message || "Please try again later.",
                variant: "destructive",
            });
        },
    });
    const onSubmit = (data) => {
        contactMutation.mutate(data);
    };
    return (<section id="contact" className="py-16 lg:py-24 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Interested in collaborating on AI projects or discussing machine learning opportunities? 
            I'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-lg">
                  <lucide_react_1.Mail className="h-6 w-6 text-brand-600 dark:text-brand-400"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">[your-email@domain.com]</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-brand-600 dark:text-brand-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">LinkedIn</h3>
                  <p className="text-slate-600 dark:text-slate-400">[your-linkedin-profile]</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-brand-600 dark:text-brand-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">GitHub</h3>
                  <p className="text-slate-600 dark:text-slate-400">[your-github-username]</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-lg">
                  <lucide_react_1.MapPin className="h-6 w-6 text-brand-600 dark:text-brand-400"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">Location</h3>
                  <p className="text-slate-600 dark:text-slate-400">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          
          <card_1.Card className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <card_1.CardContent className="p-8">
              <form_1.Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <form_1.FormField control={form.control} name="name" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          Name *
                        </form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input {...field} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"/>
                        </form_1.FormControl>
                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  
                  <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          Email *
                        </form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="email" {...field} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"/>
                        </form_1.FormControl>
                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  
                  <form_1.FormField control={form.control} name="subject" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          Subject
                        </form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input {...field} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"/>
                        </form_1.FormControl>
                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  
                  <form_1.FormField control={form.control} name="message" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          Message *
                        </form_1.FormLabel>
                        <form_1.FormControl>
                          <textarea_1.Textarea {...field} rows={5} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"/>
                        </form_1.FormControl>
                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  
                  <button_1.Button type="submit" disabled={contactMutation.isPending} className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-lg font-medium transition-colors">
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </button_1.Button>
                </form>
              </form_1.Form>
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>
    </section>);
}
