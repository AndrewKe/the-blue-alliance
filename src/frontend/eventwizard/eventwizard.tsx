import "./eventwizard.less";

import ReactDOM from "react-dom";
import { AuthProvider } from "./hooks/useAuth";
import EventWizardFrame from "./components/EventWizardFrame";
import { EventProvider } from "./hooks/useSelectedEvent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <EventProvider>
      <AuthProvider>
        <EventWizardFrame />
        <Toaster
          position="top-center"
          containerStyle={{
            top: 60,
          }}
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#4caf50",
                secondary: "white",
              },
            },
            style: {
              maxWidth: 500,
            },
          }}
        />
      </AuthProvider>
    </EventProvider>
  </QueryClientProvider>,
  document.getElementById("content")
);

// @ts-ignore
module?.hot.accept();
