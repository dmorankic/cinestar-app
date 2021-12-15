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
       

        [HttpPost]
        public ActionResult Add([FromBody] FilmAddVm x)
        {

            //DetaljiFilma check = new DetaljiFilma();
            //if (x._detaljiFilmaID != null)
            //    check = _dbContext.detaljiFilma.Find(x._detaljiFilmaID);
            //else
            //    check.id = 0;

            if (_dbContext.detaljiFilma.Find(x._detaljiFilmaId) == null)
                return BadRequest("Ne postoje detalji filma pod tim ID-jem");

            List<Film> provjera = _dbContext.filmovi.
                Where(y => y.detaljiFilmaID == x._detaljiFilmaId).ToList();
            if (provjera.Count > 0 )
                return BadRequest("Vec postoji film sa tim ID-em detalja filma");

            if(string.IsNullOrEmpty(x._naziv)|| string.IsNullOrEmpty(x._zanr))
                return BadRequest("Provjerite unos naziva i zanra");

            DetaljiFilma det = _dbContext.detaljiFilma.Find(x._detaljiFilmaId);

            Film dodaj = new Film()
            {
                naziv = x._naziv,
                zanr = x._zanr,
                detaljiFilma=det,
                detaljiFilmaID = x._detaljiFilmaId
                //,slika=x._slika

            };
            _dbContext.Add(dodaj);
            _dbContext.SaveChanges();
            return Ok(dodaj);
        }

        [HttpGet]
        public List<Film> GetAll(int? _id)
        {
            return _dbContext.filmovi.Where(x => _id == null || _id == x.id).ToList();

        }

        [HttpPost]
        public ActionResult Update(int id, [FromBody] FilmAddVm x)
        {
            if (string.IsNullOrEmpty(x._naziv) || string.IsNullOrEmpty(x._zanr))
                return BadRequest("Provjerite unos naziva i zanra");

            Film edit = _dbContext.filmovi.Find(id);

            if (edit == null)
                return BadRequest("pogresan ID");

            List<Film> provjera = _dbContext.filmovi.
                Where(y => y.detaljiFilmaID == x._detaljiFilmaId).ToList();
            if (provjera.Count > 0 && provjera[0].id!=id)
                return BadRequest("Vec postoji film sa tim ID-em detalja filma");

            edit.naziv = x._naziv;
            edit.zanr = x._zanr;
            edit.detaljiFilmaID = x._detaljiFilmaId;
           


            _dbContext.SaveChanges();
            return Ok(edit);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            if (_dbContext.filmovi.Count() < 1)
                return BadRequest("Nije pronadjen ni jedan film");

            Film brisi = _dbContext.filmovi.Find(id);

            if (brisi == null)
                return BadRequest("pogresan ID");

            DetaljiFilma brisiDet = _dbContext.detaljiFilma.Find(brisi.detaljiFilmaID);



            _dbContext.Remove(brisiDet);
            _dbContext.Remove(brisi);

            _dbContext.SaveChanges();
            return Ok(brisi);
        }






    }
}
