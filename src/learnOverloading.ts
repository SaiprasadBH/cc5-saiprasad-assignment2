import {
  HighLevelQuery,
  LowLevelQuery,
  ShallowResult,
  DeepResult,
} from "./interfaces";
export function processQuery(query: HighLevelQuery): ShallowResult;
export function processQuery(query: LowLevelQuery): DeepResult;
export function processQuery(
  query: HighLevelQuery | LowLevelQuery
): ShallowResult | DeepResult {
  return query.type === "high" ? { shallow: true } : { deep: true };
}
