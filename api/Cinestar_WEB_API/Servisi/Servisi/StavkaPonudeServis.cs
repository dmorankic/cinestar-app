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
    public class StavkaPonudeServis:BaseService<StavkaPonude,object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        public StavkaPonudeServis(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context) : base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }


        public override StavkaPonude Update(int id,StavkaPonude obj)
        {
            var set = db_context.stavkaPonude;

            var stavka = set.Find(id);

            stavka.naziv = obj.naziv;
            stavka.ponudaId = obj.ponudaId;
            stavka.ukupnaCijena = obj.ukupnaCijena;
            stavka.datumZavrsetka = obj.datumZavrsetka;
            stavka.datumPocetka = obj.datumPocetka;

            db_context.SaveChanges();

            return obj;
        }
    }
}
