using Microsoft.EntityFrameworkCore.Migrations;

namespace dataBase.Migrations
{
    public partial class damirFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "filmId",
                table: "projekcije",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_projekcije_filmId",
                table: "projekcije",
                column: "filmId");

            migrationBuilder.CreateIndex(
                name: "IX_glumacFilm_filmId",
                table: "glumacFilm",
                column: "filmId");

            migrationBuilder.CreateIndex(
                name: "IX_glumacFilm_glumacId",
                table: "glumacFilm",
                column: "glumacId");

            migrationBuilder.AddForeignKey(
                name: "FK_glumacFilm_filmovi_filmId",
                table: "glumacFilm",
                column: "filmId",
                principalTable: "filmovi",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_glumacFilm_glumci_glumacId",
                table: "glumacFilm",
                column: "glumacId",
                principalTable: "glumci",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_projekcije_filmovi_filmId",
                table: "projekcije",
                column: "filmId",
                principalTable: "filmovi",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_glumacFilm_filmovi_filmId",
                table: "glumacFilm");

            migrationBuilder.DropForeignKey(
                name: "FK_glumacFilm_glumci_glumacId",
                table: "glumacFilm");

            migrationBuilder.DropForeignKey(
                name: "FK_projekcije_filmovi_filmId",
                table: "projekcije");

            migrationBuilder.DropIndex(
                name: "IX_projekcije_filmId",
                table: "projekcije");

            migrationBuilder.DropIndex(
                name: "IX_glumacFilm_filmId",
                table: "glumacFilm");

            migrationBuilder.DropIndex(
                name: "IX_glumacFilm_glumacId",
                table: "glumacFilm");

            migrationBuilder.DropColumn(
                name: "filmId",
                table: "projekcije");
        }
    }
}
