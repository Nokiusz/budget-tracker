BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "transaction" (
	"id"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL DEFAULT 'no description',
	"value"	REAL NOT NULL DEFAULT 0,
	"categoryId"	INTEGER NOT NULL,
	"currencyId"	INTEGER NOT NULL,
	"typeId"	INTEGER NOT NULL,
	"priorityId"	INTEGER NOT NULL,
	"date"	TEXT NOT NULL DEFAULT '22-04-2022',
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "category" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "priority" (
	"id"	INTEGER NOT NULL,
	"value"	INTEGER NOT NULL DEFAULT 1,
	"name"	TEXT NOT NULL DEFAULT 'none',
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "type" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL DEFAULT 'income',
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "currency" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"symbol"	TEXT NOT NULL,
	"acronym"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "transaction" VALUES (1,'salary',6000.0,1,1,1,1,'22-04-2022');
INSERT INTO "category" VALUES (1,'salary');
INSERT INTO "category" VALUES (2,'car');
INSERT INTO "category" VALUES (3,'healthcare');
INSERT INTO "category" VALUES (4,'bills');
INSERT INTO "category" VALUES (5,'groceries');
INSERT INTO "priority" VALUES (1,1,'none');
INSERT INTO "priority" VALUES (2,2,'low');
INSERT INTO "priority" VALUES (3,3,'medium');
INSERT INTO "priority" VALUES (4,4,'high');
INSERT INTO "priority" VALUES (5,5,'very high');
INSERT INTO "type" VALUES (1,'income');
INSERT INTO "type" VALUES (2,'expense');
INSERT INTO "currency" VALUES (1,'Złoty','zł','PLN');
INSERT INTO "currency" VALUES (2,'Euro','€','EUR');
INSERT INTO "currency" VALUES (3,'Dollar','$','USD');
INSERT INTO "currency" VALUES (4,'Pound','£','GBP');
COMMIT;
