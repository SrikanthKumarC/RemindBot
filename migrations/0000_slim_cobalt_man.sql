CREATE TABLE `reminders` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_by` text NOT NULL,
	`title` text NOT NULL,
	`time` text NOT NULL,
	`reminded` integer DEFAULT 0 NOT NULL,
	`text_modifiers` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`int_modifiers` integer DEFAULT false NOT NULL
);
