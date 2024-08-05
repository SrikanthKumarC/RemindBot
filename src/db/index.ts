import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { config } from 'dotenv';
config({ path: '.env' });

const client = createClient({ url: 'libsql://remindbot-srikanthc.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjE5OTU4NjIsImlkIjoiOWRlN2IyNDctNjdmYS00NDRmLWIyMTgtZWViY2RiOTYxYzE2In0.uu9oe-kdQptvdfewWLJAi72A2q8nySEfDByRXcwJL3Gdr7BJqGaV9Gc4y4oRYoKj5yBLywmSkuspMYPF57PZCg' });

export const db = drizzle(client);



