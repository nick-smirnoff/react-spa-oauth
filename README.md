# react-spa-oauth

## Prerequisites

- [.NET](https://dotnet.microsoft.com/en-us/download/dotnet)
- [Node.js](https://nodejs.org/en/download/)

## Usage

> __NOTE:__ Please inspect any script prior to running to ensure safety. We already know ours is safe, but you should verify the security and contents of any script from the internet you are not familiar with.

- [`scripts/launch.bat`](scripts/launch.bat)

## Overview

### `Demo.IdentityServer.Web`

This is a basic identity server with in-memory stores and test users.

- Reference OAuth resources at `src/Demo.IdentityServer.Web/Config.cs`
- Reference test users at `src/Demo.IdentityServer.Web/TestUsers.cs`

### `demo.react.oidc.app`

This is a basic create-react-app which demonstrates an OAuth implementation via the libraries;

- [`oidc-client-ts`](https://authts.github.io/oidc-client-ts/)
- [`react-oidc-context`](https://github.com/authts/react-oidc-context#documentation)
