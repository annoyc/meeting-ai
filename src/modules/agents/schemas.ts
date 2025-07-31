import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { error: "请输入代理人名称" }),
  instructions: z.string().min(1, { error: "请输入代理人提示词" }),
});
