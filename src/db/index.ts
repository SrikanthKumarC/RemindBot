import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
const client = createClient({ url: 'libsql://remindbotxyz-srikanthc.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjE1ODM0NzYsImlkIjoiZjkxNjYzOTctZTNkNy00YjIxLTk0NDYtZDI4MmNjNDNlMjQxIn0.ToAzgRWt8TVvJYoPauplOe6L_DvTbHVjChGFTbpDMctP_mO1nHNpLO7z3rsugrPxxx1QEkkgBdUenWGgXaXHBg' });

export const db = drizzle(client);



