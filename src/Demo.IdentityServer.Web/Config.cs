using Duende.IdentityServer.Models;

namespace Demo.IdentityServer.Web
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Address(),
                new IdentityResources.Email(),
                new IdentityResources.Phone(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("demo.read"),
                new ApiScope("demo.write"),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "demo.react.app",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,
                    RedirectUris =
                    {
                        "https://localhost:3000/signin-oidc",
                        "https://localhost:3000/signout-callback-oidc"
                    },
                    FrontChannelLogoutUri = "https://localhost:3000/signout-oidc",
                    PostLogoutRedirectUris = {
                        "https://localhost:3000/signout-callback-oidc"
                    },
                    AllowOfflineAccess = true,
                    AllowedScopes = {
                        "offline_access",
                        "openid",
                        "profile",
                        "address",
                        "email",
                        "phone",
                        "demo.read",
                        "demo.write"
                    }
                },
            };
    }
}