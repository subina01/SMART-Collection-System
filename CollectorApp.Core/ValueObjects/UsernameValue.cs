namespace CollectorApp.Core.ValueObjects;

public sealed class UsernameValue
{
    public const int MaxLength = 50;

    public string Value { get; }

    private UsernameValue(string value) => Value = value;

    public static UsernameValue Create(string username)
    {
        if (string.IsNullOrWhiteSpace(username))
            throw new ArgumentException("Username cannot be empty.");

        if (username.Length > MaxLength)
            throw new ArgumentException($"Username must not exceed {MaxLength} characters.");

        return new UsernameValue(username);
    }

    public override string ToString() => Value;
    public override bool Equals(object? obj) => obj is UsernameValue other && Value == other.Value;
    public override int GetHashCode() => Value.GetHashCode();
}
