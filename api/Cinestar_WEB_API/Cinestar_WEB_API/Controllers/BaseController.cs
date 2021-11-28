using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Servisi.IServisi;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cinestar_WEB_API.Controllers
{
    [ApiController]
    [EnableCors("default")]

    public class BaseController<db_type,view_type> : Controller
    {
        private readonly IBaseService<db_type, view_type> service;

        public BaseController(IBaseService<db_type, view_type> service)
        {
            this.service = service;
        }

        [HttpGet]
        public virtual async Task<IEnumerable<db_type>> GetAll()//[FromQuery] TSearch q)
        {
            return await service.GetAll();
        }

        [HttpGet("{id}")]
        public virtual async Task<db_type> GetByID(int id)
        {
            return await service.GetById(id);
        }

        [HttpPut("{id}")]
        public virtual async Task<db_type> Update(int id,[FromBody] db_type entity)
        {
            return await service.Update(id, entity);
        }

        [HttpPost]
        public virtual async Task<db_type> Insert([FromBody] db_type entity)
        {
            return await service.Insert(entity);
        }

        [HttpDelete("{id}")]
        public virtual async Task<db_type> Delete(int id)
        {
            return await service.Delete(id);
        }
    }
}
