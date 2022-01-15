using dataBase;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Modeli;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.Servisi
{
    public class KorisnikServis:BaseService<Korisnik,object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;
        private readonly ReportingService reportingService;

        public KorisnikServis(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context, ReportingService reportingService) :base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
            this.reportingService = reportingService;

        }

        public override Korisnik Update(int id, Korisnik obj)
        {
            var set = db_context.Set<Korisnik>();
            if (set != null)
            {
                var user = set.Find(id);
                if (user != null)
                {
                    user.ime_prezime = obj.ime_prezime;
                    user.username = obj.username;
                    user.email = obj.email;
                    user.password = obj.password;
                    user.confirmed = obj.confirmed;
                    user.broj_telefona = obj.broj_telefona;
                    user.b_date = obj.b_date;
                    user.datum_kreiranja_racuna = obj.datum_kreiranja_racuna;

                    db_context.SaveChanges();

                    return user;
                }
                else return null;

            }

            return null;
        }

        public override Korisnik Insert(Korisnik obj)
        {

            var mail = new ConfirmMailKorisnik() { issuedConfCode = "123456" };

            var resp = db_context.confirmMailKorisnik.Add(mail);

            db_context.SaveChanges();

            obj.confMailXkorisniciId = resp.Entity.id;

            obj.confMailXkorisnici = mail;

            obj.grad = db_context.grad.Find(obj.gradId);

            db_context.korisnici.Add(obj);

            db_context.SaveChanges();

            reportingService.NotifyClients();
            
            return obj;
        }
    }
}
