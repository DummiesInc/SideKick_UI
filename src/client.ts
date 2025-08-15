import { TestClient } from '@/generated/schema/TestClient';

export const sidekickClient = new TestClient({
  BASE: 'http://localhost:5131'
});
