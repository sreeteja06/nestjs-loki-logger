import { ModuleMetadata } from '@nestjs/common';

export interface NestLokiModuleOptions {
  lokiUrl: string;
  labels?: Record<string, string>;
  logToConsole?: boolean;
  gzip?: boolean;
  onLokiError?: (error: any) => void;
}

export interface NestLokiModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestLokiModuleOptions> | NestLokiModuleOptions;
  inject?: any[];
}
