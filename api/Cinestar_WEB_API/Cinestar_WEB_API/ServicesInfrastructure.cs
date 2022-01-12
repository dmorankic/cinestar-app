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
            //the power of generics
            services.AddTransient(typeof(IBaseService<,>),typeof(BaseService<,>));
            
            //dependency injection for database context
            services.AddTransient<ApplicationDbContext>();

            //loging service registration
            services.AddTransient<ILogger,Logger>();
            services.AddTransient<ILoggerFactory,LoggerFactory>();

            return services;
        }
    }
}
