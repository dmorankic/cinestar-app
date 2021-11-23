using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using Modeli;


namespace dataBase
{
    public class ApplicationDbContext:DbContext
    {
        private readonly IConfiguration config;

        public ApplicationDbContext(IConfiguration config) : base()
        {
            this.config = config;
        }

        public DbSet<Radnik> radnici { get; set; }
        public DbSet<Film> filmovi { get; set; }
        public DbSet<DetaljiFilma> detaljiFilma { get; set; }
        public DbSet<Glumac> glumci { get; set; }
        public DbSet<GlumacFilm> glumacFilm { get; set; }
        public DbSet<Projekcija> projekcije { get; set; }
        public DbSet<VrstaProjekcije> vrstaProjekcije { get; set; }
        public DbSet<Korisnik> korisnici { get; set; }
        public DbSet<User> useri { get; set; }
        public DbSet<VrstaRadnika> vrstaRadnika { get; set; }
        public DbSet<ConfirmMailKorisnik> confirmMailKorisnik { get; set; }
        public DbSet<Ponuda> ponuda { get; set; }
        public DbSet<Kasa> kasa { get; set; }
        public DbSet<Racun> racun { get; set; }
        public DbSet<Proizvod> proizvod { get; set; }
        public DbSet<StavkaPonude> stavkaPonude { get; set; }
        public DbSet<Rad> radovi { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(config.GetConnectionString("sql_db"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Korisnik>().ToTable("Korisnik");
            modelBuilder.Entity<Radnik>().ToTable("Radnik");

        }
    }
}
