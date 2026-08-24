import { z } from 'zod';

export const departmentEnum = z.enum([
  'Engineering',
  'Design',
  'Quality Assurance',
  'Management',
]);

export const employeeFormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(80, 'Name is too long'),
  role: z
    .string()
    .trim()
    .min(1, 'Position is required')
    .max(80, 'Position is too long'),
  department: departmentEnum,
  isOnline: z.boolean(),
  skills: z
    .array(z.string().trim().min(1))
    .min(1, 'Add at least one skill'),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;