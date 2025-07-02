type LogLevel = 'debug' | 'info' | 'warn' | 'error';


class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  
  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    const prefix = this.getLevelPrefix(level);
    
    let formattedMessage = `${prefix} [${timestamp}] ${message}`;
    
    if (data) {
      formattedMessage += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    return formattedMessage;
  }
  
  private getLevelPrefix(level: LogLevel): string {
    const prefixes = {
      debug: '🔍 DEBUG',
      info: 'ℹ️  INFO',
      warn: '⚠️  WARN',
      error: '❌ ERROR'
    };
    return prefixes[level];
  }
  
  private shouldLog(level: LogLevel): boolean {
    // Trong production, chỉ log warn và error
    if (!this.isDevelopment) {
      return level === 'warn' || level === 'error';
    }
    return true;
  }
  
  debug(message: string, data?: unknown): void {
    if (!this.shouldLog('debug')) return;
    
    console.log(this.formatMessage('debug', message, data));
  }
  
  info(message: string, data?: unknown): void {
    if (!this.shouldLog('info')) return;
    
    console.info(this.formatMessage('info', message, data));
  }
  
  warn(message: string, data?: unknown): void {
    if (!this.shouldLog('warn')) return;
    
    console.warn(this.formatMessage('warn', message, data));
  }
  
  error(message: string, error?: unknown): void {
    if (!this.shouldLog('error')) return;
    
    console.error(this.formatMessage('error', message, error));
    
    // Trong production, có thể gửi error lên service như Sentry
    if (!this.isDevelopment && typeof window !== 'undefined') {
      // TODO: Integrate with error tracking service
      // Sentry.captureException(error);
    }
  }
  
  // Method để log API calls
  apiCall(method: string, url: string, duration?: number): void {
    const message = duration 
      ? `API ${method.toUpperCase()} ${url} completed in ${duration}ms`
      : `API ${method.toUpperCase()} ${url}`;
    
    this.info(message);
  }
  
  // Method để log user actions
  userAction(action: string, data?: unknown): void {
    this.info(`User Action: ${action}`, data);
  }
}

// Export singleton instance
export const logger = new Logger();
export default logger;