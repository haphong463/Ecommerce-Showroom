using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class testaccount4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDetailCompany");

            migrationBuilder.DropTable(
                name: "ReceivedVehicles");

            migrationBuilder.DropColumn(
                name: "OrderDate",
                table: "OrderCompanies");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "OrderCompanies",
                newName: "VehicleId");

            migrationBuilder.RenameColumn(
                name: "NameCompany",
                table: "OrderCompanies",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "OrderCompanies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "OrderCompanies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "SuggestPrice",
                table: "OrderCompanies",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PasswordResetToken",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ResetTokenExpires",
                table: "Accounts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VerifitcationToken",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Frames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FrameNumber = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VehicleId = table.Column<int>(type: "int", nullable: false),
                    OrderCompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Frames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Frames_OrderCompanies_OrderCompanyId",
                        column: x => x.OrderCompanyId,
                        principalTable: "OrderCompanies",
                        principalColumn: "orderCompanyId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Frames_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReceivingOrders",
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
                    table.PrimaryKey("PK_ReceivingOrders", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderCompanies_VehicleId",
                table: "OrderCompanies",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Frames_OrderCompanyId",
                table: "Frames",
                column: "OrderCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Frames_VehicleId",
                table: "Frames",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderCompanies_Vehicles_VehicleId",
                table: "OrderCompanies",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "VehicleId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderCompanies_Vehicles_VehicleId",
                table: "OrderCompanies");

            migrationBuilder.DropTable(
                name: "Frames");

            migrationBuilder.DropTable(
                name: "ReceivingOrders");

            migrationBuilder.DropIndex(
                name: "IX_OrderCompanies_VehicleId",
                table: "OrderCompanies");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "OrderCompanies");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "OrderCompanies");

            migrationBuilder.DropColumn(
                name: "SuggestPrice",
                table: "OrderCompanies");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PasswordResetToken",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ResetTokenExpires",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "VerifitcationToken",
                table: "Accounts");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "OrderCompanies",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "OrderCompanies",
                newName: "NameCompany");

            migrationBuilder.AddColumn<DateTime>(
                name: "OrderDate",
                table: "OrderCompanies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "OrderDetailCompany",
                columns: table => new
                {
                    OrderDetailCompanyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    orderCompanyId = table.Column<int>(type: "int", nullable: true),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModelId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "ReceivedVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExternalNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UniqueIdentifier = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceivedVehicles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetailCompany_orderCompanyId",
                table: "OrderDetailCompany",
                column: "orderCompanyId");
        }
    }
}
