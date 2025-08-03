import { z } from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { error: "请输入会议名称" }),
  agentId: z.string().min(1, { error: "请选择会话智能体" }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { error: "id不能为空" }),
});
