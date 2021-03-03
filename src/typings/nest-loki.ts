export interface NestLokiModuleOptions {
  lokiUrl: string;
  labels?: Record<string, string>;
  logToConsole?: boolean;
}
