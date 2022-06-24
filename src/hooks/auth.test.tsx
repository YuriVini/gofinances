import fetchMock from "jest-fetch-mock";
import {
  act,
  cleanup as cleanupHook,
  renderHook,
} from "@testing-library/react-hooks";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { AuthProvider, useAuth } from "./auth";
import { cleanup, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  beforeEach(async () => {
    jest.clearAllMocks();
    cleanupHook;
    cleanup;
    await AsyncStorage.removeItem("@gofinances:user");
  });

  it("should be able sign in with an existing Google", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    waitFor(async () => await result.current.signInWithGoogle());

    setTimeout(() => {
      console.log(result.current.user.name);
      expect(result.current.user.name).toBe("Yuri");
      expect(result.current.user.email).toBe("yuri@gmail.com");
      expect(result.current.user.photo).toBe("yuri.png");
    }, 100);
  });

  it("shouldn't connect if cancel authentication with Google", async () => {
    jest.mock("expo-auth-session", () => ({
      startAsync: () => ({
        type: "cancel",
      }),
    }));
    fetchMock.mockResponseOnce(
      JSON.stringify({
        type: "cancel",
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    waitFor(async () => await result.current.signInWithGoogle());

    console.log(result.current.user.id);
    expect(result.current.user).not.toHaveProperty("id");
  });
});