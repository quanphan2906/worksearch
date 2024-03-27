import { UploadCloudIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { Button } from "../ui/button";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { ImageType } from "@/models/models";

function formatFileSize(bytes?: number) {
	if (!bytes) {
		return "0 Bytes";
	}
	bytes = Number(bytes);
	if (bytes === 0) {
		return "0 Bytes";
	}
	const k = 1024;
	const dm = 2;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const variants = {
	base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
	image: "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md",
	active: "border-2",
	accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
	reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

const ERROR_MESSAGES = {
	fileTooLarge(maxSize: number) {
		return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
	},
	fileInvalidType() {
		return "Invalid file type.";
	},
	tooManyFiles(maxFiles: number) {
		return `You can only add ${maxFiles} file(s).`;
	},
	fileNotSupported() {
		return "The file is not supported.";
	},
};

interface FileUploadProps {
	image: ImageType;
	onChange?: (image: ImageType) => void | Promise<void>;
	disabled?: boolean;
	dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
	className?: string;
}

const FileUpload = ({
	image,
	onChange = () => {},
	dropzoneOptions,
	className,
}: FileUploadProps) => {
	const imageUrl =
		image.url || (image.file ? URL.createObjectURL(image.file) : null);

	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		fileRejections,
		isFocused,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		multiple: false,
		onDrop: (acceptedFiles) => {
			if (acceptedFiles && acceptedFiles[0] !== undefined) {
				const f = acceptedFiles[0];
				onChange({ file: f, url: URL.createObjectURL(f) });
			}
		},
	});

	// styling
	const dropZoneClassName = useMemo(
		() =>
			twMerge(
				variants.base,
				isFocused && variants.active,
				imageUrl && variants.image,
				(isDragReject ?? fileRejections[0]) && variants.reject,
				isDragAccept && variants.accept,
				className
			).trim(),
		[
			isFocused,
			imageUrl,
			fileRejections,
			isDragAccept,
			isDragReject,
			className,
		]
	);

	// error validation messages
	const errorMessage = useMemo(() => {
		if (fileRejections[0]) {
			const { errors } = fileRejections[0];
			if (errors[0]?.code === "file-too-large") {
				return ERROR_MESSAGES.fileTooLarge(
					dropzoneOptions?.maxSize ?? 0
				);
			} else if (errors[0]?.code === "file-invalid-type") {
				return ERROR_MESSAGES.fileInvalidType();
			} else if (errors[0]?.code === "too-many-files") {
				return ERROR_MESSAGES.tooManyFiles(
					dropzoneOptions?.maxFiles ?? 0
				);
			} else {
				return ERROR_MESSAGES.fileNotSupported();
			}
		}
		return undefined;
	}, [fileRejections, dropzoneOptions]);

	return (
		<div>
			<div
				{...getRootProps({
					className: dropZoneClassName,
					style: {
						height: 50,
					},
				})}
			>
				{/* Main File Input */}
				<input {...getInputProps()} />
				{imageUrl ? (
					// Image Preview
					<Image
						className="h-full w-full rounded-md object-cover"
						src={imageUrl}
						alt={acceptedFiles[0]?.name}
						fill={true}
					/>
				) : (
					// Upload Icon
					<div className="flex flex-col items-center justify-center text-xs text-gray-400">
						<UploadCloudIcon className="mb-2 h-7 w-7" />
						<div className="text-gray-400">
							drag & drop to upload
						</div>
					</div>
				)}
			</div>
			{/* Error Text */}
			<div className="mt-1 text-xs text-red-500">{errorMessage}</div>
		</div>
	);
};

export default FileUpload;
