import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './modules/room/room.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule , 
    ConfigModule.forRoot({
      isGlobal:true
    }), RoomModule, BookingModule
  ],
  controllers: [AppController],
  providers: [AppService , 
    {
      provide: APP_GUARD , 
      useClass: AuthGuard
    } , 
    {
      provide: APP_GUARD , 
      useClass: RoleGuard
    }
  ],
})
export class AppModule {}
