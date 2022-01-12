using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Servisi.IServisi;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cinestar_WEB_API.Controllers
{
    [ApiController]
    public class BaseController<db_type,view_type> : Controller
    {
        private readonly IBaseService<db_type, view_type> service;

        public BaseController(IBaseService<db_type, view_type> service)
        {
            this.service = service;
        }

        [HttpGet]
        public virtual IEnumerable<db_type> GetAll()//[FromQuery] TSearch q)
        {
            var result = service.GetAll();
            return result;
        }

        [HttpGet("{id}")]
        public virtual db_type GetByID(int id)
        {
            return service.GetById(id);
        }

        [HttpPut("{id}")]
        public virtual db_type Update(int id,[FromBody] db_type entity)
        {
            return service.Update(id, entity);
        }

        [HttpPost]
        public virtual db_type Insert([FromBody] db_type entity)
        {
            return service.Insert(entity);
        }

        [HttpDelete("{id}")]
        public virtual db_type Delete(int id)
        {
            return service.Delete(id);
        }
    }
}
