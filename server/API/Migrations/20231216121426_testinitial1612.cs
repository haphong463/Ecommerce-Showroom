using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class testinitial1612 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VIN",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "VerifiedAt",
                table: "Accounts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrderCompanies",
                columns: table => new
                {
                    orderCompanyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NameCompany = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderCompanies", x => x.orderCompanyId);
                    table.ForeignKey(
                        name: "FK_OrderCompanies_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReceivedVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UniqueIdentifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExternalNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceivedVehicles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RegistrationDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VehicleId = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    RegistrationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RegistrationAuthority = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistrationDatas_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistrationDatas_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetailCompany",
                columns: table => new
                {
                    OrderDetailCompanyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModelId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    orderCompanyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetailCompany", x => x.OrderDetailCompanyId);
                    table.ForeignKey(
                        name: "FK_OrderDetailCompany_OrderCompanies_orderCompanyId",
                        column: x => x.orderCompanyId,
                        principalTable: "OrderCompanies",
                        principalColumn: "orderCompanyId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderCompanies_EmployeeId",
                table: "OrderCompanies",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetailCompany_orderCompanyId",
                table: "OrderDetailCompany",
                column: "orderCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationDatas_AccountId",
                table: "RegistrationDatas",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationDatas_VehicleId",
                table: "RegistrationDatas",
                column: "VehicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDetailCompany");

            migrationBuilder.DropTable(
                name: "ReceivedVehicles");

            migrationBuilder.DropTable(
                name: "RegistrationDatas");

            migrationBuilder.DropTable(
                name: "OrderCompanies");

            migrationBuilder.DropColumn(
                name: "VIN",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "VerifiedAt",
                table: "Accounts");
        }
    }
}
