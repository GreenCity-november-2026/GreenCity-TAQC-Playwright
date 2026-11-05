import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseClient {
  private token?: string;

  constructor(
    protected readonly request: APIRequestContext,
    readonly baseApiUrl: string,
  ) {}

  setToken(token: string | undefined): void {
    this.token = token;
  }

  protected headers(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  protected url(path: string): string {
    const base = this.baseApiUrl.endsWith('/') ? this.baseApiUrl : `${this.baseApiUrl}/`;
    return new URL(path.replace(/^\//, ''), base).toString();
  }

  protected get(path: string): Promise<APIResponse> {
    return this.request.get(this.url(path), { headers: this.headers() });
  }

  protected post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), { headers: this.headers(), data });
  }

  protected put(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.put(this.url(path), { headers: this.headers(), data });
  }

  protected delete(path: string): Promise<APIResponse> {
    return this.request.delete(this.url(path), { headers: this.headers() });
  }
}
