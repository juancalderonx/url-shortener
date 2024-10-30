import { ConfigService } from "@nestjs/config";
import pino from "pino";

import { Injectable } from "@/shared/dependency-injection/injectable";
import { Context, Logger, LoggerLevel, Message } from "@/shared/logger/domain";

export interface PinoLoggerDependencies {
  isEnabled?: boolean;
  level?: LoggerLevel;
}

@Injectable()
export class PinoLogger implements Logger {
  private readonly logger;

  constructor(
    dependencies: PinoLoggerDependencies,
    private readonly configService: ConfigService,
  ) {
    const isProduction = configService.get<string>("NODE_ENV") === "production";

    const pinoOptions: pino.LoggerOptions = {
      enabled: dependencies.isEnabled ?? true,
      messageKey: "message",
      level: this.getPinoLevelFrom(dependencies.level || "info"),
      formatters: {
        level: (label: string, level: number) => ({
          severity: this.getSeverityLevel(label),
          level,
        }),
      },
      base: undefined,
    };

    if (!isProduction) {
      pinoOptions.transport = {
        target: "pino-pretty",
        options: {
          colorize: true,
          messageKey: "message",
        },
      };
    }

    this.logger = pino(pinoOptions);
  }

  debug(message: Message, context?: Context): void {
    this.call("debug", message, context);
  }

  info(message: Message, context?: Context): void {
    this.call("info", message, context);
  }

  warn(message: Message, context?: Context): void {
    this.call("warn", message, context);
  }

  error(message: Message, context?: Context): void {
    this.call("error", message, context);
  }

  fatal(message: Message, context?: Context): void {
    this.call("fatal", message, context);
  }

  private getPinoLevelFrom(loggerLevel: LoggerLevel): pino.Level {
    const loggerLevelToPinoLevelMap: Record<LoggerLevel, pino.Level> = {
      debug: "debug",
      info: "info",
      warn: "warn",
      error: "error",
      fatal: "fatal",
    };

    return loggerLevelToPinoLevelMap[loggerLevel];
  }

  private call(level: pino.Level, message: Message, context?: Context) {
    const loggerMessage = {
      message,
      attributes: context?.attributes || {},
    };
    this.logger[level](loggerMessage);
  }

  private getSeverityLevel(label: string) {
    const pinoLevelToSeverityLookup: Record<pino.Level, string> = {
      trace: "DEBUG",
      debug: "DEBUG",
      info: "INFO",
      warn: "WARNING",
      error: "ERROR",
      fatal: "CRITICAL",
    };

    return (
      pinoLevelToSeverityLookup[label as pino.Level] ||
      pinoLevelToSeverityLookup.info
    );
  }
}
