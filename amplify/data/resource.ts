import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  // Items Collection
  Item: a.model({
    name: a.string().required(),
    nameDE: a.string(),
    category: a.enum(['FURNITURE', 'MATERIAL', 'CLOTHING', 'FOOD', 'EVENT', 'RECIPE']),
    subcategory: a.string(),
    tags: a.string().array(),
    rarity: a.enum(['COMMON', 'UNCOMMON', 'RARE', 'EVENT']),
    imageKey: a.string(),
    isUserSubmitted: a.boolean().default(false),
    verified: a.boolean().default(false),
    trades: a.hasMany('TradeItem', 'itemId'),
  }).authorization(allow => [
    allow.guest().to(['read']),
    allow.authenticated().to(['read']),
    allow.group('admin').to(['create', 'update', 'delete', 'read']),
  ]),

  // Trade Offers
  Trade: a.model({
    status: a.enum(['ACTIVE', 'COMPLETED', 'CANCELLED']),
    description: a.string(),
    contactPreference: a.enum(['IN_APP', 'DISCORD']),
    discordUsername: a.string(),
    offeringItems: a.hasMany('TradeItem', 'tradeOfferingId'),
    seekingItems: a.hasMany('TradeItem', 'tradeSeekingId'),
    interests: a.hasMany('TradeInterest', 'tradeId'),
    ownerId: a.string().required(),
    ownerName: a.string(),
  }).authorization(allow => [
    allow.guest().to(['read']),
    allow.authenticated().to(['create', 'read']),
    allow.owner().to(['update', 'delete']),
  ]),

  // Junction Table für Trade <-> Item
  TradeItem: a.model({
    quantity: a.integer().default(1),
    itemId: a.id().required(),
    item: a.belongsTo('Item', 'itemId'),
    tradeOfferingId: a.id(),
    tradeOffering: a.belongsTo('Trade', 'tradeOfferingId'),
    tradeSeekingId: a.id(),
    tradeSeeking: a.belongsTo('Trade', 'tradeSeekingId'),
  }).authorization(allow => [
    allow.guest().to(['read']),
    allow.authenticated().to(['create', 'read', 'update', 'delete']),
  ]),

  // Trade Interests
  TradeInterest: a.model({
    tradeId: a.id().required(),
    trade: a.belongsTo('Trade', 'tradeId'),
    message: a.string(),
    status: a.enum(['PENDING', 'ACCEPTED', 'DECLINED']),
    interestedUserId: a.string().required(),
    interestedUserName: a.string(),
    accessCode: a.string(),
  }).authorization(allow => [
    allow.authenticated().to(['create', 'read']),
    allow.owner().to(['update', 'delete']),
  ]),

  // User Profile
  UserProfile: a.model({
    userId: a.id().required(),
    displayName: a.string().required(),
    avatarStyle: a.string(),
    reputation: a.integer().default(0),
    accessCode: a.string(),
    completedTrades: a.integer().default(0),
  }).authorization(allow => [
    allow.owner().to(['create', 'read', 'update']),
    allow.authenticated().to(['read']),
  ]),

  // Item Suggestions
  ItemSuggestion: a.model({
    name: a.string().required(),
    nameDE: a.string(),
    category: a.enum(['FURNITURE', 'MATERIAL', 'CLOTHING', 'FOOD', 'EVENT', 'RECIPE']),
    subcategory: a.string(),
    description: a.string(),
    status: a.enum(['PENDING', 'APPROVED', 'REJECTED']),
    submittedBy: a.string(),
  }).authorization(allow => [
    allow.authenticated().to(['create', 'read']),
    allow.group('admin').to(['update', 'delete']),
  ]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});
