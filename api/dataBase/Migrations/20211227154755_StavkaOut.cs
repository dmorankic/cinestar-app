using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace dataBase.Migrations
{
    public partial class StavkaOut : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_proizvod_stavkaPonude_stavkaPonudeId",
                table: "proizvod");

            migrationBuilder.DropIndex(
                name: "IX_proizvod_stavkaPonudeId",
                table: "proizvod");

            migrationBuilder.DropColumn(
                name: "stavkaPonudeId",
                table: "proizvod");

            migrationBuilder.AddColumn<int>(
                name: "ponudaId",
                table: "proizvod",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "slika",
                table: "filmovi",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "rating",
                table: "filmovi",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateIndex(
                name: "IX_proizvod_ponudaId",
                table: "proizvod",
                column: "ponudaId");

            migrationBuilder.AddForeignKey(
                name: "FK_proizvod_ponuda_ponudaId",
                table: "proizvod",
                column: "ponudaId",
                principalTable: "ponuda",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_proizvod_ponuda_ponudaId",
                table: "proizvod");

            migrationBuilder.DropIndex(
                name: "IX_proizvod_ponudaId",
                table: "proizvod");

            migrationBuilder.DropColumn(
                name: "ponudaId",
                table: "proizvod");

            migrationBuilder.DropColumn(
                name: "rating",
                table: "filmovi");

            migrationBuilder.AddColumn<int>(
                name: "stavkaPonudeId",
                table: "proizvod",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<byte[]>(
                name: "slika",
                table: "filmovi",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_proizvod_stavkaPonudeId",
                table: "proizvod",
                column: "stavkaPonudeId");

            migrationBuilder.AddForeignKey(
                name: "FK_proizvod_stavkaPonude_stavkaPonudeId",
                table: "proizvod",
                column: "stavkaPonudeId",
                principalTable: "stavkaPonude",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
