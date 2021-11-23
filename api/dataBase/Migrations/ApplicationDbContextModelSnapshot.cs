﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using dataBase;

namespace dataBase.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11");

            modelBuilder.Entity("Modeli.ConfirmMailKorisnik", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("issuedConfCode")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("confirmMailKorisnik");
                });

            modelBuilder.Entity("Modeli.DetaljiFilma", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("datumObjave")
                        .HasColumnType("datetime2");

                    b.Property<string>("trailer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("trailerID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("trajanje")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("detaljiFilma");
                });

            modelBuilder.Entity("Modeli.Film", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("detaljiFilmaID")
                        .HasColumnType("int");

                    b.Property<string>("naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("slika")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("zanr")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("detaljiFilmaID");

                    b.ToTable("filmovi");
                });

            modelBuilder.Entity("Modeli.Glumac", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("datumRodjenja")
                        .HasColumnType("datetime2");

                    b.Property<string>("ime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("prezime")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("glumci");
                });

            modelBuilder.Entity("Modeli.GlumacFilm", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("filmId")
                        .HasColumnType("int");

                    b.Property<int>("glumacId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("filmId");

                    b.HasIndex("glumacId");

                    b.ToTable("glumacFilm");
                });

            modelBuilder.Entity("Modeli.Kasa", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<bool>("aktivna")
                        .HasColumnType("bit");

                    b.Property<double>("stanje_kase")
                        .HasColumnType("float");

                    b.HasKey("id");

                    b.ToTable("kasa");
                });

            modelBuilder.Entity("Modeli.Ponuda", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("krajPonude")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("pocetakPonude")
                        .HasColumnType("datetime2");

                    b.Property<int>("radnikId")
                        .HasColumnType("int");

                    b.Property<int>("trajanjePonude")
                        .HasColumnType("int");

                    b.Property<string>("vrsta_ponude")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("radnikId");

                    b.ToTable("ponuda");
                });

            modelBuilder.Entity("Modeli.Proizvod", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<double>("cijena")
                        .HasColumnType("float");

                    b.Property<string>("naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("porcija")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("stavkaPonudeId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("stavkaPonudeId");

                    b.ToTable("proizvod");
                });

            modelBuilder.Entity("Modeli.Projekcija", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("dan")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("filmId")
                        .HasColumnType("int");

                    b.Property<DateTime>("vrijemePrikazivanja")
                        .HasColumnType("datetime2");

                    b.Property<int>("vrstaProjekcijeId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("filmId");

                    b.HasIndex("vrstaProjekcijeId");

                    b.ToTable("projekcije");
                });

            modelBuilder.Entity("Modeli.Racun", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("kasaId")
                        .HasColumnType("int");

                    b.Property<int?>("stavkaPonudeId")
                        .HasColumnType("int");

                    b.Property<double>("ukupnaCijena")
                        .HasColumnType("float");

                    b.Property<DateTime>("vrijemeKupovine")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.HasIndex("kasaId");

                    b.HasIndex("stavkaPonudeId");

                    b.ToTable("racun");
                });

            modelBuilder.Entity("Modeli.Rad", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("kasaId")
                        .HasColumnType("int");

                    b.Property<int>("radnikId")
                        .HasColumnType("int");

                    b.Property<double>("totalKase")
                        .HasColumnType("float");

                    b.Property<DateTime>("vrijemeRada")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.HasIndex("kasaId");

                    b.HasIndex("radnikId");

                    b.ToTable("radovi");
                });

            modelBuilder.Entity("Modeli.StavkaPonude", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("datumPocetka")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("datumZavrsetka")
                        .HasColumnType("datetime2");

                    b.Property<string>("naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ponudaId")
                        .HasColumnType("int");

                    b.Property<double>("ukupnaCijena")
                        .HasColumnType("float");

                    b.HasKey("id");

                    b.HasIndex("ponudaId");

                    b.ToTable("stavkaPonude");
                });

            modelBuilder.Entity("Modeli.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("b_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("broj_telefona")
                        .HasColumnType("int");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ime_prezime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("useri");
                });

            modelBuilder.Entity("Modeli.VrstaProjekcije", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("dimenzija")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("vrstaProjekcije");
                });

            modelBuilder.Entity("Modeli.VrstaRadnika", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("vrstaRadnika");
                });

            modelBuilder.Entity("Modeli.Korisnik", b =>
                {
                    b.HasBaseType("Modeli.User");

                    b.Property<int?>("confMailXkorisniciId")
                        .HasColumnType("int");

                    b.Property<int>("confirmed")
                        .HasColumnType("int");

                    b.Property<DateTime>("datum_kreiranja_racuna")
                        .HasColumnType("datetime2");

                    b.HasIndex("confMailXkorisniciId");

                    b.ToTable("Korisnik");
                });

            modelBuilder.Entity("Modeli.Radnik", b =>
                {
                    b.HasBaseType("Modeli.User");

                    b.Property<string>("datum_uposljenja")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("jmbg")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("strucnaSprema")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("vrstaRadnikaId")
                        .HasColumnType("int");

                    b.HasIndex("vrstaRadnikaId");

                    b.ToTable("Radnik");
                });

            modelBuilder.Entity("Modeli.Film", b =>
                {
                    b.HasOne("Modeli.DetaljiFilma", "detaljiFilma")
                        .WithMany()
                        .HasForeignKey("detaljiFilmaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("detaljiFilma");
                });

            modelBuilder.Entity("Modeli.GlumacFilm", b =>
                {
                    b.HasOne("Modeli.Film", "film")
                        .WithMany()
                        .HasForeignKey("filmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Modeli.Glumac", "glumac")
                        .WithMany()
                        .HasForeignKey("glumacId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("film");

                    b.Navigation("glumac");
                });

            modelBuilder.Entity("Modeli.Ponuda", b =>
                {
                    b.HasOne("Modeli.Radnik", "radnik")
                        .WithMany()
                        .HasForeignKey("radnikId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("radnik");
                });

            modelBuilder.Entity("Modeli.Proizvod", b =>
                {
                    b.HasOne("Modeli.StavkaPonude", "stavkaPonude")
                        .WithMany()
                        .HasForeignKey("stavkaPonudeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("stavkaPonude");
                });

            modelBuilder.Entity("Modeli.Projekcija", b =>
                {
                    b.HasOne("Modeli.Film", "film")
                        .WithMany()
                        .HasForeignKey("filmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Modeli.VrstaProjekcije", "vrstaProjekcije")
                        .WithMany()
                        .HasForeignKey("vrstaProjekcijeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("film");

                    b.Navigation("vrstaProjekcije");
                });

            modelBuilder.Entity("Modeli.Racun", b =>
                {
                    b.HasOne("Modeli.Kasa", "kasa")
                        .WithMany()
                        .HasForeignKey("kasaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Modeli.StavkaPonude", "stavkaPonude")
                        .WithMany()
                        .HasForeignKey("stavkaPonudeId");

                    b.Navigation("kasa");

                    b.Navigation("stavkaPonude");
                });

            modelBuilder.Entity("Modeli.Rad", b =>
                {
                    b.HasOne("Modeli.Kasa", "kasa")
                        .WithMany()
                        .HasForeignKey("kasaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Modeli.Radnik", "radnik")
                        .WithMany()
                        .HasForeignKey("radnikId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("kasa");

                    b.Navigation("radnik");
                });

            modelBuilder.Entity("Modeli.StavkaPonude", b =>
                {
                    b.HasOne("Modeli.Ponuda", "ponude")
                        .WithMany()
                        .HasForeignKey("ponudaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ponude");
                });

            modelBuilder.Entity("Modeli.Korisnik", b =>
                {
                    b.HasOne("Modeli.User", null)
                        .WithOne()
                        .HasForeignKey("Modeli.Korisnik", "Id")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.HasOne("Modeli.ConfirmMailKorisnik", "confMailXkorisnici")
                        .WithMany()
                        .HasForeignKey("confMailXkorisniciId");

                    b.Navigation("confMailXkorisnici");
                });

            modelBuilder.Entity("Modeli.Radnik", b =>
                {
                    b.HasOne("Modeli.User", null)
                        .WithOne()
                        .HasForeignKey("Modeli.Radnik", "Id")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.HasOne("Modeli.VrstaRadnika", "vrstaRadnika")
                        .WithMany()
                        .HasForeignKey("vrstaRadnikaId");

                    b.Navigation("vrstaRadnika");
                });
#pragma warning restore 612, 618
        }
    }
}
