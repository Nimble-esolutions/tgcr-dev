// lib/logger.ts
import winston from 'winston';
import { NextApiRequest } from 'next';
import os from 'os';

// Configure Elasticsearch transport if enabled
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

if (process.env.ELK_ENABLED === 'true') {
  const { ElasticsearchTransport } = require('winston-elasticsearch');
  const esTransport = new ElasticsearchTransport({
    level: 'info',
    clientOpts: { 
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' 
    },
    indexPrefix: 'nextjs-logs',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  });

  esTransport.on('error', (err: Error) => {
    // Log transport errors to console
    console.error('ElasticsearchTransport error:', err);
  });

  transports.push(esTransport);
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'nextjs-app',
    host: os.hostname(),
    environment: process.env.NODE_ENV || 'development',
    node_version: process.version
  },
  transports
});

// Enhanced request logger method
export const requestLogger = (req: NextApiRequest) => {
  return logger.child({
    http: {
      method: req.method,
      url: req.url,
      user_agent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    },
    request_id: req.headers['x-request-id'] || generateRequestId()
  });
};

function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export default logger;