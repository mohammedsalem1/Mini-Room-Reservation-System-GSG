import { ApiProperty } from "@nestjs/swagger";
import { User, UserRole } from "generated/prisma";

export class RegisterDto {
    @ApiProperty({
        description: "The username of the user",
        example: "mohammed123",
        required: true,
        type: String,
    })
    userName: string;

    @ApiProperty({
        description: "Email address of the user",
        example: "mohammed@example.com",
        required: true,
        type: String,
    })
    userEmail: string;

    @ApiProperty({
        description: "Password for the account",
        example: "StrongPassword123",
        required: true,
        type: String,
    })
    userPassword: string;

    @ApiProperty({
        description: "Role of the user",
        enum: UserRole,
        example: UserRole.GUEST,
        required: true
    })
    userRole: UserRole;
}
export class LoginDto {
  @ApiProperty({
        description: "Email address of the user",
        example: "mohammed@example.com",
        required: true,
        type: String,
    })
    userEmail: string;

    @ApiProperty({
        description: "Password for the account",
        example: "StrongPassword123",
        required: true,
        type: String,
    })
    userPassword: string;    
}
export class UserResponseDto {
  @ApiProperty({
    description: "User information without password and ID",
    type: Object
  })
  user:  Omit<User , 'userPassword'>;

  @ApiProperty({
    description: "JWT access token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  })
  token: string;
}
