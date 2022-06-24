import fetchMock from "jest-fetch-mock";
import {
  act,
  cleanup as cleanupHook,
  renderHook,
} from "@testing-library/react-hooks";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { AuthProvider, useAuth } from "./auth";
import { cleanup, waitFor } from "@testing-library/react-native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

jest.mock("expo-auth-session");
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage!);
fetchMock.enableMocks();
jest.mock("expo-auth-session", () => ({
  startAsync: () => ({
    type: "success",
    params: {
      access_token: "test_token",
    },
  }),
}));
fetchMock.mockResponseOnce(
  JSON.stringify({
    id: "1234",
    email: "yuri@gmail.com",
    given_name: "Yuri",
    picture: "yuri.png",
  })
);

describe("Auth Hook", () => {
  beforeAll(async () => {
    cleanupHook;
    cleanup;
    await AsyncStorageLib.removeItem("@gofinances:user");
  });

  it("should be able sign in with an existing Google", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => await result.current.signInWithGoogle());

    waitFor(() => {
      console.log(result.current.user.name);
      expect(result.current.user.name).toBe("Yuri");
      expect(result.current.user.email).toBe("yuri@gmail.com");
      expect(result.current.user.photo).toBe("yuri.png");
    });
  });

  it("shouldn't connect if cancel authentication with Google", async () => {
    jest.mock("expo-auth-session", () => ({
      startAsync: () => ({
        type: "cancel",
        params: {
          access_token: "test_token",
        },
      }),
    }));
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "",
        email: "",
        given_name: "",
        picture: "",
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => await result.current.signInWithGoogle());

    waitFor(() => {
      console.log(result.current.user.id);

      expect(result.current.user).not.toHaveProperty("id");
    });
  });
});
