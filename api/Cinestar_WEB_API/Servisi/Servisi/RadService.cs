using dataBase;
using Microsoft.EntityFrameworkCore;
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
    public class RadService : BaseService<Rad,object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        public RadService(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context) : base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }

        public Rad Insert(Rad item)
        {
            db_context.radovi.Add(item);

            db_context.SaveChanges();

            return item;
        }

        public Rad Update(int id, Rad item)
        {
            var rad = db_context.radovi.Find(id);
            if (rad == null)
                return null;
            rad.vrijemeRada = item.vrijemeRada;
            rad.totalKase = item.totalKase;

            if (item.radnikId != 0) { 
                rad.radnikId = item.radnikId;
                rad.radnik = item.radnik;
                
            }

            if(item.kasaId != 0) {
                rad.kasaId = item.kasaId;
                rad.kasa = item.kasa;
            }

            db_context.SaveChanges();

            return rad;
        }
    }
}
