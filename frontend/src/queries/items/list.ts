import IItem from '@/iterfaces/item';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Response = { data: IItem[] };

function useItemsQuery() {
	return useQuery({
		queryKey: ['items'],
		queryFn: () =>
			axios
				.get<Response>('/items')
				.then(({ data }) => data.data),
	});
}

export default useItemsQuery;
