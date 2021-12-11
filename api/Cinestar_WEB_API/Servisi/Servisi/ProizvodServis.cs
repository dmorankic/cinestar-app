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
    public class ProizvodServis : BaseService<Proizvod, object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        public ProizvodServis(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context) : base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }

        public override Proizvod Insert(Proizvod obj)
        { 
            var stavkaPonude = db_context.stavkaPonude.Find(obj.stavkaPonudeId);

            if (stavkaPonude == null)
                return new Proizvod() { naziv = "error | stavka ponude nije nađena" };

            obj.stavkaPonude = stavkaPonude;

            db_context.SaveChanges();

            return obj;
        }

        public override Proizvod Update(int id, Proizvod obj)
        {
            var set = db_context.Set<Proizvod>();

            var proizvod = set.Find(id);

            proizvod.stavkaPonudeId = obj.stavkaPonudeId;

            var stavkaPonude = db_context.stavkaPonude.Find(obj.stavkaPonudeId);

            if (stavkaPonude == null)
                return new Proizvod() { naziv = "error | stavka ponude nije nađena" };

            obj.stavkaPonude = stavkaPonude;

            proizvod.naziv = obj.naziv;

            proizvod.porcija = obj.porcija;

            proizvod.cijena = obj.cijena;

            db_context.SaveChanges();

            return obj;
        }
    }
}
