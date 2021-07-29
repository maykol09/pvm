using PVM_DATA.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PVM_DATA.Interface
{
    public interface IMaintenanceRepository
    {
        DataTable SaveActionStep();
        DataTable GetUser();
        int SaveUser(User data);
        void DelUser(int id);
        string CheckUser(string user);

        int SaveRef(ActionHistory data);
        void DelRef(int id);
    }

}
