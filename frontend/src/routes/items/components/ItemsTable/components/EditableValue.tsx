import { Input } from '@/components/ui/input';
import { ComponentProps, ReactNode, useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { twMerge } from 'tailwind-merge';

type EditableValueProps = ComponentProps<typeof Input> & {
	renderValue?: (value: EditableValueProps['value']) => ReactNode;
	actions?: (
		value: EditableValueProps['value'],
		close: () => void,
	) => ReactNode;
};

function EditableValue({
	renderValue,
	value,
	actions,
	className,
	...props
}: EditableValueProps) {
	const [open, setOpen] = useState(false);
	const [val, setVal] = useState(value);

	return (
		<Popover open={open}>
			<div className="flex items-center justify-end gap-2">
				<div>{renderValue ? renderValue(value) : value}</div>

				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						disabled={!actions}
						onClick={() => setOpen(true)}
					>
						<PencilIcon className="w-3 h-3" />
					</Button>
				</PopoverTrigger>
				<PopoverContent side="right">
					<form
						onSubmit={(event) => {
							event.preventDefault();
						}}
						className="flex items-center gap-2"
					>
						<Input
							{...props}
							className={twMerge('w-36', className)}
							value={val}
							onChange={({ target }) => {
								setVal(target.value);
							}}
						/>
						{actions?.(val, () => setOpen(false))}
					</form>
				</PopoverContent>
			</div>
		</Popover>
	);
}

export default EditableValue;
