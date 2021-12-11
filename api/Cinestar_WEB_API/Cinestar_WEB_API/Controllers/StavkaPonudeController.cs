using Microsoft.AspNetCore.Mvc;
using Modeli;
using Servisi.IServisi;

namespace Cinestar_WEB_API.Controllers
{
    [ApiController]
    [Route("/cinestar_api/seminarski/[controller]")]
    public class StavkaPonudeController : BaseController<StavkaPonude, object>
    {
        private readonly IBaseService<StavkaPonude, object> service;

        public StavkaPonudeController(IBaseService<StavkaPonude, object> service) : base(service)
        {

        }
    }
}
