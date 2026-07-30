# Backend Dockerfile - ASP.NET Core 10, multi-stage build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj files first for layer caching
COPY src/Devliora.Domain/Devliora.Domain.csproj src/Devliora.Domain/
COPY src/Devliora.Application/Devliora.Application.csproj src/Devliora.Application/
COPY src/Devliora.Infrastructure/Devliora.Infrastructure.csproj src/Devliora.Infrastructure/
COPY src/Devliora.WebApi/Devliora.WebApi.csproj src/Devliora.WebApi/
RUN dotnet restore src/Devliora.WebApi/Devliora.WebApi.csproj

# Copy the rest and publish
COPY src/ src/
RUN dotnet publish src/Devliora.WebApi/Devliora.WebApi.csproj -c Release -o /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

ENTRYPOINT ["dotnet", "Devliora.WebApi.dll"]
