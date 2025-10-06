import {
  Outlet,
  RouterProvider,
  createBrowserHistory,
  createRootRoute,
  createRouter
} from "@tanstack/react-router";
import { LandingPage } from "../pages/LandingPage";
import { IntakeStartPage } from "../pages/IntakeStartPage";
import { IntakeReviewPage } from "../pages/IntakeReviewPage";
import { IntakeSuccessPage } from "../pages/IntakeSuccessPage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { TermsPage } from "../pages/TermsPage";
import { SecurityPage } from "../pages/SecurityPage";
import { LoginPage } from "../pages/LoginPage";
import { ConsentProvider } from "../context/ConsentContext";
import { IntakeProvider } from "../context/IntakeContext";

const RootComponent = () => (
  <ConsentProvider>
    <IntakeProvider>
      <Outlet />
    </IntakeProvider>
  </ConsentProvider>
);

const rootRoute = createRootRoute({
  component: RootComponent
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    {
      path: "/",
      component: LandingPage
    },
    {
      path: "/intake/start",
      component: IntakeStartPage
    },
    {
      path: "/intake/review",
      component: IntakeReviewPage
    },
    {
      path: "/intake/success",
      component: IntakeSuccessPage
    },
    {
      path: "/legal/privacy",
      component: PrivacyPage
    },
    {
      path: "/legal/terms",
      component: TermsPage
    },
    {
      path: "/security",
      component: SecurityPage
    },
    {
      path: "/login",
      component: LoginPage
    }
  ]),
  history: createBrowserHistory()
});

export const AppRouter = () => <RouterProvider router={router} />;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
