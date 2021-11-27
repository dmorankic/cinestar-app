using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.IServisi
{
    public interface IBaseService<db_type, view_type>
    {
        Task<IEnumerable<db_type>> GetAll();
        Task<db_type> GetById(int id);
        Task<db_type> Insert(db_type obj);
        Task<db_type> Update(int id, db_type obj);
        Task<db_type> Delete(int id);
    }
}
