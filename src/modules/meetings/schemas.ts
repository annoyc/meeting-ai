import { z } from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { error: "请输入代理人名称" }),
  instructions: z.string().min(1, { error: "请输入代理人提示词" }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { error: "id不能为空" }),
});
