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
    public class FilmController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public FilmController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
       

        [HttpPost("{detaljiFilmaId}")]
        public Film Add([FromBody] FilmAddVm x,int detaljiFilmaId)
        {

            //DetaljiFilma check = new DetaljiFilma();
            //if (x._detaljiFilmaID != null)
            //    check = _dbContext.detaljiFilma.Find(x._detaljiFilmaID);
            //else
            //    check.id = 0;


            


            Film dodaj = new Film()
            {
                naziv = x._naziv,
                zanr = x._zanr,
                detaljiFilmaID = detaljiFilmaId
                //,slika=x._slika

            };
            _dbContext.Add(dodaj);
            _dbContext.SaveChanges();
            return dodaj;
        }

        [HttpGet]
        public List<Film> GetAll(int? _id)
        {
            return _dbContext.filmovi.Where(x => _id == null || _id == x.id).ToList();

        }


        [HttpPost]
        public ActionResult Update(int id, [FromBody] FilmAddVm x)
        {
            Film edit = _dbContext.filmovi.Find(id);

            if (edit == null)
                return BadRequest("pogresan ID");

            edit.naziv = x._naziv;
            edit.zanr = x._zanr;


            _dbContext.SaveChanges();
            return Ok(edit);
        }




    }
}
