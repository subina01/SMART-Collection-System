
namespace CollectorApp.Core.Entities;

public sealed class User
{
    public int Id { get; private set; }
    public string UserId { get; private set; } = string.Empty;
    public string Password { get; private set; } = string.Empty;

    private User() { }

    public static User Reconstitute(int id, string userId, string password)
    {
        return new User
        {
            Id = id,
            UserId = userId,
            Password = password
        };
    }
}
