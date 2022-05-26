    using dataBase;
using Microsoft.AspNetCore.Mvc;
using Modeli;
using Modeli.SearchObjects;
using Modeli.ViewModels;
using System;
using System.Collections.Generic;
using System.Fabric.Query;
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

            List<Film> provjera = _dbContext.filmovi.
                Where(y => y.detaljiFilmaID == x._detaljiFilmaId).ToList();
            if (provjera.Count > 0 )
                return BadRequest("Vec postoji film sa tim ID-em detalja filma");


            if (string.IsNullOrEmpty(x._naziv)|| string.IsNullOrEmpty(x._zanr))
                return BadRequest("Provjerite unos naziva i zanra");

            DetaljiFilma det = _dbContext.detaljiFilma.Find(x._detaljiFilmaId);

            

            Film dodaj = new Film()
            {
                naziv = x._naziv,
                zanr = x._zanr
            };

            //if (x._slikaUrl != null)
            //{
            //    string ekstenzija = Path.GetExtension(x._slikaUrl.FileName);
            //    var filename = $"{Guid.NewGuid()}{ekstenzija}";

            //    x._slikaUrl.CopyTo(new FileStream(Config.SlikeFolder + filename, FileMode.Create));
            //    dodaj.slikaUrl = Config.SlikeURL + filename;
            //}
            _dbContext.Add(dodaj);
            _dbContext.SaveChanges();
            return Ok(dodaj);
        }
        [HttpPost]
        public ActionResult AddImage([FromForm] ImageAddVm x,int filmId)
        {
            Film dodaj = _dbContext.filmovi.Find(filmId);
            if (x._slikaUrl != null)
            {
                string ekstenzija = Path.GetExtension(x._slikaUrl.FileName);
                var filename = $"{Guid.NewGuid()}{ekstenzija}";

                x._slikaUrl.CopyTo(new FileStream(Config.SlikeFolder + filename, FileMode.Create));
                dodaj.slikaUrl = Config.SlikeURL + filename;
            }
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public List<Film> GetAll([FromQuery]BaseSearchObject search=null)
        {
            var filmovi = _dbContext.filmovi.Where(x => search.id == null || search.id == x.id);
            foreach (var film in filmovi)
            {
                film.detaljiFilma = _dbContext.detaljiFilma.Find(film.detaljiFilmaID);
            }
            if (search.pageSize.HasValue==true && search.page.HasValue==true)
            {
                //    //filmovi= filmovi.Take(search.pageSize.Value).Skip(search.page.Value * search.pageSize.Value);
                //    filmovi = filmovi.Skip((search.page.Value-1) * search.pageSize.Value).Take(search.pageSize.Value);
               
            }

           


            return filmovi.ToList();

        }


        [HttpGet]
        public Modeli.ViewModels.PagedList<Film> GetAllPaged([FromQuery] BaseSearchObject search = null)
        {
            var data = _dbContext.filmovi.Where(x => search.id == null || search.id == x.id)
                                          .AsQueryable();

            return Modeli.ViewModels.PagedList<Film>.Create(data, (int)search.page.Value, (int)search.pageSize.Value);
        }

            [HttpPost]
        public ActionResult AddDetalji(int filmId,int detaljiId)
        {
            Film film = _dbContext.filmovi.Find(filmId);
            if (film == null)
                return BadRequest("Ne postoji film sa tim ID-jem");
            if (_dbContext.detaljiFilma.Find(detaljiId) == null)
                return BadRequest("Ne postoje detalji filma sa tim ID-jem");

            film.detaljiFilmaID = detaljiId;
            _dbContext.SaveChanges();
            return Ok(film);

        }

        [HttpPost]
        public ActionResult Update(int id, [FromBody] FilmEditVm x)
        {
            if (string.IsNullOrEmpty(x._naziv) || string.IsNullOrEmpty(x._zanr))
                return BadRequest("Provjerite unos naziva i zanra");

            Film edit = _dbContext.filmovi.Find(id);

            if (edit == null)
                return BadRequest("pogresan ID");

            /* List<Film> provjera = _dbContext.filmovi.
                 Where(y => y.detaljiFilmaID == x._detaljiFilmaId).ToList();
             if (provjera.Count > 0 && provjera[0].id!=id)
                 return BadRequest("Vec postoji film sa tim ID-em detalja filma");*/

           /* if (string.IsNullOrEmpty(x._slikaUrl))
                x._slikaUrl = "Nisu unijeti podaci za sliku";*/

            edit.naziv = x._naziv;
            edit.zanr = x._zanr;
            edit.slikaUrl = x._slikaUrl;
           


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


            if(brisiDet!=null)
                _dbContext.Remove(brisiDet);

            _dbContext.Remove(brisi);

            _dbContext.SaveChanges();
            return Ok(brisi);
        }

        




    }
}
