using Microsoft.AspNetCore.Mvc;
using Modeli;
using Servisi.IServisi;

namespace Cinestar_WEB_API.Controllers
{
    [ApiController]
    [Route("/cinestar_api/seminarski/[controller]")]
    public class RadnikController : BaseController<Radnik, object>
    {
        private readonly IBaseService<Radnik, object> service;

        public RadnikController(IBaseService<Radnik, object> service) : base(service)
        {

        }


    }
}
