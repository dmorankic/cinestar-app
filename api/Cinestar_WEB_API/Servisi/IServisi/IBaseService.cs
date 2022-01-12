using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.IServisi
{
    public interface IBaseService<db_type, view_type>
    {
        IEnumerable<db_type> GetAll();
        db_type GetById(int id);
        db_type Insert(db_type obj);
        db_type Update(int id, db_type obj);
        db_type Delete(int id);
    }
}
