import IItem from '@/iterfaces/item';
import { ColumnDef } from '@tanstack/react-table';
import EditableValue from './components/EditableValue';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { queryClient } from '@/queries';

export const columns: ColumnDef<IItem>[] = [
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'item_name',
		header: 'Item',
		filterFn: 'auto',
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell(props) {
			const category = props.row.original.category;
			const price = parseFloat(`${props.row.original.price}`).toFixed(2);

			return (
				<EditableValue
					type="number"
					min={0}
					step={0.5}
					value={price}
					renderValue={() => price}
					actions={(val, close) => (
						<>
							<Button
								type="submit"
								onClick={() =>
									axios
										.put(
											'/items/price/category/' + category,
											{
												percentage:
													(100 *
														parseFloat(`${val}`)) /
														parseFloat(price) -
													100,
											},
										)
										.then(() => {
											queryClient.invalidateQueries({
												queryKey: ['items'],
											});
											close();
										})
								}
							>
								Apply for all in "{category}"
							</Button>
						</>
					)}
				/>
			);
		},
	},
	{
		accessorKey: 'stock_quantity',
		header: 'Quantity',
		cell: (props) => (
			<EditableValue
				type="number"
				min={0}
				step={1}
				value={props.getValue() as IItem['stock_quantity']}
				actions={(val, close) => (
					<>
						<Button
							type="submit"
							onClick={() =>
								axios
									.put(
										'/items/' + props.row.original.item_id,
										{
											stock_quantity: val,
										},
									)
									.then(() => {
										queryClient.invalidateQueries({
											queryKey: ['items'],
										});
										close();
									})
							}
						>
							Apply
						</Button>
					</>
				)}
			/>
		),
	},
];
