import sqlite3 from "better-sqlite3"; // synthetic default export
// constructor function Database(filenameGiven, options) {
// import sqlite3 = require("better-sqlite3");

class SQLiteAdapter {
  private readonly db: sqlite3.Database;

  constructor(database: sqlite3.Database) {
    this.db = database;
  }

  query: (statement: string, params: unknown[]) => unknown[][] = (
    statement,
    params
  ) =>
    this.db
      .prepare(statement)
      .raw()
      .all(...params) as unknown[][];

  execute(statement: string, params: unknown[] = []): sqlite3.RunResult {
    return this.db.prepare(statement).run(...params);
  }
}

const sqliteDB = new sqlite3("sqlite.db");
export const db = new SQLiteAdapter(sqliteDB);
