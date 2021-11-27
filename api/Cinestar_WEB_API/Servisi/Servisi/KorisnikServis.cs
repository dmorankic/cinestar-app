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

        public KorisnikServis(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context):base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }

        public override async Task<Korisnik> Update(int id, Korisnik obj)
        {
            var set = db_context.Set<Korisnik>();
            var user = set.Find(id);

            user.ime_prezime = obj.ime_prezime;
            user.username = obj.username;
            user.email = obj.email;
            user.password = obj.password;
            user.confirmed = obj.confirmed;
            user.broj_telefona = obj.broj_telefona;
            user.b_date = obj.b_date;
            user.datum_kreiranja_racuna = obj.datum_kreiranja_racuna;


            await db_context.SaveChangesAsync();

            return user;
        }

        public override async Task<Korisnik> Insert(Korisnik obj)
        {
            var mail = new ConfirmMailKorisnik() { issuedConfCode = "123456" };


            db_context.confirmMailKorisnik.Add(mail);

            db_context.SaveChanges();

            //obj.confirmMailKorisnikId = db_context.confirmMailKorisnik.Where(x => x.user == mail.user).FirstOrDefault().id;

            obj.confirmMailKorisnik = mail;

            obj.gradId = obj.gradId;
            obj.grad = db_context.grad.Find(obj.gradId);

            db_context.korisnici.Add(obj);

            await db_context.SaveChangesAsync();

            return obj;
        }
    }
}
