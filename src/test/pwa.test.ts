import { describe, expect, it } from "vitest";
import { isKillSwitch, isPreviewHost, shouldRegisterServiceWorker } from "@/lib/pwa";

const published = {
  hostname: "lumencatholic.lovable.app",
  search: "",
  isProduction: true,
  isEmbedded: false,
};

describe("Offline app registration guard", () => {
  it("refuses every Lovable preview address", () => {
    expect(isPreviewHost("id-preview--1a5ce663-e806-49a0-b29f-889b38339712.lovable.app")).toBe(true);
    expect(isPreviewHost("preview-2--abc123--my-app.lovable.app")).toBe(true);
    expect(isPreviewHost("project--4f8a-dev.lovable.app")).toBe(true);
    expect(isPreviewHost("id-preview--abc--app.gptengineer.run")).toBe(true);
    expect(isPreviewHost("lovableproject.com")).toBe(true);
    expect(isPreviewHost("beta.lovable.dev")).toBe(true);
  });

  it("keeps the published address and a custom domain eligible", () => {
    expect(isPreviewHost("lumencatholic.lovable.app")).toBe(false);
    expect(isPreviewHost("oracoes.example.com.br")).toBe(false);
    expect(shouldRegisterServiceWorker({ ...published, hostname: "oracoes.example.com.br" })).toBe(true);
  });

  it("refuses a dev build, an embedded frame and a preview host", () => {
    expect(shouldRegisterServiceWorker({ ...published, isProduction: false })).toBe(false);
    expect(shouldRegisterServiceWorker({ ...published, isEmbedded: true })).toBe(false);
    expect(shouldRegisterServiceWorker({ ...published, hostname: "preview--abc--app.lovable.app" })).toBe(false);
  });

  it("unregisters with ?sw=off and ignores other query values", () => {
    expect(isKillSwitch("?sw=off")).toBe(true);
    expect(isKillSwitch("sw=off")).toBe(true);
    expect(isKillSwitch("?sw=on")).toBe(false);
    expect(isKillSwitch("")).toBe(false);
    expect(shouldRegisterServiceWorker({ ...published, search: "?sw=off" })).toBe(false);
  });

  it("registers on the published site", () => {
    expect(shouldRegisterServiceWorker(published)).toBe(true);
  });
});
