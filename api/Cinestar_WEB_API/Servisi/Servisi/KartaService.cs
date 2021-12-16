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
    public class KartaService : BaseService<Karta, object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        public KartaService(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context) : base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }

        public override Karta Update(int id, Karta obj)
        {
            var set = db_context.karta;

            var karta = set.Find(id);

            karta.cijena = obj.cijena;
            karta.projekcijaId=obj.projekcijaId;
            karta.sjedisteId = obj.sjedisteId;

            return obj;
        }


    }
}