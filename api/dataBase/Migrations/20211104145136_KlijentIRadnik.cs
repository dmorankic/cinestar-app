using Microsoft.EntityFrameworkCore.Migrations;

namespace dataBase.Migrations
{
    public partial class KlijentIRadnik : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Klijent",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    imePrezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    korisnickoIme = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    lozinka = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    email = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klijent", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Radnik",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    imePrezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    korisnickoIme = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    lozinka = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    email = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    JMBG = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    brojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Radnik", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Klijent");

            migrationBuilder.DropTable(
                name: "Radnik");
        }
    }
}
