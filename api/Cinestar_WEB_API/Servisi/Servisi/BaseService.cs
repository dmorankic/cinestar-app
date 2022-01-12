using dataBase;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Servisi.IServisi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.Servisi
{
    public class BaseService<db_type, view_type> : IBaseService<db_type, view_type> where db_type : class
    {
        //private readonly IMapper mapper;
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        //public CrudRepo(DB_Context db,IMapper mapper,IConfiguration config,ILogger logger):base(db,mapper, config)
        public BaseService(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }
        public virtual db_type Delete(int id)
        {
            var set = db_context.Set<db_type>();
            var record = set.Find(id);
            if (record != null)
            {
                var result = set.Remove(record);
                db_context.SaveChanges();
            }
            return record;
        }

        public virtual IEnumerable<db_type> GetAll()
        {
            var set = db_context.Set<db_type>();
            return set.ToList();
        }

        public virtual db_type GetById(int id)
        {
            var set = db_context.Set<db_type>();
            var record =  set.Find(id);
            return record;
        }

        public virtual db_type Insert(db_type obj)
        {
            var set = db_context.Set<db_type>();
            set.Add(obj);
             db_context.SaveChanges();
            return obj;
        }

        public virtual db_type Update(int id, db_type obj)
        {
            var set = db_context.Set<db_type>();
            var data = set.Find(id);
           
            //requires over
            //data.property = .....
            
            db_context.SaveChanges();
            return obj;
        }
    }
}
