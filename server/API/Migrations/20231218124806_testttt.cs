using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class testttt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Frames_OrderCompanies_OrderCompanyId",
                table: "Frames");

            migrationBuilder.DropIndex(
                name: "IX_Frames_OrderCompanyId",
                table: "Frames");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "ReceivingOrders");

            migrationBuilder.DropColumn(
                name: "ExternalNumber",
                table: "ReceivingOrders");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ReceivingOrders");

            migrationBuilder.DropColumn(
                name: "UniqueIdentifier",
                table: "ReceivingOrders");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Frames");

            migrationBuilder.RenameColumn(
                name: "OrderCompanyId",
                table: "Frames",
                newName: "ReceivingOrderId");

            migrationBuilder.AddColumn<int>(
                name: "FrameNumber",
                table: "ReceivingOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PurchaseOrderId",
                table: "ReceivingOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "orderCompanyId",
                table: "ReceivingOrders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReceivingOrders_orderCompanyId",
                table: "ReceivingOrders",
                column: "orderCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Frames_FrameNumber",
                table: "Frames",
                column: "FrameNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Frames_ReceivingOrders_FrameNumber",
                table: "Frames",
                column: "FrameNumber",
                principalTable: "ReceivingOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReceivingOrders_OrderCompanies_orderCompanyId",
                table: "ReceivingOrders",
                column: "orderCompanyId",
                principalTable: "OrderCompanies",
                principalColumn: "orderCompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Frames_ReceivingOrders_FrameNumber",
                table: "Frames");

            migrationBuilder.DropForeignKey(
                name: "FK_ReceivingOrders_OrderCompanies_orderCompanyId",
                table: "ReceivingOrders");

            migrationBuilder.DropIndex(
                name: "IX_ReceivingOrders_orderCompanyId",
                table: "ReceivingOrders");

            migrationBuilder.DropIndex(
                name: "IX_Frames_FrameNumber",
                table: "Frames");

            migrationBuilder.DropColumn(
                name: "FrameNumber",
                table: "ReceivingOrders");

            migrationBuilder.DropColumn(
                name: "PurchaseOrderId",
                table: "ReceivingOrders");

            migrationBuilder.DropColumn(
                name: "orderCompanyId",
                table: "ReceivingOrders");

            migrationBuilder.RenameColumn(
                name: "ReceivingOrderId",
                table: "Frames",
                newName: "OrderCompanyId");

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "ReceivingOrders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExternalNumber",
                table: "ReceivingOrders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ReceivingOrders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UniqueIdentifier",
                table: "ReceivingOrders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Frames",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Frames_OrderCompanyId",
                table: "Frames",
                column: "OrderCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Frames_OrderCompanies_OrderCompanyId",
                table: "Frames",
                column: "OrderCompanyId",
                principalTable: "OrderCompanies",
                principalColumn: "orderCompanyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
