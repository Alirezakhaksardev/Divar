import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import defaultOptions from "configs/reactQuery";
import Layout from "layouts/Layout";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom"
import Router from "router/Router"

function App() {

  const queryClient = new QueryClient({ defaultOptions });


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
export default App
