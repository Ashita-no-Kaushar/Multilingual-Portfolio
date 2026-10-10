import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import ConditionalNavbar from "@/components/conditional-navbar";
import PreloaderWrapper from "@/components/preloader-wrapper";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";
import HomePage from "@/pages/home";
import ProfilePage from "@/app/profile/page";
import ResumePage from "@/app/resume/page";
import ProjectDetailsPage from "@/app/projects/[id]/page";
import ProjectReportPage from "@/app/projects/[id]/report/page";
import NotFound from "@/pages/not-found";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { PortfolioSettingsProvider } from "@/i18n";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ConditionalNavbar />
      <PreloaderWrapper>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/resume" component={ResumePage} />
          <Route path="/projects/:id/report" component={ProjectReportPage} />
          <Route path="/projects/:id" component={ProjectDetailsPage} />
          <Route component={NotFound} />
        </Switch>
      </PreloaderWrapper>
      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PortfolioSettingsProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </PortfolioSettingsProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
