DO $$ BEGIN
 CREATE TYPE "public"."remark" AS ENUM('tranding', 'new', 'featured', 'slider');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "remark" "remark" DEFAULT 'new';