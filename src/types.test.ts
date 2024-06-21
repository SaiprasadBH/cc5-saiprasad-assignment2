import { describe, test, expect } from "vitest";
import { OfficeAddress } from "./types";

describe("Address and OfficeAddress Types", () => {
  test("OfficeAddress should extend Address with website field", () => {
    const officeAddress: OfficeAddress = {
      doorNumber: "456",
      street1: "Business Road",
      pinCode: "560002",
      state: "Karnataka",
      country: "India",
      website: "https://example.com",
    };

    expect(officeAddress.doorNumber).toEqual("456");
    expect(officeAddress.street1).toEqual("Business Road");
    expect(officeAddress.pinCode).toEqual("560002");
    expect(officeAddress.state).toEqual("Karnataka");
    expect(officeAddress.country).toEqual("India");
    expect(officeAddress.website).toEqual("https://example.com");
  });
});
