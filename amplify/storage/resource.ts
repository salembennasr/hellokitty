import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'hkiaItemImages',
  access: (allow) => ({
    'item-images/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],
    'user-uploads/*': [
      allow.authenticated.to(['read', 'write']),
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],
  }),
});
