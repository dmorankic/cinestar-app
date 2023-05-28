using dataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace Servisi.Servisi
{
    public class FilmService : IDisposable, IHostedService
    {
        private Timer timer;
        private readonly ApplicationDbContext _dbContext;
        public FilmService(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public void SendEmailNotification(int broj)
        {
            var smtpClient = new SmtpClient("smtp.office365.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.Timeout = 1000000;
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            NetworkCredential nc = new System.Net.NetworkCredential("cinemaonlinecinema@outlook.com", "Nekilaganpw1!");
            smtpClient.Credentials = nc;
            string fromAddress = "cinemaonlinecinema@outlook.com";
            string toAddress = "damir.morankic00802@gmail.com";

            var message = new MailMessage(fromAddress, toAddress, "Filmovi", "Broj filmova u ponudi je  " + broj);
            message.IsBodyHtml = false;

            try
            {
                smtpClient.SendAsync(message, null);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage1(): {0}",
                            ex.ToString());
            }
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            timer = new Timer(o =>
            {
                int brojFilmova = _dbContext.filmovi.Count();
                SendEmailNotification(brojFilmova);
            }
            , null, TimeSpan.Zero, TimeSpan.FromHours(24));
            return Task.CompletedTask;
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {

            return Task.CompletedTask;

        }

        public void Dispose()
        {
            timer?.Dispose();
        }
    }
}
