import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MysqlDB',
  connector: 'mysql',
  url: 'mysql://root:passe@mysql:3306/keahire_db',
  host: 'mysql',
  port: 0,
  user: 'root',
  password: 'passe',
  database: 'keahire_db'
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MysqlDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MysqlDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
