import { checkUrl } from "../Backend-app";

test("check url", () => {
  expect(checkUrl).toBe("mongodb://localhost:27017/webbshop");
});

// to run backend test, close the backend server and kör det : npm test -w packages/backend
