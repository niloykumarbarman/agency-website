# Managing the JWT Secret

`appsettings.json` no longer contains a real value for `JwtSettings:SecretKey` —
it's an empty string in the committed file, and the API will refuse to start
until a real secret (32+ characters) is supplied through one of the methods
below. This prevents the signing key from ever living in git history again.

## Local development — `dotnet user-secrets`

Run this once, from `backend/src/AgencyWebsite.WebApi`:

```bash
cd backend/src/AgencyWebsite.WebApi
dotnet user-secrets init
dotnet user-secrets set "JwtSettings:SecretKey" "<paste-a-long-random-value-here>"
```

Generate a strong random value (32+ bytes, base64-encoded) with:

```bash
openssl rand -base64 48
```

`dotnet user-secrets init` adds a `UserSecretsId` to
`AgencyWebsite.WebApi.csproj` (safe to commit — it's just an ID, not a
secret). The actual secret value is stored outside the repo, at
`~/.microsoft/usersecrets/<UserSecretsId>/secrets.json`, and ASP.NET Core
loads it automatically in the `Development` environment. Nothing else to
configure — just run `dotnet run` as usual afterwards.

## Production / VPS deployment — environment variable

ASP.NET Core's configuration system maps environment variables to config
sections by replacing `:` with `__` (double underscore). Set:

```bash
export JwtSettings__SecretKey="<a-different-long-random-value-for-prod>"
```

- **Plain VPS / systemd service**: add `Environment="JwtSettings__SecretKey=..."`
  to the service's `.env` file or systemd unit, not to any file that gets
  committed.
- **Docker / docker-compose**: pass it via the `environment:` block or an
  `.env` file referenced by `env_file:` (make sure that `.env` file is
  listed in `.gitignore`, which it already is at the repo root).

Use a **different** secret value in production than the one used locally —
rotating it also immediately invalidates any previously issued tokens, which
is expected and fine (existing sessions just need to log in again).

## Why this matters

A leaked signing key lets anyone mint valid admin tokens for this API
indefinitely (until the key is rotated), regardless of password strength.
Keeping it out of git — and out of any file that gets deployed as part of
the app bundle — is the single most important secret in this codebase.
