using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataService.Data.Migrations
{
    public partial class UserOrderListTableIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserOrderLists_OrderLists_OrderListId",
                table: "UserOrderLists");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "OrderLists");

            migrationBuilder.DropIndex(
                name: "IX_UserOrderLists_OrderListId",
                table: "UserOrderLists");

            migrationBuilder.RenameColumn(
                name: "OrderListId",
                table: "UserOrderLists",
                newName: "Status");

            migrationBuilder.AddColumn<DateTime>(
                name: "OrderDate",
                table: "UserOrderLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "UserOrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false),
                    UserOrderListId = table.Column<int>(type: "int", nullable: false),
                    SoftDeleted = table.Column<bool>(type: "bit", nullable: false),
                    AddedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AddedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserOrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserOrderItems_UserOrderLists_UserOrderListId",
                        column: x => x.UserOrderListId,
                        principalTable: "UserOrderLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserOrderItems_ProductId",
                table: "UserOrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOrderItems_UserOrderListId",
                table: "UserOrderItems",
                column: "UserOrderListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserOrderItems");

            migrationBuilder.DropColumn(
                name: "OrderDate",
                table: "UserOrderLists");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "UserOrderLists",
                newName: "OrderListId");

            migrationBuilder.CreateTable(
                name: "OrderLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AddedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrderNo = table.Column<int>(type: "int", nullable: false),
                    SoftDeleted = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AddedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrderListId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    SoftDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_OrderLists_OrderListId",
                        column: x => x.OrderListId,
                        principalTable: "OrderLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserOrderLists_OrderListId",
                table: "UserOrderLists",
                column: "OrderListId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderListId",
                table: "OrderItems",
                column: "OrderListId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserOrderLists_OrderLists_OrderListId",
                table: "UserOrderLists",
                column: "OrderListId",
                principalTable: "OrderLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
