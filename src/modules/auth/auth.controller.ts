import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipes';
import { loginValidationSchema, registerValidationSchema } from './utils/auth.validation.schema';
import { IsPublic } from 'src/decorator/public.decorator';

@ApiTags("Auth")
@Controller('auth')
@IsPublic(true)

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UsePipes(new ZodValidationPipe(registerValidationSchema))
  @Post('register')
  @ApiOperation({summary:"Register User"})
  @ApiOkResponse({description:"the user register successfully"})
  @ApiConflictResponse({description:"the user is exist"})
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  
  @UsePipes(new ZodValidationPipe(loginValidationSchema))  
  @Post('login')
  @ApiOperation({summary:"login User"})
  @ApiOkResponse({description:"the user login successfully"})
  login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto)
  }
}
