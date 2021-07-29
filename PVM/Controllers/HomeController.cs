using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PVM_DATA.Entities;
using PVM_DATA.Interface;
using Syncfusion.HtmlConverter;
using Syncfusion.Pdf;
using Microsoft.AspNetCore.Hosting;
using DinkToPdf;
using DinkToPdf.Contracts;

using PVM_DATA.Template;

namespace PVM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly IHomeRepository IHome;
        private IHttpContextAccessor httpContext;
        private readonly IConverter _converter;
        public HomeController(IHomeRepository IHome, IHttpContextAccessor httpContextAccessor, IConverter converter)
        {
            if (httpContext == null)
            {
                httpContext = httpContextAccessor;
            }
            this.IHome = IHome;
            _converter = converter;
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
       
        [HttpGet("GetCurrentUser")]
        public JsonResult GetCurrentUser()
        {
            try
            {
                if (currentUsername == null)
                {
                    return new JsonResult("no username");
                }
                //var result = IHome.GetCurrentUser(currentUsername);
                return new JsonResult(currentUsername);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }

        }
        [HttpPost("GetPost")]
        public JsonResult GetPost(string staff_type)
        {
            try
            {
                var result = IHome.GetPost(staff_type);
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
        [HttpPost("SavePost")]
        public JsonResult SavePost(Post data)
        {
            try
            {
                var result = IHome.SavePost(data);
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
        [HttpPost("DeletePost")]
        public JsonResult DeletePost(string post_id)
        {
            try
            {
                IHome.DeletePost(Convert.ToInt32(post_id));
                return new JsonResult("Deleted");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Data)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
        [HttpGet("GetReference")]
        public JsonResult GetReference()
        {
            try
            {
                var result = IHome.GetReference();
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
        [HttpPost("GetActionHistory")]
        public JsonResult GetActionHistory(string post_id)
        {
            try
            {
                var result = IHome.GetActionHistory(Convert.ToInt32(post_id));
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
        [HttpGet("GetActionHistoryRef")]
        public JsonResult GetActionHistoryRef()
        {
            try
            {
                var result = IHome.GetActionHistoryRef();
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
        [HttpPost("SaveActionHistory")]
        public JsonResult SaveActionHistory(ActionHistory data)
        {
            try
            {
                var result = IHome.SaveActionHistory(data);
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
        [HttpPost("GetReqtDocuments")]
        public JsonResult GetReqtDocuments(string post_id)
        {
            try
            {
                var result = IHome.GetReqtDocuments(Convert.ToInt32(post_id));
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
        [HttpGet("GetReqtDocumentsRef")]
        public JsonResult GetReqtDocumentsRef()
        {
            try
            {
                var result = IHome.GetReqtDocumentsRef();
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
        [HttpPost("SaveReqtDocuments")]
        public JsonResult SaveReqtDocuments(ReqtDocuments data)
        {
            try
            {
                var result = IHome.SaveReqtDocuments(data);
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
        [HttpPost("CreateMailItem")]
        public IActionResult CreateMailItem(Post data)
        {
            try
            {
                data.email = currentUsername + "@who.int";
                IHome.CreateMailItem(data);
                return new JsonResult("success");
            }
            catch (Exception ex)
            {
                //return new JsonResult(ex.Data) {
                //    StatusCode = StatusCodes.Status500InternalServerError
                //};
                return new JsonResult(ex);
            }
        }
        [HttpPost("Reminder")]
        public JsonResult Reminder(int post_no, string post_title)
        {
            try
            {
                var email = currentUsername + "@who.int";
                IHome.Reminder(Convert.ToInt32(post_no), post_title, email);
                return new JsonResult("success");
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
