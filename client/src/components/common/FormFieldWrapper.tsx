import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormFieldWrapper {
	form: UseFormReturn<any, any, undefined>;
	name: string;
	label: string;
	placeholder: string;
}

const FormFieldWrapper = ({
	form,
	name,
	label,
	placeholder,
}: FormFieldWrapper) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input placeholder={placeholder} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormFieldWrapper;
