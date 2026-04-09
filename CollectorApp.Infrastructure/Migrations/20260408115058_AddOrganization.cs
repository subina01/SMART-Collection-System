using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CollectorApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOrganization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CollectionApp",
                columns: table => new
                {
                    SN = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    OrgName = table.Column<string>(type: "varchar(200)", nullable: false),
                    DBName = table.Column<string>(type: "varchar(60)", nullable: false),
                    DbUser = table.Column<string>(type: "varchar(30)", nullable: false),
                    DBPassword = table.Column<string>(type: "varchar(30)", nullable: false),
                    Palika = table.Column<string>(type: "varchar(100)", nullable: true),
                    WardNo = table.Column<int>(type: "int", nullable: true),
                    TelNo = table.Column<string>(type: "varchar(30)", nullable: true),
                    Mobile = table.Column<string>(type: "varchar(15)", nullable: true),
                    Email = table.Column<string>(type: "varchar(45)", nullable: true),
                    Qty = table.Column<int>(type: "int", nullable: true),
                    OrgCode = table.Column<string>(type: "varchar(30)", nullable: false),
                    OrgPassword = table.Column<string>(type: "varchar(30)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionApp", x => x.SN);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CollectionApp");
        }
    }
}
