import { DynamicModule, Global, Module } from '@nestjs/common';
import { LokiLogger } from './nest-loki.service';
import { NestLokiModuleOptions } from './typings/nest-loki';

@Global()
@Module({
  providers: [LokiLogger],
})
export class LokiLoggerModule {
  static forRoot(
    options: NestLokiModuleOptions
  ): DynamicModule {
    const moduleForRoot: DynamicModule = {
      module: LokiLoggerModule,
      controllers: [],
      providers: [LokiLogger.forRoot(options)],
    };

    return moduleForRoot;
  }
}
