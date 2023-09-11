const ormconfig = {
  ssl: process.env.NODE_ENV == 'production',
  extra: {
    ssl:
      process.env.NODE_ENV == 'production'
        ? { rejectUnauthorized: false }
        : null,
  },
  applicationName: 'EquipMe',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  entities: ['dist/src/modules/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/core/db/migrations/*.js'],
  seeds: ['dist/src/core/db/seeds/*.js'],
  factories: ['dist/src/core/db/factories/*.js'],
  cli: {
    migrationsDir: 'src/core/db/migrations',
    seedsDir: 'src/core/db/seeds',
    factoriesDir: 'src/core/db/factories',
  },
  // logging: true
};

switch (process.env.NODE_ENV) {
  case 'development':
    break;
  case 'production':
    Object.assign(ormconfig, { migrationsRun: true });
    break;
  default:
    throw new Error('Unknown environment');
}

module.exports = ormconfig;
