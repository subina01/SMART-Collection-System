namespace CollectorApp.Core.ValueObjects;

public sealed class PasswordValue
{
    public const int MaxLength = 30;

    public string Value { get; }

    private PasswordValue(string value) => Value = value;

    public static PasswordValue Create(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
            throw new ArgumentException("Password cannot be empty.");

        if (password.Length > MaxLength)
            throw new ArgumentException($"Password must not exceed {MaxLength} characters.");

        return new PasswordValue(password);
    }

    public override string ToString() => "***";
}
