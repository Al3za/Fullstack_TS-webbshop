import { checkUrl } from "../Backend-app";

test("check url", () => {
  expect(checkUrl).toBe("mongodb://localhost:27017/webbshop");
});

// npm test -w packages/backend
