import type { RemoteQuery } from "@sveltejs/kit";
import {
  aliasedTableColumn,
  getTableColumns,
  getTableName,
  type Table,
  type View,
} from "drizzle-orm";
import type { PgViewConfig } from "drizzle-orm/pg-core";

export function promiseToRemoteQuery<T>(
  promise: Promise<T | undefined>,
): RemoteQuery<T> {
  return promise as RemoteQuery<T>;
}

export function getViewColumns<V extends View>(view: V): Omit<
  V,
  | typeof PgViewConfig
  | "_"
  | "$inferSelect"
  | "$inferInsert"
  | "getSQL"
  | "shouldOmitSQLParens"
  | "enableRLS"
> {
  const symbol = Object.getOwnPropertySymbols(view).find(
    (s) => s.description === "drizzle:ViewBaseConfig", // don't ask
  );
  // biome-ignore lint/suspicious/noTsIgnore: typescript is fun
  // @ts-ignore
  // biome-ignore lint/style/noNonNullAssertion: too bad it's still javascript wtf
  return view[symbol!].selectedFields;
}

export function mapTableAs(table: Table) {
  const tableName = getTableName(table);
  const columns = getTableColumns(table);
  return Object.fromEntries(
    Object.entries(columns).map(([name, column]) => [
      name,
      aliasedTableColumn(column, `${tableName}.${column.name}`),
    ]),
  );
}

// function mapColumnAsPrefixed<
//   DT extends ColumnDataType,
//   CT extends string,
//   Config extends ColumnBaseConfig<DT, CT>,
//   Column extends PgColumn<Config>,
// >(column: Column, prefix: string) {
//   return sql<GetColumnData<Column>>`${column}`.mapWith(column).as(`${prefix}.${column.name}`);
// }
