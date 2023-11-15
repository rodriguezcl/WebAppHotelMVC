using Capa_Negocio;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CerrarSesion()
        {
            Session["persona"] = null;
            return RedirectToAction("Index");
        }

        public JsonResult uspLogin(string usuario, string contra)
        {
            PersonaBL oPersonaBL = new PersonaBL();
            PersonaCLS oPersonaCLS = oPersonaBL.uspLogin(usuario, contra);
			if (oPersonaCLS.iidusuario != 0)
			{
                Session["persona"] = oPersonaCLS;
			}
			else
			{
                Session["persona"] = null;

            }
            return Json(oPersonaCLS,
                JsonRequestBehavior.AllowGet);
        }

    }
}