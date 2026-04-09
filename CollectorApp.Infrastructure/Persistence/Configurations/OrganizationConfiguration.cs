using CollectorApp.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CollectorApp.Infrastructure.Persistence.Configurations;

public sealed class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
{
    public void Configure(EntityTypeBuilder<Organization> builder)
    {
        builder.ToTable("CollectionApp");

        builder.HasKey(o => o.SN);

        builder.Property(o => o.SN)
            .UseIdentityColumn();

        builder.Property(o => o.Date)
            .HasColumnName("Date")
            .HasColumnType("datetime")
            .IsRequired();

        builder.Property(o => o.OrgName)
            .HasColumnName("OrgName")
            .HasColumnType("varchar(200)")
            .IsRequired();

        builder.Property(o => o.DBName)
            .HasColumnName("DBName")
            .HasColumnType("varchar(60)")
            .IsRequired();

        builder.Property(o => o.DbUser)
            .HasColumnName("DbUser")
            .HasColumnType("varchar(30)")
            .IsRequired();

        builder.Property(o => o.DBPassword)
            .HasColumnName("DBPassword")
            .HasColumnType("varchar(30)")
            .IsRequired();

        builder.Property(o => o.Palika)
            .HasColumnName("Palika")
            .HasColumnType("varchar(100)");

        builder.Property(o => o.WardNo)
            .HasColumnName("WardNo");

        builder.Property(o => o.TelNo)
            .HasColumnName("TelNo")
            .HasColumnType("varchar(30)");

        builder.Property(o => o.Mobile)
            .HasColumnName("Mobile")
            .HasColumnType("varchar(15)");

        builder.Property(o => o.Email)
            .HasColumnName("Email")
            .HasColumnType("varchar(45)");

        builder.Property(o => o.Qty)
            .HasColumnName("Qty");

        builder.Property(o => o.OrgCode)
            .HasColumnName("OrgCode")
            .HasColumnType("varchar(30)")
            .IsRequired();

        builder.Property(o => o.OrgPassword)
            .HasColumnName("OrgPassword")
            .HasColumnType("varchar(30)")
            .IsRequired();

        builder.Property(o => o.Active)
            .HasColumnName("Active")
            .IsRequired();
    }
}
