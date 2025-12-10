import { PaginationQueryType } from "src/types/utils.types";
import z, { ZodType } from "zod";

export const PaginationQueryTypeSchema = z.object({
    page :z.coerce.number().min(1).default(1),
    limit:z.coerce.number().min(1).default(3)
}) 