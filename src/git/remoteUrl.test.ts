import {getRemoteHost} from "./remoteUrl";

describe("getRemoteHost", () => {
  it("parses https remotes", () => {
    expect(getRemoteHost("https://github.com/owner/repo.git")).toBe("github.com");
  });

  it("parses ssh:// remotes", () => {
    expect(getRemoteHost("ssh://git@github.com/owner/repo.git")).toBe("github.com");
    expect(getRemoteHost("ssh://git@github.com:22/owner/repo.git")).toBe("github.com");
  });

  it("parses scp-style remotes", () => {
    expect(getRemoteHost("git@github.com:owner/repo.git")).toBe("github.com");
    expect(getRemoteHost("git@bitbucket.org:owner/repo.git")).toBe("bitbucket.org");
    expect(getRemoteHost("git@myorg.ghe.com:owner/repo.git")).toBe("myorg.ghe.com");
  });

  it("parses scp-style remotes without a user", () => {
    expect(getRemoteHost("github.com:owner/repo.git")).toBe("github.com");
  });

  it("lower-cases the host", () => {
    expect(getRemoteHost("git@GitHub.com:owner/repo.git")).toBe("github.com");
    expect(getRemoteHost("https://GitHub.com/owner/repo.git")).toBe("github.com");
  });

  it("returns undefined for unparseable remotes instead of throwing", () => {
    expect(getRemoteHost("")).toBeUndefined();
    expect(getRemoteHost("not a url")).toBeUndefined();
    expect(getRemoteHost("/local/path/to/repo.git")).toBeUndefined();
  });
});
