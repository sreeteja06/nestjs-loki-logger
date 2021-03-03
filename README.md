# Nest Js Grafana loki logger.

A Nest Js module to push logs to grafana loki extending the built-in nest js Logger Class.

# Quick start
Import LokiLoggerModule into the root AppModule and use the forRoot() method to configure it.

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
    }),
  ],
})
export class AppModule {}
```

## Using the logger
```typescript
import { Controller, Get } from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';

private readonly lokiLogger = new LokiLogger(AppController.name);

@Controller()
export class AppController {
  constructor() {}

  private readonly lokiLogger = new LokiLogger(AppController.name);   // adds context label

  @Get()
  getHello(): string {
    this.lokiLogger.debug('this is how we rock', undefined, {
      label: 'testing', // you can set specifc labels to the log
    });
    return 'hello';
  }
}
```
