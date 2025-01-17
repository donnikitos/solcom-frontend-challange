import { QueryClientProvider } from '@tanstack/react-query';
import ItemsRoute from './routes/items';
import { queryClient } from './queries';

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ItemsRoute />
		</QueryClientProvider>
	);
}

export default App;
