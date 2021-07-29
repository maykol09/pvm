using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PVM_DATA.Interface
{
    public interface IReportsRepository
    {

        byte[] VacantReports(string staff_type, string status, string office);

        byte[] InactiveReports(string staff_type);

        byte[] PositionCreatedReports(string staff_type, string pd_status, string start_date, string end_date);
    }
}
