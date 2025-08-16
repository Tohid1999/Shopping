import { http, HttpResponse, delay } from "msw";
import { products } from "./data";

export const handlers = [
  http.get("/api/products", async () => {
    await delay(2000);
    return HttpResponse.json(products);
  }),
];
