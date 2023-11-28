using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class updatetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VehicleID",
                table: "Vehicles",
                newName: "VehicleId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "Vehicles",
                newName: "VehicleID");
        }
    }
}
