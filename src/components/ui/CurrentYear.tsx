import { cacheLife } from "next/cache";

/**
 * The current year for the footer.
 * Cache Components forbids reading the clock during prerender unless the
 * value is cached — so it's computed once and refreshed daily, keeping the
 * page fully static.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
