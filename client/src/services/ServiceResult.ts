export interface ServiceResult<T> {
	ok: boolean;
	data?: T;
	message?: string;
}
