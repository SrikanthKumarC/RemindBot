import { db } from "./index";
import { eq } from 'drizzle-orm';
import { reminders, InsertReminder, SelectReminder} from "./schema";

export async function createReminder(data: InsertReminder) {
  await db.insert(reminders).values(data);
}

export async function getReminders(userId: SelectReminder['createdBy']) {
    return db.select().from(reminders).where(eq(reminders.createdBy, userId));
}

export async function deleteReminder(id: string) {
  await db.delete(reminders).where(eq(reminders.id, id));
}