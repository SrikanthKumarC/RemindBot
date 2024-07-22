CREATE TABLE `reminders` (
	`id` text,
	`created_by` text NOT NULL,
	`title` text NOT NULL,
	`time` text NOT NULL,
	`text_modifiers` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`int_modifiers` integer DEFAULT false NOT NULL
);
