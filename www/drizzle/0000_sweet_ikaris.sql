CREATE TYPE "public"."association_type" AS ENUM('Sanctuary', 'Rescue', 'Adoption', 'Care');--> statement-breakpoint
CREATE TABLE "association" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"description" text NOT NULL,
	"city" text NOT NULL,
	"type" "association_type" NOT NULL,
	"founded_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_message" (
	"id" uuid PRIMARY KEY NOT NULL,
	"friends_id" uuid NOT NULL,
	"author" uuid NOT NULL,
	"content" text NOT NULL,
	"sent_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "city" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" "point" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pet" (
	"id" uuid PRIMARY KEY NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" text NOT NULL,
	"species" text NOT NULL,
	"breed" text NOT NULL,
	"birth" timestamp with time zone NOT NULL,
	"description" text NOT NULL,
	"has_avatar" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" uuid PRIMARY KEY NOT NULL,
	"author" uuid NOT NULL,
	"content" text NOT NULL,
	"has_image" boolean DEFAULT false NOT NULL,
	"posted_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_comment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"post" uuid NOT NULL,
	"author" uuid NOT NULL,
	"content" text NOT NULL,
	"posted_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_like" (
	"post" uuid NOT NULL,
	"user" uuid NOT NULL,
	CONSTRAINT "post_like_post_user_pk" PRIMARY KEY("post","user")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"bio" text NOT NULL,
	"city" text NOT NULL,
	"has_avatar" boolean NOT NULL,
	"online" boolean NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users_pair" (
	"id" uuid NOT NULL,
	"left" uuid NOT NULL,
	"right" uuid NOT NULL,
	"friends" boolean NOT NULL,
	"pending" uuid,
	CONSTRAINT "users_pair_left_right_pk" PRIMARY KEY("left","right"),
	CONSTRAINT "users_pair_id_unique" UNIQUE("id"),
	CONSTRAINT "ids_order" CHECK ("users_pair"."left" < "users_pair"."right")
);
--> statement-breakpoint
ALTER TABLE "association" ADD CONSTRAINT "association_city_city_code_fk" FOREIGN KEY ("city") REFERENCES "public"."city"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_friends_id_users_pair_id_fk" FOREIGN KEY ("friends_id") REFERENCES "public"."users_pair"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet" ADD CONSTRAINT "pet_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_comment" ADD CONSTRAINT "post_comment_post_post_id_fk" FOREIGN KEY ("post") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_comment" ADD CONSTRAINT "post_comment_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_post_post_id_fk" FOREIGN KEY ("post") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_city_city_code_fk" FOREIGN KEY ("city") REFERENCES "public"."city"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_pair" ADD CONSTRAINT "users_pair_left_user_id_fk" FOREIGN KEY ("left") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_pair" ADD CONSTRAINT "users_pair_right_user_id_fk" FOREIGN KEY ("right") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_pair" ADD CONSTRAINT "users_pair_pending_user_id_fk" FOREIGN KEY ("pending") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "spatial_index" ON "city" USING gist ("location");