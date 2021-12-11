﻿using dataBase;
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
    public class RacunService :BaseService<Racun,object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        public RacunService(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context) : base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }

        public override Racun Update(int id, Racun obj)
        {
            var set = db_context.racun;

            var racun = set.Find(id);

            racun.korisnikId = obj.korisnikId;
            racun.stavkaPonudeId = obj.stavkaPonudeId;
            racun.vrijemeKupovine = obj.vrijemeKupovine;
            racun.kasaId = obj.kasaId;
            racun.ukupnaCijena = obj.ukupnaCijena;

            db_context.SaveChanges();

            return obj;
        }

     
    }
}
