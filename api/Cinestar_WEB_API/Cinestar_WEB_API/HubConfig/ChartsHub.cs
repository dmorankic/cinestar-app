using Microsoft.AspNetCore.SignalR;
using Modeli.DashboardModels;
using System.Threading.Tasks;

namespace Cinestar_WEB_API.HubConfig
{
    public class ChartsHub:Hub
    {
        public async Task askServer(string someTextFromClient)
        {
            string tempString;

            if (someTextFromClient == "hey")
            {
                tempString = "message was 'hey'";
            }
            else
            {
                tempString = "message was something else";
            }

            await Clients.Client(this.Context.ConnectionId).SendAsync("askServerResponse", tempString);
        } 
        
        public async Task NewCallRecived(RealTimeReport report)
        {
            await Clients.All.SendAsync("NewCallRecived", report);
        }
    }
}
