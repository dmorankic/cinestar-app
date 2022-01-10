using Modeli;
using Modeli.DashboardModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace dataBase
{
    public class DashboardDataManager
    {
        private readonly ApplicationDbContext dbContext;

        public DashboardDataManager(ApplicationDbContext _dbContext)
        {
            dbContext= _dbContext;
        }
        public RealTimeReport prepareReport() {


            RealTimeReport report = new RealTimeReport();
            
            foreach (var item in dbContext.racun)
            {
                var topUser = report.topUsers.Find(x=> x.id == item.korisnikId);

                if (topUser==null)
                {
                    var user = dbContext.korisnici.Find(item.korisnikId);
                    report.topUsers.Add(new TopUser() { id=item.korisnikId,name=user.username,total=item.ukupnaCijena});
                }
                else
                {
                    topUser.total += item.ukupnaCijena;
                }

                dynamic karta = new object();
                foreach(var ticket in dbContext.karta)
                {
                    if (ticket.racunId == item.id)
                    {
                        karta = ticket;
                        break;
                    }
                }

                if (!(karta is Karta))
                    return report;

                var projekcija = dbContext.projekcije.Find(karta.projekcijaId);

                var topMovie = report.topMovies.Find(x=>x.id == projekcija.filmId);

                if (topMovie == null)
                {
                    if (karta != null)
                    {
                        var movie = dbContext.filmovi.Find(projekcija.filmId);
                        report.topMovies.Add(new TopMovie() { id = item.korisnikId, title = movie.naziv, count = 1 });
                    }
                }
                else
                {
                    topMovie.count++;
                }

                var sjediste = dbContext.sjediste.Find(karta.sjedisteId);
                var dvorana = dbContext.dvorana.Find(sjediste.dvoranaId);
                var topKino = report.topTheaters.Find(x=>x.id == dvorana.kinoId);

                if (topKino == null)
                {
                   
                    var kino = dbContext.kino.Find(dvorana.kinoId);
                    var grad = dbContext.grad.Find(kino.gradId);
                    report.topTheaters.Add(new TopTheatar() { id = item.korisnikId, grad = kino.grad.naziv, visits = 1 });
                }
                else
                {
                    topKino.visits++;
                }
            }

            return report;
        }
    }
}
