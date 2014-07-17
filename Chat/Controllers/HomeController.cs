using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Chat.Hubs;


namespace Chat.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        [Authorize]
        public ActionResult Chat()
        {
            ViewBag.Message = "Chat page.";
            object userName = User.Identity.Name;
            return View(userName);
        }


        [HttpGet]
        public JsonResult GetAllConnectedUsers()
        {
            //  var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            var hh = ChatHub._connections;
            return Json(hh.GetAllConnectedUserNames(), JsonRequestBehavior.AllowGet);
        }






    }
}


