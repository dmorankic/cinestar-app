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
    public class ProjekcijaController:ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public ProjekcijaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]

        
        public ActionResult Add([FromBody] ProjekcijaAddVm x)
        {
            //if (x.filmId == null)
            //    return BadRequest("Morate unijeti id filma");

            VrstaProjekcije pom = _dbContext.vrstaProjekcije.Find(x.vrstaProjekcijeId);
            Film pomFilm = _dbContext.filmovi.Find(x.filmId);

            Projekcija nova = new Projekcija()/////POPRAVITI DETALJIFILMA
            {
                dan=x.dan,
                vrijemePrikazivanja=x.vrijemePrikazivanja,
                vrstaProjekcijeId=x.vrstaProjekcijeId,
                vrstaProjekcije=pom,
                filmId=x.filmId,
                film=pomFilm
                
            };

            _dbContext.Add(nova);
            _dbContext.SaveChanges();
            return Ok(nova);
        }
        [HttpGet]
        public List<Projekcija> GetAll(int? _id)
        {
            return _dbContext.projekcije.Where(x => _id == null || _id == x.id).ToList();

        }
    }
}
