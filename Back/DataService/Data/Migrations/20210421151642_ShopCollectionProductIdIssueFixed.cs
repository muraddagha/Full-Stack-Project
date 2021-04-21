using Microsoft.EntityFrameworkCore.Migrations;

namespace DataService.Data.Migrations
{
    public partial class ShopCollectionProductIdIssueFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ShopCollections",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShopCollections_ProductId",
                table: "ShopCollections",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopCollections_Products_ProductId",
                table: "ShopCollections",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopCollections_Products_ProductId",
                table: "ShopCollections");

            migrationBuilder.DropIndex(
                name: "IX_ShopCollections_ProductId",
                table: "ShopCollections");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ShopCollections");
        }
    }
}
