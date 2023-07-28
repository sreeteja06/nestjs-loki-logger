import { DynamicModule, Global, Module } from '@nestjs/common';
import { LokiLogger } from './nest-loki.service';
import {
  NestLokiModuleAsyncOptions,
  NestLokiModuleOptions,
} from './typings/nest-loki';

@Global()
@Module({
  providers: [LokiLogger],
})
export class LokiLoggerModule {
  static forRoot(options: NestLokiModuleOptions): DynamicModule {
    return {
      module: LokiLoggerModule,
      controllers: [],
      providers: [LokiLogger.forRoot(options)],
    };
  }

  static forRootAsync(options: NestLokiModuleAsyncOptions): DynamicModule {
    return {
      module: LokiLoggerModule,
      imports: options.imports,
      providers: [
        {
          provide: LokiLogger,
          useFactory: async (...args: any[]): Promise<LokiLogger> => {
            const _options: NestLokiModuleOptions = await options.useFactory(
              ...args,
            );
            return LokiLogger.forRoot(_options);
          },
          inject: options.inject || [],
        },
      ],
      exports: [LokiLogger],
    };
  }
}
