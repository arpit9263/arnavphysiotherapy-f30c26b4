import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "@/components/layout/SiteShell";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <SiteShell>
      <div className="container-page py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Error 404</p>
        <h1 className="mt-4 text-6xl md:text-8xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          The page you're looking for has moved or doesn't exist.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white shadow-soft">
          Back home
        </Link>
      </div>
    </SiteShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <SiteShell>
      <div className="container-page py-32 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">Please try again in a moment.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white"
          >Try again</button>
          <a href="/" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">Go home</a>
        </div>
      </div>
    </SiteShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arnav Physiotherapy Centre — Move Better. Live Pain-Free. | Jhansi" },
      { name: "description", content: "Premium physiotherapy & rehabilitation in Jhansi led by Dr. Dushyant Singh (BPT, MPT Sports). Book personalised care for back pain, sports injury, post-surgery recovery and more." },
      { name: "author", content: "Arnav Physiotherapy Centre" },
      { property: "og:title", content: "Arnav Physiotherapy Centre — Move Better. Live Pain-Free." },
      { property: "og:description", content: "Evidence-based physiotherapy, sports rehab and neurological recovery in Jhansi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
