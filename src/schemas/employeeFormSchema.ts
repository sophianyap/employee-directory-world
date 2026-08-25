import { z } from 'zod';

export const departmentOptions = [
  'Engineering',
  'Design',
  'Quality Assurance',
  'Management',
] as const;

export const employeeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Full name is required')
    .max(80, 'Full name must be 80 characters or fewer'),
  role: z
    .string()
    .trim()
    .min(2, 'Position is required')
    .max(80, 'Position must be 80 characters or fewer'),
  department: z.enum(departmentOptions, {
    message: 'Select a department',
  }),
  skills: z
    .array(z.string().trim().min(1))
    .min(1, 'Add at least one skill'),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;