import { type Column, type GetColumnData, getTableColumns, type SQL, sql, Table } from "drizzle-orm";
import type {
  Association,
  Person,
  PersonOrAssociation,
} from "$lib/server/db/schema";

export function formatWithOwner<T>({
  owned,
  ownerPerson,
  ownerAssociation,
}: {
  owned: T;
  ownerPerson: Person | null;
  ownerAssociation: Association | null;
}) {
  return {
    ...owned,
    owner: (ownerPerson
      ? { isAssociation: false, ...ownerPerson }
      : {
          isAssociation: true,
          ...ownerAssociation,
        }) as PersonOrAssociation,
  };
}


// export function coalesceTables(tableA: Table, tableB: Table){
//   const columnsA = getTableColumns(tableA);
//   const columnsB = getTableColumns(tableB);
//   for (const columnName in columnsA) {
//     if (columnsB[columnName] !== undefined) {
//
//     }
//   }
// }

// FOLLOWING CODE FROM https://github.com/drizzle-team/drizzle-orm/issues/3708#issuecomment-3282649813

type AnySql = SQL | Column;
type Coalesce<Array extends AnySql[]> = Array extends [
  ...infer Optionals,
  infer Last,
]
  ?
      | Exclude<ExtractSqlType<Optionals[number]>, null | undefined>
      | ExtractSqlType<Last>
  : never;
type ExtractSqlType<S> =
  S extends SQL<infer T>
    ? T
    : S extends Column
      ? GetColumnData<S, "query">
      : never;

export function coalesce<Args extends [AnySql, AnySql, ...AnySql[]]>(
  ...args: Args
) {
  return sql<Coalesce<Args>>`coalesce(${sql.join(
    args.map((a) => sql`${a}`),
    sql.raw(","),
  )})`;
}
