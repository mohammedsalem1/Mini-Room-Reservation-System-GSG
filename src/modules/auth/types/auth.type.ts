import { UserRole } from "generated/prisma"

export type JwtTokenPayload = {
    sub :string
    role: UserRole
}