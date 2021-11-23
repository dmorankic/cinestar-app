using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace dataBase.Migrations
{
    public partial class damirIncijalno : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Radnik",
                table: "Radnik");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Klijent",
                table: "Klijent");

            migrationBuilder.RenameTable(
                name: "Radnik",
                newName: "radnici");

            migrationBuilder.RenameTable(
                name: "Klijent",
                newName: "klijenti");

            migrationBuilder.AddPrimaryKey(
                name: "PK_radnici",
                table: "radnici",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_klijenti",
                table: "klijenti",
                column: "id");

            migrationBuilder.CreateTable(
                name: "detaljiFilma",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    trajanje = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    datumObjave = table.Column<DateTime>(type: "datetime2", nullable: false),
                    trailer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    trailerID = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_detaljiFilma", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "glumacFilm",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    glumacId = table.Column<int>(type: "int", nullable: false),
                    filmId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_glumacFilm", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "glumci",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    datumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_glumci", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "vrstaProjekcije",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dimenzija = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vrstaProjekcije", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "filmovi",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    zanr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    slika = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    detaljiFilmaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filmovi", x => x.id);
                    table.ForeignKey(
                        name: "FK_filmovi_detaljiFilma_detaljiFilmaID",
                        column: x => x.detaljiFilmaID,
                        principalTable: "detaljiFilma",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "projekcije",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    vrijemePrikazivanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    vrstaProjekcijeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projekcije", x => x.id);
                    table.ForeignKey(
                        name: "FK_projekcije_vrstaProjekcije_vrstaProjekcijeId",
                        column: x => x.vrstaProjekcijeId,
                        principalTable: "vrstaProjekcije",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_filmovi_detaljiFilmaID",
                table: "filmovi",
                column: "detaljiFilmaID");

            migrationBuilder.CreateIndex(
                name: "IX_projekcije_vrstaProjekcijeId",
                table: "projekcije",
                column: "vrstaProjekcijeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "filmovi");

            migrationBuilder.DropTable(
                name: "glumacFilm");

            migrationBuilder.DropTable(
                name: "glumci");

            migrationBuilder.DropTable(
                name: "projekcije");

            migrationBuilder.DropTable(
                name: "detaljiFilma");

            migrationBuilder.DropTable(
                name: "vrstaProjekcije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_radnici",
                table: "radnici");

            migrationBuilder.DropPrimaryKey(
                name: "PK_klijenti",
                table: "klijenti");

            migrationBuilder.RenameTable(
                name: "radnici",
                newName: "Radnik");

            migrationBuilder.RenameTable(
                name: "klijenti",
                newName: "Klijent");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Radnik",
                table: "Radnik",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Klijent",
                table: "Klijent",
                column: "id");
        }
    }
}
