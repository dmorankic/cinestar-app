using dataBase;
using Microsoft.AspNetCore.Mvc;
using Modeli;
using Modeli.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinestar_WEB_API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class DetaljiFilmaController :ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public DetaljiFilmaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public DetaljiFilma Add([FromBody] DetaljiFilmaAddVm x)
        {
            DetaljiFilma dodaj = new DetaljiFilma()
            {
                trajanje = x._trajanje,
                datumObjave = x._datumObjave,
                trailer = x._trailer
            };
            _dbContext.Add(dodaj);
            _dbContext.SaveChanges();
            return dodaj;
        }




      
        [HttpGet]
        public List<DetaljiFilma> GetAll(int? _id)
        {
            return _dbContext.detaljiFilma.Where(x => _id == null || _id == x.id).ToList();
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            if (_dbContext.detaljiFilma.Count() < 1)
                return BadRequest("Nije pronadjen ni jedan zapis o detaljima filma");

            DetaljiFilma brisi = _dbContext.detaljiFilma.Find(id);

            if (brisi == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(brisi);

            _dbContext.SaveChanges();
            return Ok(brisi);
        }
        [HttpPost]
        public ActionResult Update(int id, [FromBody] DetaljiFilmaAddVm x)
        {
            DetaljiFilma edit = _dbContext.detaljiFilma.Find(id);

            if (edit == null)
                return BadRequest("pogresan ID");

            edit.trajanje = x._trajanje;
            edit.datumObjave = x._datumObjave;
            edit.trailer = x._trailer;

            _dbContext.SaveChanges();
            return Ok(edit);
        }

    }
}
