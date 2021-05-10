export interface GoodResponse {
	url: string;
	statusMessage?: string;
	statusCode: number;
	headers?: Record<string, unknown>;
	body?: any;
	ip?: string;
}

export interface BadResponse {
	url: string;
	name?: string;
	message?: string;
	stack?: string;
	statusCode: number;
}

export interface Response extends GoodResponse, BadResponse {}
