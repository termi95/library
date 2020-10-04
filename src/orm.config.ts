import { TypeOrmModuleOptions } from '@nestjs/typeorm'
export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'Test123!',
    port: 5433,
    host: '127.0.0.1',
    database: 'library',
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
};