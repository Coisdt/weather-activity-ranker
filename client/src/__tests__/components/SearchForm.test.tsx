import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../../components/SearchForm";

describe("SearchForm", () => {
  describe("form submission", () => {
    it("should call onSearch with trimmed city name on submit", () => {
      const mockOnSearch = vi.fn();
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText("Enter a city");
      const button = screen.getByText("Search");

      fireEvent.change(input, { target: { value: "  New York  " } });
      fireEvent.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith("New York");
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it("should handle form submission correctly", () => {
      const mockOnSearch = vi.fn();
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText("Enter a city");
      const button = screen.getByText("Search");

      fireEvent.change(input, { target: { value: "Paris" } });
      fireEvent.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith("Paris");
    });
  });

  describe("validation", () => {
    it("should show error when submitting empty form", () => {
      const mockOnSearch = vi.fn();
      render(<SearchForm onSearch={mockOnSearch} />);

      const button = screen.getByText("Search");
      fireEvent.click(button);

      expect(screen.getByText("Please enter a city name")).toBeInTheDocument();
      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it("should clear error when user starts typing", () => {
      const mockOnSearch = vi.fn();
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText("Enter a city");
      const button = screen.getByText("Search");

      // Trigger error
      fireEvent.click(button);
      expect(screen.getByText("Please enter a city name")).toBeInTheDocument();

      // Clear error by typing
      fireEvent.change(input, { target: { value: "New York" } });
      expect(
        screen.queryByText("Please enter a city name")
      ).not.toBeInTheDocument();
    });
  });

  describe("input behavior", () => {
    it("should update input value on change", () => {
      const mockOnSearch = vi.fn();
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(
        "Enter a city"
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "Paris" } });

      expect(input.value).toBe("Paris");
    });

    it("should apply error styling when error exists", () => {
      const mockOnSearch = vi.fn();
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText("Enter a city");
      const button = screen.getByText("Search");

      fireEvent.click(button);
      expect(input).toHaveClass("border-red-500");
    });
  });
});
