using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PVM_DATA.Entities;
using PVM_DATA.Interface;

namespace PVM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : Controller
    {
        private readonly IMaintenanceRepository Imain;
        private IHttpContextAccessor httpContext;
        public MaintenanceController(IMaintenanceRepository Imain, IHttpContextAccessor httpContextAccessor)
        {
            
            if (httpContext == null)
            {
                httpContext = httpContextAccessor;
            }
            this.Imain = Imain;
        }
        private string currentUsername
        {
            get
            {
                string userName = httpContext.HttpContext.User.Identity.Name;
                if (userName != null)
                {
                    return System.IO.Path.GetFileNameWithoutExtension(userName);
                }
                return null;
            }
        }
        public JsonResult GetActionStep()
        {
            try
            {
                var result = Imain.SaveActionStep();
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpGet("GetUser")]
        public JsonResult GetUser()
        {
            try
            {
                var result = Imain.GetUser();
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        
        [HttpPost("DelUser")]
        public JsonResult DelUser(string lib_user_level_id)
        {
            try
            {
               Imain.DelUser(Convert.ToInt16(lib_user_level_id));
                return new JsonResult("ok");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpGet("CheckUser")]
        public JsonResult CheckUser()
        {
            try
            {
                var result = Imain.CheckUser(currentUsername);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpPost("SaveUser")]
        public JsonResult SaveUser(User data)
        {
            try
            {
                var result = Imain.SaveUser(data);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpPost("SaveRef")]
        public JsonResult SaveRef(ActionHistory data)
        {
            try
            {
                var result = Imain.SaveRef(data);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpPost("DelRef")]
        public JsonResult DelRef(string action_id)
        {
            try
            {
                Imain.DelRef(Convert.ToInt16(action_id));
                return new JsonResult("ok");
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
