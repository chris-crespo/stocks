import { z, ZodRawShape, ZodTypeAny } from "zod"

export const Success = z.literal('success').brand<'Success'>()
export const Error = z.literal('error').brand<'Error'>()

export const Id = z.number().min(0).brand<'Id'>()

export const Name = z.string({ required_error: 'Name is required.'})
  .min(1, 'Name is required.')
  .brand<'Name'>()

export const Price = z.preprocess(Number, z.number().nonnegative().brand<'Price'>())

export const Message = z.string().min(1).brand<'Message'>()
export const Messages = z.array(Message).nonempty().brand<'Messages'>()

export const Url = z.string().url().brand<'Url'>()

export const Amount = z.number().min(0).brand<'Amount'>()

export const BaseSuccess = <D extends ZodRawShape>(data: D = {} as any) => z.object({
  status: Success.default('success'),
  message: Message.optional(),
  data: z.object(data).default({} as any)
})

export const BaseFailure = <
  R extends Record<string, typeof Messages>,
>(errors: R = {} as any) => z.object({
  status: Error.default('error'),
  message: Message.optional(),
  errors: z.object(errors).partial().default({} as any)
})

export const Page = <T extends ZodTypeAny>(type: T) => z.object({
  data: z.array(type),
  total: Amount
})

export const BasePaginated = <T extends ZodTypeAny>(type: T) => z.object({
  status: Success,
  data: z.object({
    page: Page(type)
  })
})
