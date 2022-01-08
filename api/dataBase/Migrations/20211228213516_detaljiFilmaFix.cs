using Microsoft.EntityFrameworkCore.Migrations;

namespace dataBase.Migrations
{
    public partial class detaljiFilmaFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_filmovi_detaljiFilma_detaljiFilmaID",
                table: "filmovi");

            migrationBuilder.AlterColumn<int>(
                name: "detaljiFilmaID",
                table: "filmovi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_filmovi_detaljiFilma_detaljiFilmaID",
                table: "filmovi",
                column: "detaljiFilmaID",
                principalTable: "detaljiFilma",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_filmovi_detaljiFilma_detaljiFilmaID",
                table: "filmovi");

            migrationBuilder.AlterColumn<int>(
                name: "detaljiFilmaID",
                table: "filmovi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_filmovi_detaljiFilma_detaljiFilmaID",
                table: "filmovi",
                column: "detaljiFilmaID",
                principalTable: "detaljiFilma",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
