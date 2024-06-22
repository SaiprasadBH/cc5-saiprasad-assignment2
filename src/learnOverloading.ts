// Define interfaces for different query types and their corresponding result types.

/**
 * Represents a high-level query.
 * @interface
 */
export interface HighLevelQuery {
  type: "high"; // Specifies the type of query as "high".
}

/**
 * Represents a low-level query.
 * @interface
 */
export interface LowLevelQuery {
  type: "low"; // Specifies the type of query as "low".
}

/**
 * Represents a shallow result.
 * @interface
 */
export interface ShallowResult {
  shallow: boolean; // Indicates whether the result is shallow (true) or not.
}

/**
 * Represents a deep result.
 * @interface
 */
export interface DeepResult {
  deep: boolean; // Indicates whether the result is deep (true) or not.
}

/**
 * Processes a query and returns the corresponding result based on the query type.
 * @param {HighLevelQuery} query - The high-level query object.
 * @returns {ShallowResult} - The shallow result object.
 */
export function processQuery(query: HighLevelQuery): ShallowResult;

/**
 * Processes a query and returns the corresponding result based on the query type.
 * @param {LowLevelQuery} query - The low-level query object.
 * @returns {DeepResult} - The deep result object.
 */
export function processQuery(query: LowLevelQuery): DeepResult;

/**
 * Internal implementation of processQuery that handles both HighLevelQuery and LowLevelQuery.
 * @param {HighLevelQuery | LowLevelQuery} query - The query object of either type.
 * @returns {ShallowResult | DeepResult} - The result object based on the query type.
 */
export function processQuery(
  query: HighLevelQuery | LowLevelQuery
): ShallowResult | DeepResult {
  // Determine the type of query and return the appropriate result.
  return query.type === "high" ? { shallow: true } : { deep: true };
}
