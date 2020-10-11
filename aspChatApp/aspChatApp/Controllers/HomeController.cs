using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace aspChatApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ChatUser()
        {
            return View();
        }

        public IActionResult ChatAdmin()
        {
            return View();
        }
    }
}
