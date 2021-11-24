using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace dataBase.Migrations
{
    public partial class baza : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "confirmMailKorisnik",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    issuedConfCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_confirmMailKorisnik", x => x.id);
                });

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
                name: "grad",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grad", x => x.id);
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
                name: "vrstaRadnika",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vrstaRadnika", x => x.id);
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
                name: "kino",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    gradId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kino", x => x.id);
                    table.ForeignKey(
                        name: "FK_kino_grad_gradId",
                        column: x => x.gradId,
                        principalTable: "grad",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "useri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime_prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    b_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    broj_telefona = table.Column<int>(type: "int", nullable: false),
                    gradId = table.Column<int>(type: "int", nullable: false),
                    spol = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_useri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_useri_grad_gradId",
                        column: x => x.gradId,
                        principalTable: "grad",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
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
                    table.ForeignKey(
                        name: "FK_glumacFilm_filmovi_filmId",
                        column: x => x.filmId,
                        principalTable: "filmovi",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_glumacFilm_glumci_glumacId",
                        column: x => x.glumacId,
                        principalTable: "glumci",
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
                    vrstaProjekcijeId = table.Column<int>(type: "int", nullable: false),
                    filmId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projekcije", x => x.id);
                    table.ForeignKey(
                        name: "FK_projekcije_filmovi_filmId",
                        column: x => x.filmId,
                        principalTable: "filmovi",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_projekcije_vrstaProjekcije_vrstaProjekcijeId",
                        column: x => x.vrstaProjekcijeId,
                        principalTable: "vrstaProjekcije",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "dvorana",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brojDvorane = table.Column<int>(type: "int", nullable: false),
                    brojSjedista = table.Column<int>(type: "int", nullable: false),
                    kinoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dvorana", x => x.id);
                    table.ForeignKey(
                        name: "FK_dvorana_kino_kinoId",
                        column: x => x.kinoId,
                        principalTable: "kino",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "kasa",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    stanje_kase = table.Column<double>(type: "float", nullable: false),
                    aktivna = table.Column<bool>(type: "bit", nullable: false),
                    kinoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kasa", x => x.id);
                    table.ForeignKey(
                        name: "FK_kasa_kino_kinoId",
                        column: x => x.kinoId,
                        principalTable: "kino",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    datum_kreiranja_racuna = table.Column<DateTime>(type: "datetime2", nullable: false),
                    confirmed = table.Column<int>(type: "int", nullable: false),
                    confMailXkorisniciId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Korisnik_confirmMailKorisnik_confMailXkorisniciId",
                        column: x => x.confMailXkorisniciId,
                        principalTable: "confirmMailKorisnik",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Korisnik_useri_Id",
                        column: x => x.Id,
                        principalTable: "useri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Radnik",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    jmbg = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    datum_uposljenja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    strucnaSprema = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    plata = table.Column<int>(type: "int", nullable: false),
                    vrstaRadnikaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Radnik", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Radnik_useri_Id",
                        column: x => x.Id,
                        principalTable: "useri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Radnik_vrstaRadnika_vrstaRadnikaId",
                        column: x => x.vrstaRadnikaId,
                        principalTable: "vrstaRadnika",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "sjediste",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    red = table.Column<int>(type: "int", nullable: false),
                    kolona = table.Column<int>(type: "int", nullable: false),
                    dvoranaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sjediste", x => x.id);
                    table.ForeignKey(
                        name: "FK_sjediste_dvorana_dvoranaId",
                        column: x => x.dvoranaId,
                        principalTable: "dvorana",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ponuda",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vrsta_ponude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pocetakPonude = table.Column<DateTime>(type: "datetime2", nullable: false),
                    trajanjePonude = table.Column<int>(type: "int", nullable: false),
                    krajPonude = table.Column<DateTime>(type: "datetime2", nullable: false),
                    radnikId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ponuda", x => x.id);
                    table.ForeignKey(
                        name: "FK_ponuda_Radnik_radnikId",
                        column: x => x.radnikId,
                        principalTable: "Radnik",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "radovi",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kasaId = table.Column<int>(type: "int", nullable: false),
                    radnikId = table.Column<int>(type: "int", nullable: false),
                    vrijemeRada = table.Column<DateTime>(type: "datetime2", nullable: false),
                    totalKase = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_radovi", x => x.id);
                    table.ForeignKey(
                        name: "FK_radovi_kasa_kasaId",
                        column: x => x.kasaId,
                        principalTable: "kasa",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_radovi_Radnik_radnikId",
                        column: x => x.radnikId,
                        principalTable: "Radnik",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "stavkaPonude",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    datumPocetka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    datumZavrsetka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ukupnaCijena = table.Column<double>(type: "float", nullable: false),
                    ponudaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stavkaPonude", x => x.id);
                    table.ForeignKey(
                        name: "FK_stavkaPonude_ponuda_ponudaId",
                        column: x => x.ponudaId,
                        principalTable: "ponuda",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "proizvod",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    porcija = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cijena = table.Column<double>(type: "float", nullable: false),
                    stavkaPonudeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proizvod", x => x.id);
                    table.ForeignKey(
                        name: "FK_proizvod_stavkaPonude_stavkaPonudeId",
                        column: x => x.stavkaPonudeId,
                        principalTable: "stavkaPonude",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "racun",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ukupnaCijena = table.Column<double>(type: "float", nullable: false),
                    vrijemeKupovine = table.Column<DateTime>(type: "datetime2", nullable: false),
                    kasaId = table.Column<int>(type: "int", nullable: false),
                    stavkaPonudeId = table.Column<int>(type: "int", nullable: true),
                    korisnikId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_racun", x => x.id);
                    table.ForeignKey(
                        name: "FK_racun_kasa_kasaId",
                        column: x => x.kasaId,
                        principalTable: "kasa",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_racun_Korisnik_korisnikId",
                        column: x => x.korisnikId,
                        principalTable: "Korisnik",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_racun_stavkaPonude_stavkaPonudeId",
                        column: x => x.stavkaPonudeId,
                        principalTable: "stavkaPonude",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "karta",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cijena = table.Column<float>(type: "real", nullable: false),
                    projekcijaId = table.Column<int>(type: "int", nullable: false),
                    sjedisteId = table.Column<int>(type: "int", nullable: false),
                    Racunid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_karta", x => x.id);
                    table.ForeignKey(
                        name: "FK_karta_projekcije_projekcijaId",
                        column: x => x.projekcijaId,
                        principalTable: "projekcije",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_karta_racun_Racunid",
                        column: x => x.Racunid,
                        principalTable: "racun",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_karta_sjediste_sjedisteId",
                        column: x => x.sjedisteId,
                        principalTable: "sjediste",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dvorana_kinoId",
                table: "dvorana",
                column: "kinoId");

            migrationBuilder.CreateIndex(
                name: "IX_filmovi_detaljiFilmaID",
                table: "filmovi",
                column: "detaljiFilmaID");

            migrationBuilder.CreateIndex(
                name: "IX_glumacFilm_filmId",
                table: "glumacFilm",
                column: "filmId");

            migrationBuilder.CreateIndex(
                name: "IX_glumacFilm_glumacId",
                table: "glumacFilm",
                column: "glumacId");

            migrationBuilder.CreateIndex(
                name: "IX_karta_projekcijaId",
                table: "karta",
                column: "projekcijaId");

            migrationBuilder.CreateIndex(
                name: "IX_karta_Racunid",
                table: "karta",
                column: "Racunid");

            migrationBuilder.CreateIndex(
                name: "IX_karta_sjedisteId",
                table: "karta",
                column: "sjedisteId");

            migrationBuilder.CreateIndex(
                name: "IX_kasa_kinoId",
                table: "kasa",
                column: "kinoId");

            migrationBuilder.CreateIndex(
                name: "IX_kino_gradId",
                table: "kino",
                column: "gradId");

            migrationBuilder.CreateIndex(
                name: "IX_Korisnik_confMailXkorisniciId",
                table: "Korisnik",
                column: "confMailXkorisniciId");

            migrationBuilder.CreateIndex(
                name: "IX_ponuda_radnikId",
                table: "ponuda",
                column: "radnikId");

            migrationBuilder.CreateIndex(
                name: "IX_proizvod_stavkaPonudeId",
                table: "proizvod",
                column: "stavkaPonudeId");

            migrationBuilder.CreateIndex(
                name: "IX_projekcije_filmId",
                table: "projekcije",
                column: "filmId");

            migrationBuilder.CreateIndex(
                name: "IX_projekcije_vrstaProjekcijeId",
                table: "projekcije",
                column: "vrstaProjekcijeId");

            migrationBuilder.CreateIndex(
                name: "IX_racun_kasaId",
                table: "racun",
                column: "kasaId");

            migrationBuilder.CreateIndex(
                name: "IX_racun_korisnikId",
                table: "racun",
                column: "korisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_racun_stavkaPonudeId",
                table: "racun",
                column: "stavkaPonudeId");

            migrationBuilder.CreateIndex(
                name: "IX_Radnik_vrstaRadnikaId",
                table: "Radnik",
                column: "vrstaRadnikaId");

            migrationBuilder.CreateIndex(
                name: "IX_radovi_kasaId",
                table: "radovi",
                column: "kasaId");

            migrationBuilder.CreateIndex(
                name: "IX_radovi_radnikId",
                table: "radovi",
                column: "radnikId");

            migrationBuilder.CreateIndex(
                name: "IX_sjediste_dvoranaId",
                table: "sjediste",
                column: "dvoranaId");

            migrationBuilder.CreateIndex(
                name: "IX_stavkaPonude_ponudaId",
                table: "stavkaPonude",
                column: "ponudaId");

            migrationBuilder.CreateIndex(
                name: "IX_useri_gradId",
                table: "useri",
                column: "gradId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "glumacFilm");

            migrationBuilder.DropTable(
                name: "karta");

            migrationBuilder.DropTable(
                name: "proizvod");

            migrationBuilder.DropTable(
                name: "radovi");

            migrationBuilder.DropTable(
                name: "glumci");

            migrationBuilder.DropTable(
                name: "projekcije");

            migrationBuilder.DropTable(
                name: "racun");

            migrationBuilder.DropTable(
                name: "sjediste");

            migrationBuilder.DropTable(
                name: "filmovi");

            migrationBuilder.DropTable(
                name: "vrstaProjekcije");

            migrationBuilder.DropTable(
                name: "kasa");

            migrationBuilder.DropTable(
                name: "Korisnik");

            migrationBuilder.DropTable(
                name: "stavkaPonude");

            migrationBuilder.DropTable(
                name: "dvorana");

            migrationBuilder.DropTable(
                name: "detaljiFilma");

            migrationBuilder.DropTable(
                name: "confirmMailKorisnik");

            migrationBuilder.DropTable(
                name: "ponuda");

            migrationBuilder.DropTable(
                name: "kino");

            migrationBuilder.DropTable(
                name: "Radnik");

            migrationBuilder.DropTable(
                name: "useri");

            migrationBuilder.DropTable(
                name: "vrstaRadnika");

            migrationBuilder.DropTable(
                name: "grad");
        }
    }
}
