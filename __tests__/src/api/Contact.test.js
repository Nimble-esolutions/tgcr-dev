import { POST } from "@app/api/contact/route";
import { NextResponse } from "next/server";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a success message with status 200", async () => {
    const mockRequest = {}; // Mock request object
    const mockResponse = {
      message: "The email sent successfully.",
    };

    NextResponse.json.mockReturnValueOnce(mockResponse);

    const result = await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: "The email sent successfully." },
      { status: 200 }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should return an error message with status 500 on failure", async () => {
    const mockRequest = {}; // Mock request object
    const mockError = new Error("Simulated error");

    jest.spyOn(console, "error").mockImplementation(() => {});
    NextResponse.json.mockImplementationOnce(() => {
      throw mockError;
    });

    const result = await POST(mockRequest);

    expect(console.error).toHaveBeenCalledWith("Error:", mockError);
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: "An error occurred." },
      { status: 500 }
    );
  });
});