FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY dotnetapp.csproj ./
RUN dotnet restore dotnetapp.csproj

COPY . .
RUN dotnet publish dotnetapp.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://+:${PORT:-8080} dotnet dotnetapp.dll"]