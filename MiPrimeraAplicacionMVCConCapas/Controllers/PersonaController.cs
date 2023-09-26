using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class PersonaController : Controller
    {
        // GET: Persona
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarPersona()
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return Json(oPersonaBL.listarPersona(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarPersona(int iidtipousuario)
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return Json(oPersonaBL.filtrarPersona(iidtipousuario), JsonRequestBehavior.AllowGet);
        }

        public int guardarPersona(PersonaCLS oPersona)
        {
            return 1;
        }
    }
}