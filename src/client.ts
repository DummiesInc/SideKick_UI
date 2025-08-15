import { TestClient } from '@/generated/schema/TestClient';

export const sidekickClient = new TestClient({
  // BASE: 'http://localhost:5131' // TravelNurse
  BASE: 'http://localhost:3001' // Side Kick
});
