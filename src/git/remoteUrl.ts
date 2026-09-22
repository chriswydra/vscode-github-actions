/**
 * Extract the host name from a git remote URL.
 *
 * Handles both URL-style remotes (`https://host/owner/repo.git`, `ssh://git@host/owner/repo.git`)
 * and scp-style remotes (`git@host:owner/repo.git`), which `new URL()` rejects.
 *
 * Returns `undefined` when the host cannot be determined instead of throwing, so a single
 * unparseable remote in a multi-root workspace does not abort extension activation.
 */
export function getRemoteHost(remoteUrl: string): string | undefined {
  // scp-style: [user@]host:path (no scheme, no leading slash in path)
  const scpMatch = /^(?:[^@/]+@)?([^:/]+):(?!\/\/)/.exec(remoteUrl);
  if (scpMatch) {
    return scpMatch[1].toLowerCase();
  }

  try {
    const host = new URL(remoteUrl).hostname;
    return host ? host.toLowerCase() : undefined;
  } catch {
    return undefined;
  }
}
