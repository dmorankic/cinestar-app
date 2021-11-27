﻿using Microsoft.AspNetCore.Mvc;
using Modeli;
using Servisi.IServisi;

namespace Cinestar_WEB_API.Controllers
{
    [ApiController]
    [Route("/cinestar_api/seminarski/[controller]")]
    public class KorisnikController : BaseController<Korisnik,object>
    {
        private readonly IBaseService<Korisnik, object> service;

        public KorisnikController(IBaseService<Korisnik, object> service) :base(service)
        {

        }


    }
}
