import { Injectable, Logger, Optional } from '@nestjs/common';
import axios from 'axios';
import { NestLokiModuleOptions } from './typings/nest-loki';

@Injectable()
export class LokiLogger extends Logger {
  constructor(@Optional() protected context?: string) {
    super(context);
  }

  static lokiUrl = 'localhost:3100';
  static defaultLabels: any = {};
  static logToConsole = false;
  static gzip = false;

  private static sendLokiRequest = (
    labels: Record<string, string>,
    message: string,
  ): any => {
    const data = JSON.stringify({
      streams: [
        {
          stream: labels,
          values: [[(Date.now() * 1000000).toString(), message]],
        },
      ],
    });

    axios({
      method: 'POST',
      url: `${LokiLogger.lokiUrl}/loki/api/v1/push`,
      headers: LokiLogger.gzip
        ? {
            'Content-Type': 'application/json',
            'Content-Encoding': 'application/gzip',
          }
        : {
            'Content-Type': 'application/json',
          },
      data: data,
    })
      .then()
      .catch(error => console.log('error', error?.response?.data));
  };

  static forRoot(options: NestLokiModuleOptions): any {
    this.lokiUrl = options.lokiUrl;
    this.defaultLabels = options.labels ?? {};
    this.logToConsole = options.logToConsole ?? false;
    this.gzip = !!options.gzip;
    return LokiLogger;
  }

  error(
    message: string,
    trace?: string,
    context?: string,
    labels?: Record<string, string>,
  ): void {
    LokiLogger.sendLokiRequest(
      {
        ...LokiLogger.defaultLabels,
        ...labels,
        context: context ?? this.context,
        level: 'error',
      },
      message,
    );
    if (LokiLogger.logToConsole) {
      super.error(message, trace, context);
    }
  }

  log(
    message: string,
    context?: string,
    labels?: Record<string, string>,
  ): void {
    LokiLogger.sendLokiRequest(
      {
        ...LokiLogger.defaultLabels,
        ...labels,
        context: context ?? this.context,
        level: 'info',
      },
      message,
    );
    if (LokiLogger.logToConsole) {
      super.log(message, context);
    }
  }

  warn(
    message: string,
    context?: string,
    labels?: Record<string, string>,
  ): void {
    LokiLogger.sendLokiRequest(
      {
        ...LokiLogger.defaultLabels,
        ...labels,
        context: this.context,
        level: 'warn',
      },
      message,
    );
    if (LokiLogger.logToConsole) {
      super.warn(message, context);
    }
  }

  debug(
    message: string,
    context?: string,
    labels?: Record<string, string>,
  ): void {
    LokiLogger.sendLokiRequest(
      {
        ...LokiLogger.defaultLabels,
        ...labels,
        context: this.context,
        level: 'debug',
      },
      message,
    );
    if (LokiLogger.logToConsole) {
      super.debug(message, context);
    }
  }

  verbose(
    message: string,
    context?: string,
    labels?: Record<string, string>,
  ): void {
    LokiLogger.sendLokiRequest(
      {
        ...LokiLogger.defaultLabels,
        ...labels,
        context: this.context,
        level: 'verbose',
      },
      message,
    );
    if (LokiLogger.logToConsole) {
      super.verbose(message, context);
    }
  }
}
