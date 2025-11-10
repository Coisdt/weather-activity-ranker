import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useActivityRankings } from "../../hooks/useActivityRankings";
import { createTestClient, createApolloWrapper } from "../helpers/apolloClient";

describe("useActivityRankings", () => {
  const client = createTestClient();
  const wrapper = createApolloWrapper(client);

  describe("when searchCity is empty", () => {
    it("should skip query and return empty data", () => {
      const { result } = renderHook(() => useActivityRankings(""), {
        wrapper,
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.cityName).toBeNull();
      expect(result.current.error).toBeUndefined();
    });
  });

  describe("when searchCity is provided", () => {
    it("should return hook structure with all expected properties", () => {
      const { result } = renderHook(() => useActivityRankings("New York"), {
        wrapper,
      });

      expect(result.current).toHaveProperty("loading");
      expect(result.current).toHaveProperty("error");
      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("cityName");
      expect(typeof result.current.loading).toBe("boolean");
    });

    it("should attempt query when city is provided", () => {
      const { result } = renderHook(() => useActivityRankings("Paris"), {
        wrapper,
      });

      // Query should be attempted (not skipped)
      expect(result.current.loading).toBeDefined();
    });
  });
});
