import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CountryDetail from "./SingleCountry";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { vi } from "vitest"; // ✅ Import this!

// Mock fetch globally
global.fetch = vi.fn();

// Mock axios and jwtDecode
vi.mock("axios");
vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(),
}));

describe("CountryDetail Component", () => {
  const mockCountry = {
    name: { common: "Testland", nativeName: { tst: { common: "Testish" } } },
    population: 123456,
    region: "Test Region",
    subregion: "Test Subregion",
    capital: ["Testville"],
    flags: { svg: "https://test.flag.svg" },
    tld: [".tt"],
    languages: { tst: "Testish" },
    currencies: { TST: { name: "Test Dollar" } },
    borders: ["TST1", "TST2"],
  };

  const mockBorderCountries = [
    { name: { common: "BorderOne" } },
    { name: { common: "BorderTwo" } },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock fetch for main country and border countries
    fetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve([mockCountry]),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([mockBorderCountries[0]]),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([mockBorderCountries[1]]),
      });
  });

  test("renders country data and handles add to favourites", async () => {
    // Setup token and decoded email
    localStorage.setItem("token", "mockToken");
    jwtDecode.mockReturnValue({ email: "test@example.com" });

    // Mock axios POST
    axios.post.mockResolvedValueOnce({
      data: { message: "Country added to favourites!" },
    });

    render(
      <MemoryRouter initialEntries={["/Testland"]}>
        <Routes>
          <Route
            path="/:country"
            element={<CountryDetail />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for country name to appear
    await waitFor(() => screen.getByText("Testland"));

    // Check country data
    expect(screen.getByText("Testland")).toBeInTheDocument();
    expect(screen.getByText(/Testish/)).toBeInTheDocument();
    expect(screen.getByText(/Test Region/)).toBeInTheDocument();
    expect(screen.getByText(/Test Subregion/)).toBeInTheDocument();
    expect(screen.getByText(/Testville/)).toBeInTheDocument();

    // Click Add to Favourite
    fireEvent.click(screen.getByText(/Add to Favourite/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test("shows 'Country Not Found' if fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Country not found"));

    render(
      <MemoryRouter initialEntries={["/Unknownland"]}>
        <Routes>
          <Route path="/:country" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Country Not Found/i)).toBeInTheDocument();
    });
  });
});
