import * as schema from '@/server/schema';
import {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from 'drizzle-orm';

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelations<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>['with'];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelations<TableName> | undefined = undefined
> = BuildQueryResult<TSchema, TSchema[TableName], { with: With }>;

export type VariantsWithImagesTags = InferResultType<
  'productVariants',
  {
    variantImages: true;
    variantTags: true;
  }
>;

export type product = InferResultType<
  'products',
  {
    productVariants: true;
  }
>;

export type ProductWithCategory = InferResultType<
  'products',
  {
    categories: true;
  }
>;
export type VariantsWithProduct = InferResultType<
  'productVariants',
  {
    variantImages: true;
    variantTags: true;
    product: true;
  }
>;

export type ReviewsWithUser = InferResultType<
  'reviews',
  {
    user: true;
  }
>;

export type TotalOrders = InferResultType<
  'orderProduct',
  {
    order: { with: { user: true } };
    product: true;
    productVariants: {
      with: { variantImages: true };
    };
  }
>;
