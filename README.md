# Nest Js Grafana loki logger.

A Nest Js module to push logs to grafana loki extending the built-in nest js Logger Class.

# Quick start
Import LokiLoggerModule into the root AppModule and use the `forRoot()` method to configure it.

```typescript
import { LokiLoggerModule } from 'nestjs-loki-logger';

@Module({
  imports: [
    LokiLoggerModule.forRoot({
      lokiUrl: 'http://localhost:3100',   // loki server
      labels: {
        'label': 'testing',     // app level labels, these labels will be attached to every log in the application
      },
      logToConsole: false,
      gzip: false // contentEncoding support gzip or not
    }),
  ],
})
export class AppModule {}
```

## Async configuration

You may want to pass your module options asynchronously instead of statically.
In this case, use the `forRootAsync()` method, which provides a way to deal
with async configuration.

```typescript
import { LokiLoggerModule } from 'nestjs-loki-logger';

@Module({
  imports: [
    LokiLoggerModule.forRootAsync({
      useFactory: () => ({
        lokiUrl: 'http://localhost:3100',   // loki server
        labels: {
          'label': 'testing',
        },
        logToConsole: false,
        gzip: false
      }),
    }),
  ],
})
export class AppModule {}
```

Our factory behaves like any other asynchronous provider (e.g., it can be `async`,
and it's able to `inject` dependencies through inject).

```typescript
import { LokiLoggerModule } from 'nestjs-loki-logger';

@Module({
  imports: [
    LokiLoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        lokiUrl: configService.get('LOKI_URL'),   // loki server url from config
        labels: {
          'label': 'testing',
        },
        logToConsole: false,
        gzip: false
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Using the logger
```typescript
import { Controller, Get } from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';

@Controller()
export class AppController {
  constructor() {}

  private readonly lokiLogger = new LokiLogger(AppController.name);   // adds context label

  @Get()
  getHello(): string {
  
    this.lokiLogger.debug('this is how we rock');
    this.lokiLogger.debug('this is how we rock', undefined, {
      label: 'testing', // you can set specifc labels to the log
    });
    return 'hello';
  }
}
```
