import { BrowserRouter, Route, Routes } from "react-router";
import ThankYou from "./pages/ThankYou";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import PageSpinner from "./ui/PageSpinner";
import { useTheme } from "./hooks/useTheme";
import { FormDataProvider } from "./context/FormContext";
import AssignSlot from "./features/slotPage/AssignSlots";

const AppLayout = lazy(() => import("./ui/AppLayout"));
//const PremiumForm =lazy(()=>import("./pages/PremiumForm"))
const NotFound = lazy(() => import("./pages/NotFound"));
const Success = lazy(() => import("./pages/Success"));
const EventEnd=lazy(()=>import("./pages/EventEnd"));
const Feedback=lazy(()=>import("./pages/Feedback/Feedback"))
const FeedbackThankYou=lazy(()=>import("./pages/ThankYouFeedback"))

function App() {
  useTheme(); 

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 0 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <FormDataProvider>
        <div className="min-h-sacreen bg-white text-black dark:bg-black  dark:text-darkPrimary transition-colors duration-300">
          <BrowserRouter basename="/Apec26_Visits/">
            <Suspense fallback={<PageSpinner />}>
              <Routes>
                <Route element={<AppLayout />}>
                  {/*<Route path="/" element={<PremiumForm />} />*/}
                  <Route path="/" element={<EventEnd />} />
                  <Route path="/ThankYou" element={<ThankYou />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route  path="/ThankYouFeedback"   element={<FeedbackThankYou />}/>
                  <Route path="/assign-slots" element={<AssignSlot />}/>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </FormDataProvider>
    </QueryClientProvider>
  );
}

export default App;
