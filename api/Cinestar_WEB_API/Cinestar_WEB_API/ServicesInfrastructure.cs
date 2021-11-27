using dataBase;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Modeli;
using Servisi.IServisi;
using Servisi.Servisi;

namespace Cinestar_WEB_API
{
    public static class ServicesInfrastructure
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            //communication with database services
            services.AddTransient<IBaseService<Korisnik,object>,KorisnikServis>();
            services.AddTransient<IBaseService<Radnik,object>,RadnikService>();

            services.AddSingleton<ApplicationDbContext>();
            //loging
            services.AddTransient<ILogger,Logger>();

            //auth services
            //services.AddSingleton<IAuthRepo, AuthRepo>();

            return services;
        }
    }
}
