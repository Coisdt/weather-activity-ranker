import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ActivityCard from "../../components/ActivityCard";
import { mockDayRanking } from "../fixtures/mockData";

describe("ActivityCard", () => {
  describe("rendering", () => {
    it("should render date in header", () => {
      render(<ActivityCard ranking={mockDayRanking} />);
      expect(screen.getByText(/November|Monday|2025/)).toBeInTheDocument();
    });

    it("should render all activities", () => {
      render(<ActivityCard ranking={mockDayRanking} />);
      expect(screen.getByText("Skiing")).toBeInTheDocument();
      expect(screen.getByText("Outdoor sightseeing")).toBeInTheDocument();
      expect(screen.getByText("Surfing")).toBeInTheDocument();
    });

    it("should render activity scores", () => {
      render(<ActivityCard ranking={mockDayRanking} />);
      expect(screen.getByText(/Score: 85/)).toBeInTheDocument();
      expect(screen.getByText(/Score: 45/)).toBeInTheDocument();
      expect(screen.getByText(/Score: 20/)).toBeInTheDocument();
    });

    it("should render activity reasons", () => {
      render(<ActivityCard ranking={mockDayRanking} />);
      expect(
        screen.getByText("Cold temperatures ideal for skiing.")
      ).toBeInTheDocument();
      expect(screen.getByText("Moderate temperatures.")).toBeInTheDocument();
    });
  });

  describe("sorting", () => {
    it("should sort activities by score descending", () => {
      render(<ActivityCard ranking={mockDayRanking} />);

      const scoreElements = screen.getAllByText(/Score: \d+/);
      const scores = scoreElements.map((el) => {
        const match = el.textContent?.match(/Score: (\d+)/);
        return match ? parseInt(match[1]) : 0;
      });

      expect(scores[0]).toBeGreaterThanOrEqual(scores[1]);
      expect(scores[1]).toBeGreaterThanOrEqual(scores[2]);
    });
  });

  describe("rank badges", () => {
    it("should display rank numbers starting from 1", () => {
      render(<ActivityCard ranking={mockDayRanking} />);
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });
});
