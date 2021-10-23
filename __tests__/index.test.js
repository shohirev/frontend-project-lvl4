import buildApp from "../server/index.js";
//pass linter
test('get /', async () => {
  const app = buildApp({ port: 5000 });
  const response = await app.inject({
    url: '/',
  });
  expect(response.statusCode).toEqual(200);
});
