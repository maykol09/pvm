using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PVM_DATA.Interface;

namespace PVM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : Controller
    {
        private readonly IReportsRepository IReports;
       
        public ReportsController(IReportsRepository IReports, IConverter converter)
        {
            this.IReports = IReports;
        }
        [HttpGet("VacantReports")]
        public IActionResult VacantReports(string staff_type, string status, string office)
        {
            try
            {
                return File(IReports.VacantReports(staff_type, status, office), "Application/pdf");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpGet("InactiveReports")]
        public IActionResult InactiveReports(string staff_type, string status, string office)
        {
            try
            {
                return File(IReports.InactiveReports(staff_type), "Application/pdf");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpGet("PositionCreatedReports")]
        public IActionResult PositionCreatedReports(string staff_type, string pd_status, string start_date, string end_date)
        {
            try
            {
                return File(IReports.PositionCreatedReports(staff_type, pd_status, start_date, end_date), "Application/pdf");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
    }
}