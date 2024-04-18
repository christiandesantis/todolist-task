export default () => ({
  env: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.NEST_CORS_ORIGIN || 'http://localhost:9000',
  },
  port:
    process.env.NEST_PORT ||
    ((process.env.NODE_ENV || 'development') === 'production' ? 8443 : 3000),
  jwt: {
    secret: process.env.NEST_JWT_SECRET || 'secret123',
    expiresIn: process.env.NEST_JWT_EXPIRES_IN || '1d',
    cookieName: process.env.NEST_JWT_COOKIE_NAME || 'todolist-auth',
  },
  ssl: {
    key: process.env.DOCKER_NGINX_SSL_KEY || '/etc/ssl/private/key.pem',
    cert: process.env.DOCKER_NGINX_SSL_CERT || '/etc/ssl/certs/cert.pem',
  },
  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host:
      process.env.DB_HOST ||
      `${process.env.DOCKER_CONTAINER_PREFIX || 'todolist'}_${process.env.DB_DIALECT || 'mysql'}`,
    port: process.env.DB_PORT || 3306,
    name:
      process.env.DB_NAME ||
      `${process.env.DOCKER_CONTAINER_PREFIX || 'todolist'}`,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PSWD || 'root',
  },
  typeorm: {
    synchronize: process.env.NEST_TYPEORM_SYNC === 'true' || false,
    logging: process.env.NEST_TYPEORM_LOG === 'true' || false,
    seeding: {
      factories:
        process.env.NEST_TYPEORM_SEEDING_FACTORIES ||
        'src/factories/**/*{.ts,.js}',
      seeds:
        process.env.NEST_TYPEORM_SEEDING_SEEDS || 'src/seeds/**/*{.ts,.js}',
    },
  },
  redis: {
    host:
      process.env.NEST_REDIS_HOST ||
      `${process.env.DOCKER_CONTAINER_PREFIX || 'todolist'}_redis`,
    port: process.env.NEST_REDIS_PORT || 6379,
  },
  smtp: {
    host: process.env.NEST_SMTP_HOST || 'smtp.gmail.com',
    port: process.env.NEST_SMTP_PORT || 465,
    secure: process.env.NEST_SMTP_SECURE === 'true' || true,
    name: process.env.NEST_SMTP_NAME || 'ExampleApp',
    user:
      process.env.NEST_SMTP_USER ||
      `${process.env.DOCKER_CONTAINER_PREFIX || 'todolist'}@example.com`,
    password: process.env.NEST_SMTP_PSWD || '',
  },
  cli: {
    env: process.env.NEST_CLI_ENV || './dist/cli.js',
  },
});
