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
    public class UlogeServis : BaseService<VrstaRadnika, object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        public UlogeServis(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context) : base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }

        public override async Task<VrstaRadnika> Update(int id, VrstaRadnika obj)
        {
            return await base.Update(id, obj);
        }

        public override async Task<VrstaRadnika> Insert(VrstaRadnika obj)
        {
            return await base.Insert(obj);
        }
    }
}
