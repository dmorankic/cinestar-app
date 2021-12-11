using Microsoft.AspNetCore.Mvc;
using Modeli;
using Servisi.IServisi;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Cinestar_WBE_API.Controllers
{
    [ApiController]
    [Route("/cinestar_api/seminarski/[controller]")]

    public class RadController : Controller
    {
        private readonly IBaseService<Kasa, object> radService;

        public RadController(IBaseService<Kasa, object> radService)
        {
            this.radService = radService;
        }

    }
}
