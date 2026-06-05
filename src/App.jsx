import AppRouter from "./routes/app-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// tanStack query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}

export default App
