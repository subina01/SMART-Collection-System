namespace CollectorApp.Application.Common;

public static class AppConstants
{
    public static class Jwt
    {
        public const string Key               = "Jwt:Key";
        public const string Issuer            = "Jwt:Issuer";
        public const string Audience          = "Jwt:Audience";
        public const string ExpiresInMinutes  = "Jwt:ExpiresInMinutes";
    }

    public static class ConnectionStrings
    {
        public const string Default = "Default";
    }

    public static class Cors
    {
        public const string FrontendPolicy = "FrontendDev";
    }

    public static class Messages
    {
        public const string OrgCreated     = "Organization created successfully";
        public const string OrgUpdated     = "Organization updated successfully";
        public const string OrgDeactivated = "Organization deactivated successfully";
    }
}
