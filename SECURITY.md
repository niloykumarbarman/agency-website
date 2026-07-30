# Security Notes

## Secrets management

This project never commits real secrets to the repository. Two categories
of secrets exist, each with a local-dev path and a production path:

### 1. JWT signing key (JwtSettings:SecretKey)

- Committed backend/src/Devliora.WebApi/appsettings.json always ships
  with "SecretKey": "". The app throws a clear startup error if the
  effective value is missing or shorter than 32 characters
  (see Program.cs), so it can never silently sign tokens with a weak key.
- Local development: set it via .NET user-secrets, scoped to this
  project only (never written to a file inside the repo):

      cd backend/src/Devliora.WebApi
      dotnet user-secrets set "JwtSettings:SecretKey" "<your-generated-secret>"

- Production: set the JwtSettings__SecretKey environment variable
  on the host / container / secrets manager (double underscore is the
  standard ASP.NET Core convention for nested config keys). Never put the
  real value in any appsettings*.json file.
- Rotating this value invalidates all previously issued access and
  refresh tokens (users will need to log in again).

### 2. Database credentials (ConnectionStrings:DefaultConnection, Postgres container)

- backend/src/Devliora.WebApi/appsettings.json ships with a dev-only
  placeholder password (changeme_dev_only), matching the local Docker
  Postgres container. This is acceptable only because it is a throwaway
  local-only database.
- infra/docker/docker-compose.yml reads POSTGRES_USER,
  POSTGRES_PASSWORD, POSTGRES_DB from a local .env file (see
  infra/docker/.env.example), falling back to the same dev-only
  defaults if .env is absent. .env is gitignored.
- Production: override ConnectionStrings__DefaultConnection via
  environment variable / secrets manager, pointing at the real production
  database with a strong, unique password. Never reuse the dev password.

## Known historical exposure (resolved)

An earlier commit in this repository's history contained a real
JwtSettings:SecretKey value in plaintext (later replaced with an empty
string in a subsequent commit). The active signing key has since been
rotated and is not derivable from the exposed value. Because this
repository is public, the old key is still visible in git history via
git log -p. It is currently inert (no longer used for signing or
validation), but a full git history rewrite (e.g. git filter-repo or
BFG Repo-Cleaner) to purge it, followed by a force-push, is recommended
before wider code review or handing the repo to additional collaborators.
