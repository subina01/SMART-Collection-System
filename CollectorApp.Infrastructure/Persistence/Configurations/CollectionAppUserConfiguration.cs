using CollectorApp.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CollectorApp.Infrastructure.Persistence.Configurations;

public sealed class CollectionAppUserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("CollectionAppUser");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
            .UseIdentityColumn();

        builder.Property(u => u.UserId)
            .HasColumnName("UserId")
            .HasColumnType("varchar(50)");

        builder.Property(u => u.Password)
            .HasColumnName("Password")
            .HasColumnType("varchar(30)");
    }
}
