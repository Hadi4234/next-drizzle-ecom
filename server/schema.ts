import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  pgEnum,
  unique,
  PgTable,
  serial,
  real,
  index,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const RoleEnum = pgEnum('role', ['user', 'admin']);
export const ProductEnum = pgEnum('remark', [
  'tranding',
  'new',
  'featured',
  'slider',
]);
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  password: text('password'),
  twoFactorEnabled: boolean('twoFactorEnabled').default(false),
  role: RoleEnum('role').default('user'),
  customerID: text('customerID'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
export const emailTokens = pgTable(
  'emailTokens',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    email: text('email').notNull(),
  },
  (emailToken) => ({
    compoundKey: primaryKey({ columns: [emailToken.id, emailToken.token] }),
  })
);

export const passwordResetTokens = pgTable(
  'passwordResetTokens',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    email: text('email').notNull(),
  },
  (emailToken) => ({
    compoundKey: primaryKey({ columns: [emailToken.id, emailToken.token] }),
  })
);

export const twoFactorTokens = pgTable(
  'twoFactorTokens',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    email: text('email').notNull(),
  },
  (twoFactorToken) => ({
    compoundKey: primaryKey({
      columns: [twoFactorToken.id, twoFactorToken.token],
    }),
  })
);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  remark: ProductEnum('remark').default('new'),
  description: text('description').notNull(),
  created: timestamp('created').defaultNow(),
  price: real('price').notNull(),
});

export const productVariants = pgTable('productVariants', {
  id: serial('id').primaryKey(),
  color: text('color').notNull(),
  productType: text('productType').notNull(),
  updated: timestamp('updated').defaultNow(),
  productID: serial('productID')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
});

export const variantImages = pgTable('variantImages', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  size: real('size').notNull(),
  name: text('name').notNull(),
  order: real('order').notNull(),
  variantID: serial('variantID')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
});

export const variantTags = pgTable('variantTags', {
  id: serial('id').primaryKey(),
  tag: text('tag').notNull(),
  variantID: serial('variantID')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
});

export const reviews = pgTable(
  'reviews',
  {
    id: serial('id').primaryKey(),
    rating: real('rating').notNull(),
    comment: text('comment').notNull(),
    created: timestamp('created').defaultNow(),
    userId: text('userID')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    productID: serial('productID')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      productIdx: index('productIdx').on(table.productID),
      userIdx: index('userIdx').on(table.userId),
    };
  }
);

export const productsRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariants, {
    relationName: 'productVariants',
  }),
  reviews: many(reviews, { relationName: 'reviews' }),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ many, one }) => ({
    product: one(products, {
      fields: [productVariants.productID],
      references: [products.id],
      relationName: 'productVariants',
    }),
    variantImages: many(variantImages, {
      relationName: 'variantImages',
    }),
    variantTags: many(variantTags, {
      relationName: 'variantTags',
    }),
  })
);

export const variantImagesRelations = relations(variantImages, ({ one }) => ({
  productVariants: one(productVariants, {
    fields: [variantImages.variantID],
    references: [productVariants.id],
    relationName: 'variantImages',
  }),
}));

export const variantTagsRelations = relations(variantTags, ({ one }) => ({
  productVariants: one(productVariants, {
    fields: [variantTags.variantID],
    references: [productVariants.id],
    relationName: 'variantTags',
  }),
}));

export const reviewRelation = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
    relationName: 'user_reviews',
  }),
  product: one(products, {
    fields: [reviews.productID],
    references: [products.id],
    relationName: 'reviews',
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  reviews: many(reviews, {
    relationName: 'user_reviews',
  }),
  orders: many(orders, {
    relationName: 'user_orders',
  }),
}));

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userID: text('userID')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  total: real('total').notNull(),
  status: text('status').notNull(),
  created: timestamp('created').defaultNow(),
  receiptURL: text('receiptURL'),
  paymentIntentID: text('paymentIntentID'),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userID],
    references: [users.id],
    relationName: 'user_orders',
  }),
  orderProduct: many(orderProduct, {
    relationName: 'orderProduct',
  }),
}));

export const orderProduct = pgTable('orderProduct', {
  id: serial('id').primaryKey(),
  quantity: integer('quantity').notNull(),
  productVariantID: serial('productVariantID')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
  productID: serial('productID')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  orderID: serial('orderID')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
});

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
  order: one(orders, {
    fields: [orderProduct.orderID],
    references: [orders.id],
    relationName: 'orderProduct',
  }),
  product: one(products, {
    fields: [orderProduct.productID],
    references: [products.id],
    relationName: 'products',
  }),
  productVariants: one(productVariants, {
    fields: [orderProduct.productVariantID],
    references: [productVariants.id],
    relationName: 'productVariants',
  }),
}));