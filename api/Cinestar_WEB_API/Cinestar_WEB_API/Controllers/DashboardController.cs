using Cinestar_WEB_API.HubConfig;
using dataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Cinestar_WEB_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly IHubContext<ChartsHub> hub;
        private readonly DashboardDataManager dashboardDataManager;

        public DashboardController(IHubContext<ChartsHub> hub, DashboardDataManager dashboardDataManager)
        {
            this.hub = hub;
            this.dashboardDataManager = dashboardDataManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var timerManager = new TimerManager(() => hub.Clients.All.SendAsync("transferchartdata", ApplicationDbContext.GetData()));
            var data = dashboardDataManager.prepareReport();
            await hub.Clients.All.SendAsync("NewCallRecived", data);

            return Ok(new { message = "Requst completed!",data = data });
        }


    }
}
