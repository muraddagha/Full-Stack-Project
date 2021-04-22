using Microsoft.EntityFrameworkCore.Migrations;

namespace DataService.Data.Migrations
{
    public partial class DealOfDayIssueFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "DealOfDays",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DealOfDays_ProductId",
                table: "DealOfDays",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_DealOfDays_Products_ProductId",
                table: "DealOfDays",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DealOfDays_Products_ProductId",
                table: "DealOfDays");

            migrationBuilder.DropIndex(
                name: "IX_DealOfDays_ProductId",
                table: "DealOfDays");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "DealOfDays");
        }
    }
}
