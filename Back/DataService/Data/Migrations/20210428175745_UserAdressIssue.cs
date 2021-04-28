using Microsoft.EntityFrameworkCore.Migrations;

namespace DataService.Data.Migrations
{
    public partial class UserAdressIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserAdresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAdresses_UserId",
                table: "UserAdresses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAdresses_Users_UserId",
                table: "UserAdresses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAdresses_Users_UserId",
                table: "UserAdresses");

            migrationBuilder.DropIndex(
                name: "IX_UserAdresses_UserId",
                table: "UserAdresses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserAdresses");
        }
    }
}
