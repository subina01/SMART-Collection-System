namespace CollectorApp.Core.Entities;

public sealed class Organization
{
    public int SN { get; private set; }
    public DateTime Date { get; private set; }
    public string OrgName { get; private set; } = string.Empty;
    public string DBName { get; private set; } = string.Empty;
    public string DbUser { get; private set; } = string.Empty;
    public string DBPassword { get; private set; } = string.Empty;
    public string? Palika { get; private set; }
    public int? WardNo { get; private set; }
    public string? TelNo { get; private set; }
    public string? Mobile { get; private set; }
    public string? Email { get; private set; }
    public int? Qty { get; private set; }
    public string OrgCode { get; private set; } = string.Empty;
    public string OrgPassword { get; private set; } = string.Empty;
    public bool Active { get; private set; }

    private Organization() { }

    public static Organization Create(
        string orgName, string dbName, string orgCode, string orgPassword,
        string? palika = null, int? wardNo = null, string? telNo = null,
        string? mobile = null, string? email = null, int? qty = null,
        bool active = true)
    {
        return new Organization
        {
            Date = DateTime.Now,
            OrgName = orgName,
            DBName = dbName,
            OrgCode = orgCode,
            OrgPassword = orgPassword,
            Palika = palika,
            WardNo = wardNo,
            TelNo = telNo,
            Mobile = mobile,
            Email = email,
            Qty = qty,
            Active = active
        };
    }

    public void Update(
        string orgName, string dbName, string orgCode, string orgPassword,
        string? palika = null, int? wardNo = null, string? telNo = null,
        string? mobile = null, string? email = null, int? qty = null,
        bool active = true)
    {
        OrgName = orgName;
        DBName = dbName;
        OrgCode = orgCode;
        OrgPassword = orgPassword;
        Palika = palika;
        WardNo = wardNo;
        TelNo = telNo;
        Mobile = mobile;
        Email = email;
        Qty = qty;
        Active = active;
    }

    public void Deactivate()
    {
        Active = false;
    }

    public static Organization Reconstitute(
        int sn, DateTime date, string orgName, string dbName, string dbUser,
        string dbPassword, string? palika, int? wardNo, string? telNo,
        string? mobile, string? email, int? qty, string orgCode,
        string orgPassword, bool active)
    {
        return new Organization
        {
            SN = sn,
            Date = date,
            OrgName = orgName,
            DBName = dbName,
            DbUser = dbUser,
            DBPassword = dbPassword,
            Palika = palika,
            WardNo = wardNo,
            TelNo = telNo,
            Mobile = mobile,
            Email = email,
            Qty = qty,
            OrgCode = orgCode,
            OrgPassword = orgPassword,
            Active = active
        };
    }
}
