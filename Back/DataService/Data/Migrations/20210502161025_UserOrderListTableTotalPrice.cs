using Microsoft.EntityFrameworkCore.Migrations;

namespace DataService.Data.Migrations
{
    public partial class UserOrderListTableTotalPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "TotalSalePrice",
                table: "UserOrderLists",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalSalePrice",
                table: "UserOrderLists");
        }
    }
}
